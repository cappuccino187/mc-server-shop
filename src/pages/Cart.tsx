import { useState } from 'react';
import { useCart } from '@/components/CartContext';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Trash2, MinusCircle, PlusCircle, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { PaymentService } from '@/components/PaymentService';
import { RconService } from '@/components/RconService';

// Проверка, является ли товар валютой FCoins
const isFCoinsProduct = (id: string) => {
  return id.includes('currency-fcoins');
};

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const [minecraftUsername, setMinecraftUsername] = useState('');
  const [fcoinsQuantity, setFcoinsQuantity] = useState<Record<string, number>>({});
  const [fcoinsSum, setFcoinsSum] = useState<Record<string, number>>({});
  const [paymentId, setPaymentId] = useState('');
  const [orderStatus, setOrderStatus] = useState<'idle' | 'processing' | 'waitingConfirmation' | 'completed' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [verificationInProgress, setVerificationInProgress] = useState(false);
  const [donationWindowOpened, setDonationWindowOpened] = useState(false);
  const [donationWindowReference, setDonationWindowReference] = useState<Window | null>(null);

  const totalPrice = cartItems.reduce((total, item) => {
    if (isFCoinsProduct(item.product.id)) {
      // Для FCoins используем значение из ввода суммы
      const sum = fcoinsSum[item.product.id] || 1;
      return total + sum;
    } else {
      return total + item.product.price * item.quantity;
    }
  }, 0);

  const handleQuantityChange = (id: string, currentQuantity: number, change: number) => {
    updateQuantity(id, currentQuantity + change);
  };

  const handleFCoinsQuantityChange = (id: string, value: string, type: 'sum' | 'quantity') => {
    const numValue = parseInt(value) || 1;
    
    if (type === 'sum') {
      setFcoinsSum(prev => {
        const newSum = { ...prev, [id]: numValue };
        // Обновляем количество на основе суммы (3 FCoins за 1 рубль)
        setFcoinsQuantity(prevQty => ({
          ...prevQty,
          [id]: numValue * 3
        }));
        return newSum;
      });
    } else {
      setFcoinsQuantity(prev => {
        const newQty = { ...prev, [id]: numValue };
        // Обновляем сумму на основе количества (1 рубль за 3 FCoins)
        setFcoinsSum(prevSum => ({
          ...prevSum,
          [id]: Math.ceil(numValue / 3)
        }));
        return newQty;
      });
    }
  };

  const handleCheckout = async () => {
    if (!minecraftUsername) {
      setErrorMessage('Пожалуйста, введите ваш Minecraft никнейм');
      return;
    }

    if (cartItems.length === 0) {
      setErrorMessage('Корзина пуста');
      return;
    }

    setOrderStatus('processing');
    setErrorMessage('');

    // Генерация уникальной ссылки на DonationAlerts
    const donationUrl = generateDonationUrl();
    
    // Переход к ожиданию подтверждения
    setOrderStatus('waitingConfirmation');
    
    // Открываем окно DonationAlerts
    const donationWindow = window.open(donationUrl, '_blank', 'width=800,height=600');
    setDonationWindowReference(donationWindow);
    setDonationWindowOpened(true);
  };

  const generateDonationUrl = () => {
    const message = `Покупка на FcGrief: ${cartItems.map(item => 
      `${item.product.name} x${item.quantity}`).join(', ')} для аккаунта ${minecraftUsername}`;
    
    // Создаем уникальный идентификатор для отслеживания платежа
    const paymentId = `FC-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    setPaymentId(paymentId);
    
    // Формируем URL для DonationAlerts с параметрами
    return `https://www.donationalerts.com/r/fcgrief?amount=${totalPrice.toFixed(2)}&message=${encodeURIComponent(message + " PaymentID:" + paymentId)}`;
  };

  const handlePaymentVerification = async () => {
    // Проверяем, было ли открыто окно оплаты
    if (!donationWindowOpened) {
      setErrorMessage('Пожалуйста, сначала перейдите к оплате');
      return;
    }
    
    // Проверяем, закрыто ли окно DonationAlerts (признак завершения оплаты)
    if (donationWindowReference && !donationWindowReference.closed) {
      setErrorMessage('Пожалуйста, завершите оплату в окне DonationAlerts перед подтверждением');
      return;
    }
    
    setVerificationInProgress(true);
    
    try {
      // Здесь будет реальная проверка платежа через API DonationAlerts
      // Для демонстрации мы создаем задержку
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // В реальном приложении здесь должна быть проверка платежа
      const paymentVerified = await PaymentService.checkPaymentStatus(paymentId);
      
      if (paymentVerified) {
        completeOrder();
      } else {
        setErrorMessage('Платеж не найден. Пожалуйста, убедитесь, что вы совершили платеж и указали правильный PaymentID.');
        setVerificationInProgress(false);
      }
    } catch (error) {
      console.error('Ошибка при проверке платежа', error);
      setErrorMessage('Произошла ошибка при проверке платежа. Пожалуйста, попробуйте позже.');
      setVerificationInProgress(false);
    }
  };

  const completeOrder = async () => {
    setOrderStatus('processing');
    
    try {
      // Подключение к RCON серверу
      await RconService.connect('c11.play2go.cloud', 20644, 'secure_rcon_password');
      
      // Выполнение команд для выдачи товаров
      for (const item of cartItems) {
        if (isFCoinsProduct(item.product.id)) {
          // Для FCoins: используем указанное пользователем количество
          const totalCoins = fcoinsQuantity[item.product.id] || (item.quantity * 3);
          await RconService.sendCommand(`lp user ${minecraftUsername} addbalance fcoins ${totalCoins}`);
        } else {
          // Для других предметов
          for (let i = 0; i < item.quantity; i++) {
            // Команда зависит от типа товара
            if (item.product.category === 'Привилегии') {
              await RconService.sendCommand(`lp user ${minecraftUsername} parent add ${item.product.id.toLowerCase()} server=survival`);
            } else if (item.product.category === 'Кейсы') {
              await RconService.sendCommand(`crate give ${minecraftUsername} ${item.product.id.toLowerCase()} ${item.quantity}`);
            } else if (item.product.category === 'FC+') {
              const duration = item.product.name.includes('месяц') ? '30d' : 
                               item.product.name.includes('год') ? '365d' : 'unlimited';
              await RconService.sendCommand(`fcplus add ${minecraftUsername} ${duration}`);
            } else if (item.product.name.includes('РАЗБАН')) {
              await RconService.sendCommand(`unban ${minecraftUsername}`);
            } else if (item.product.name.includes('РАЗМУТ')) {
              await RconService.sendCommand(`unmute ${minecraftUsername}`);
            }
          }
        }
      }
      
      // Закрытие соединения с RCON
      RconService.disconnect();
      
      // Обновление статуса заказа
      setOrderStatus('completed');
      
      // Очистка корзины после успешной покупки
      setTimeout(() => {
        clearCart();
      }, 3000);
    } catch (error) {
      console.error('RCON error:', error);
      setOrderStatus('error');
      setErrorMessage('Произошла ошибка при выдаче товаров. Обратитесь в поддержку.');
      setVerificationInProgress(false);
    }
  };

  // Получение или инициализация количества и суммы FCoins для товара
  const getFCoinsData = (productId: string) => {
    if (!fcoinsQuantity[productId]) {
      setFcoinsQuantity(prev => ({ ...prev, [productId]: 3 }));
    }
    if (!fcoinsSum[productId]) {
      setFcoinsSum(prev => ({ ...prev, [productId]: 1 }));
    }
    
    return {
      quantity: fcoinsQuantity[productId] || 3,
      sum: fcoinsSum[productId] || 1
    };
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4 text-white">Корзина</h1>
          <p className="text-gray-300">Завершите покупку и получите товары на сервере</p>
        </div>

        {orderStatus === 'completed' ? (
          <div className="max-w-2xl mx-auto bg-white/10 rounded-xl p-8 text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Заказ успешно оформлен!</h2>
            <p className="text-gray-300 mb-6">
              Все приобретенные товары были автоматически выданы на аккаунт <span className="font-bold text-green-400">{minecraftUsername}</span>.
              Зайдите на сервер, чтобы воспользоваться вашими покупками.
            </p>
            <Button 
              onClick={() => setOrderStatus('idle')} 
              className="mx-auto bg-green-600 hover:bg-green-500"
            >
              Вернуться в магазин
            </Button>
          </div>
        ) : orderStatus === 'waitingConfirmation' ? (
          <div className="max-w-2xl mx-auto bg-white/10 rounded-xl p-8 text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center">
                <div className="animate-pulse">💰</div>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Оплата через DonationAlerts</h2>
            <p className="text-gray-300 mb-6">
              Для завершения покупки, пожалуйста, перейдите по ссылке ниже и сделайте пожертвование на сумму <span className="font-bold text-yellow-400">{totalPrice.toFixed(2)} ₽</span>
            </p>
            
            <div className="mb-6 bg-gray-800 p-4 rounded-lg">
              <p className="text-sm text-gray-400 mb-2">Ваш ID платежа:</p>
              <p className="text-yellow-400 font-mono">{paymentId}</p>
              <p className="text-xs text-gray-500 mt-2">Обязательно сохраните этот ID</p>
            </div>
            
            <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
              <Button asChild className="bg-green-600 hover:bg-green-500">
                <a 
                  href="https://www.donationalerts.com/r/fcgrief" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => setDonationWindowOpened(true)}
                >
                  Перейти к оплате
                </a>
              </Button>
              <Button 
                onClick={handlePaymentVerification} 
                variant="outline" 
                className="border-blue-500 text-blue-400 hover:bg-blue-500/20"
                disabled={verificationInProgress}
              >
                {verificationInProgress ? (
                  <div className="flex items-center">
                    <span className="animate-spin mr-2">⚙️</span> Проверка...
                  </div>
                ) : 'Я оплатил'}
              </Button>
            </div>
            
            {errorMessage && (
              <Alert className="bg-red-900/20 border-red-700 mb-4">
                <AlertCircle className="h-4 w-4 text-red-400" />
                <AlertTitle className="text-red-400">Ошибка</AlertTitle>
                <AlertDescription className="text-gray-300">
                  {errorMessage}
                </AlertDescription>
              </Alert>
            )}
            
            <Alert className="bg-yellow-900/20 border-yellow-700 mb-4">
              <AlertCircle className="h-4 w-4 text-yellow-400" />
              <AlertTitle className="text-yellow-400">Важно!</AlertTitle>
              <AlertDescription className="text-gray-300">
                В сообщении к пожертвованию укажите ваш ID платежа и никнейм: {minecraftUsername}
              </AlertDescription>
            </Alert>
            
            <Button 
              onClick={() => setOrderStatus('idle')} 
              variant="ghost" 
              className="text-gray-400 hover:text-white hover:bg-white/10"
            >
              Вернуться к корзине
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white/5 rounded-xl p-6 mb-6">
                <h2 className="text-xl font-bold mb-4 text-white">Товары в корзине</h2>
                
                {cartItems.length === 0 ? (
                  <div className="text-center py-10">
                    <div className="text-5xl mb-4">🛒</div>
                    <p className="text-gray-400 mb-4">Ваша корзина пуста</p>
                    <Button asChild variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500/20">
                      <a href="/">Перейти в магазин</a>
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4">
                      {cartItems.map((item) => {
                        const isFCoin = isFCoinsProduct(item.product.id);
                        const fcoinsData = isFCoin ? getFCoinsData(item.product.id) : null;
                        
                        return (
                          <div key={item.product.id} className="flex flex-col sm:flex-row items-center sm:items-start gap-4 bg-white/5 rounded-lg p-4">
                            <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                              <img 
                                src={item.product.image} 
                                alt={item.product.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-grow text-center sm:text-left">
                              <h3 className="font-semibold text-white">{item.product.name}</h3>
                              <p className="text-sm text-gray-400 mb-2">Категория: {item.product.category}</p>
                              {!isFCoin && (
                                <p className="font-bold text-blue-400">{item.product.price.toFixed(2)} ₽</p>
                              )}
                              
                              {/* Специальное поле для FCoins */}
                              {isFCoin && fcoinsData && (
                                <div className="mt-2 space-y-2">
                                  <p className="text-sm text-gray-400">1.00 ₽ за 3 ед.</p>
                                  <div className="grid grid-cols-2 gap-4 max-w-md">
                                    <div>
                                      <Label htmlFor={`fcoins-sum-${item.product.id}`} className="text-gray-300 text-sm block mb-1">
                                        Сумма
                                      </Label>
                                      <div className="flex items-center">
                                        <Input
                                          id={`fcoins-sum-${item.product.id}`}
                                          type="number"
                                          min="1"
                                          value={fcoinsData.sum}
                                          onChange={(e) => handleFCoinsQuantityChange(item.product.id, e.target.value, 'sum')}
                                          className="bg-white/10 border-gray-700 text-white w-full"
                                        />
                                        <span className="ml-2 text-gray-400">₽</span>
                                      </div>
                                    </div>
                                    <div>
                                      <Label htmlFor={`fcoins-quantity-${item.product.id}`} className="text-gray-300 text-sm block mb-1">
                                        Количество
                                      </Label>
                                      <div className="flex items-center">
                                        <Input
                                          id={`fcoins-quantity-${item.product.id}`}
                                          type="number"
                                          min="3"
                                          step="3"
                                          value={fcoinsData.quantity}
                                          onChange={(e) => handleFCoinsQuantityChange(item.product.id, e.target.value, 'quantity')}
                                          className="bg-white/10 border-gray-700 text-white w-full"
                                        />
                                        <span className="ml-2 text-gray-400">FCoins</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              {!isFCoin && (
                                <>
                                  <Button 
                                    onClick={() => handleQuantityChange(item.product.id, item.quantity, -1)} 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10"
                                    disabled={item.quantity <= 1}
                                  >
                                    <MinusCircle className="h-4 w-4" />
                                  </Button>
                                  <span className="text-white min-w-[30px] text-center">{item.quantity}</span>
                                  <Button 
                                    onClick={() => handleQuantityChange(item.product.id, item.quantity, 1)} 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10"
                                  >
                                    <PlusCircle className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                              <Button 
                                onClick={() => removeFromCart(item.product.id)} 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-red-500 hover:bg-red-500/20"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex justify-between items-center mt-6">
                      <Button 
                        variant="outline" 
                        onClick={clearCart}
                        className="border-red-500 text-red-400 hover:bg-red-500/20"
                      >
                        Очистить корзину
                      </Button>
                      <div className="text-right">
                        <p className="text-sm text-gray-400 mb-1">Итого:</p>
                        <p className="text-2xl font-bold text-white">{totalPrice.toFixed(2)} ₽</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Checkout Form */}
            <div className="lg:col-span-1">
              <div className="bg-white/5 rounded-xl p-6 sticky top-6">
                <h2 className="text-xl font-bold mb-4 text-white">Оформление заказа</h2>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="minecraft-username" className="text-white mb-2 block">
                      Minecraft никнейм <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      id="minecraft-username"
                      placeholder="Введите ваш никнейм"
                      value={minecraftUsername}
                      onChange={(e) => setMinecraftUsername(e.target.value)}
                      className="bg-white/10 border-gray-700 text-white placeholder:text-gray-500"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      На этот аккаунт будут выданы все купленные товары
                    </p>
                  </div>

                  <Separator className="my-6 bg-gray-700" />

                  <div>
                    <Label className="text-white mb-2 block">Способ оплаты</Label>
                    <RadioGroup defaultValue="da" className="space-y-2">
                      <div className="flex items-center space-x-2 bg-white/10 p-3 rounded-md">
                        <RadioGroupItem id="payment-da" value="da" className="text-blue-500" />
                        <Label htmlFor="payment-da" className="flex-grow text-white">
                          DonationAlerts
                        </Label>
                      </div>
                    </RadioGroup>
                    <p className="text-xs text-gray-400 mt-2">
                      После нажатия кнопки "Оплатить" вы будете перенаправлены на страницу DonationAlerts
                    </p>
                  </div>

                  {errorMessage && (
                    <Alert variant="destructive" className="mt-4 bg-red-900/20 border-red-700 text-white">
                      <AlertCircle className="h-4 w-4 text-red-400" />
                      <AlertTitle className="text-red-400">Ошибка</AlertTitle>
                      <AlertDescription className="text-gray-300">
                        {errorMessage}
                      </AlertDescription>
                    </Alert>
                  )}

                  <Button 
                    onClick={handleCheckout} 
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white mt-4"
                    disabled={orderStatus === 'processing' || cartItems.length === 0}
                  >
                    {orderStatus === 'processing' ? (
                      <div className="flex items-center">
                        <span className="animate-spin mr-2">⚙️</span>
                        Обработка...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        Оплатить {totalPrice.toFixed(2)} ₽
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    )}
                  </Button>

                  <p className="text-xs text-gray-400 text-center mt-2">
                    Нажимая кнопку "Оплатить", вы соглашаетесь с условиями предоставления услуг
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* RCON Integration Information */}
        <div className="mt-12 bg-blue-900/20 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4 text-white">Как работает система выдачи товаров?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 p-4 rounded-lg">
              <div className="text-3xl mb-2">🛒</div>
              <h3 className="text-lg font-semibold mb-2 text-white">Шаг 1: Покупка</h3>
              <p className="text-gray-300">Выберите товары и добавьте их в корзину</p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg">
              <div className="text-3xl mb-2">👤</div>
              <h3 className="text-lg font-semibold mb-2 text-white">Шаг 2: Указание никнейма</h3>
              <p className="text-gray-300">Введите ваш Minecraft никнейм и оплатите через DonationAlerts</p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg">
              <div className="text-3xl mb-2">✅</div>
              <h3 className="text-lg font-semibold mb-2 text-white">Шаг 3: Автоматическая выдача</h3>
              <p className="text-gray-300">После подтверждения платежа товары автоматически выдаются через RCON</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-8 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-400">© {new Date().getFullYear()} FcGrief. Все права защищены.</p>
            <p className="text-gray-500 text-sm mt-2">IP: c11.play2go.cloud:20095 | <a href="https://discord.gg/MBQYxKMpJx" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Discord</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Cart;
