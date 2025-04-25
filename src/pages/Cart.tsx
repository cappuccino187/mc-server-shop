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

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const [minecraftUsername, setMinecraftUsername] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderStatus, setOrderStatus] = useState<'idle' | 'processing' | 'completed' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleQuantityChange = (id: string, currentQuantity: number, change: number) => {
    updateQuantity(id, currentQuantity + change);
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

    // Имитация обработки платежа
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Имитация вызова RCON для выдачи предметов
      console.log('RCON call would happen here with these details:');
      console.log('Username:', minecraftUsername);
      console.log('Items:', cartItems.map(item => `${item.product.id} x${item.quantity}`));
      
      setOrderStatus('completed');
      // Очистка корзины после успешной покупки
      setTimeout(() => {
        clearCart();
      }, 3000);
    } catch (error) {
      console.error('Payment error:', error);
      setOrderStatus('error');
      setErrorMessage('Произошла ошибка при обработке платежа. Пожалуйста, попробуйте снова.');
    }
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
                      {cartItems.map((item) => (
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
                            <p className="font-bold text-blue-400">{item.product.price.toFixed(2)} ₽</p>
                          </div>
                          <div className="flex items-center gap-2">
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
                      ))}
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
                    <RadioGroup 
                      value={paymentMethod} 
                      onValueChange={setPaymentMethod}
                      className="space-y-2"
                    >
                      <div className="flex items-center space-x-2 bg-white/10 p-3 rounded-md cursor-pointer">
                        <RadioGroupItem id="payment-card" value="card" className="text-blue-500" />
                        <Label htmlFor="payment-card" className="flex-grow cursor-pointer text-white">
                          Банковская карта
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 bg-white/10 p-3 rounded-md cursor-pointer">
                        <RadioGroupItem id="payment-qiwi" value="qiwi" className="text-blue-500" />
                        <Label htmlFor="payment-qiwi" className="flex-grow cursor-pointer text-white">
                          QIWI
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 bg-white/10 p-3 rounded-md cursor-pointer">
                        <RadioGroupItem id="payment-webmoney" value="webmoney" className="text-blue-500" />
                        <Label htmlFor="payment-webmoney" className="flex-grow cursor-pointer text-white">
                          WebMoney
                        </Label>
                      </div>
                    </RadioGroup>
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
              <p className="text-gray-300">Введите ваш Minecraft никнейм и оплатите заказ</p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg">
              <div className="text-3xl mb-2">✅</div>
              <h3 className="text-lg font-semibold mb-2 text-white">Шаг 3: Автоматическая выдача</h3>
              <p className="text-gray-300">Система автоматически выдаст товары через RCON</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-8 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-400">© {new Date().getFullYear()} FcGrief. Все права защищены.</p>
            <p className="text-gray-500 text-sm mt-2">Безопасные платежи и мгновенная выдача товаров</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Cart;
