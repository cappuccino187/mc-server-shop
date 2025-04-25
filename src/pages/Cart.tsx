import { useState } from 'react';
import { useCart } from '@/components/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, Minus } from 'lucide-react';
import Header from '@/components/Header';
import { toast } from 'sonner';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const [minecraftUsername, setMinecraftUsername] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    if (!minecraftUsername) {
      toast.error('Пожалуйста, введите ваш логин в Minecraft');
      return;
    }

    if (cartItems.length === 0) {
      toast.error('Ваша корзина пуста');
      return;
    }

    setIsProcessing(true);

    // Имитация процесса оплаты
    setTimeout(() => {
      toast.success('Оплата успешно завершена! Товары выданы на сервере.');
      clearCart();
      setMinecraftUsername('');
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-minecraft-dark">Корзина</h1>
          
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-xl mb-4">Ваша корзина пуста</p>
              <Button asChild className="bg-minecraft-primary hover:bg-minecraft-secondary">
                <a href="/">Перейти к покупкам</a>
              </Button>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full mb-6">
                  <thead className="border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-2">Товар</th>
                      <th className="text-center py-3 px-2">Цена</th>
                      <th className="text-center py-3 px-2">Количество</th>
                      <th className="text-center py-3 px-2">Итого</th>
                      <th className="text-center py-3 px-2">Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.product.id} className="border-b border-gray-100">
                        <td className="py-4 px-2">
                          <div className="flex items-center">
                            <div className="w-16 h-16 mr-4 overflow-hidden rounded-md">
                              <img 
                                src={item.product.image || 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=400'} 
                                alt={item.product.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium">{item.product.name}</p>
                              <p className="text-sm text-gray-500">{item.product.category}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-2 text-center">{item.product.price.toFixed(2)} ₽</td>
                        <td className="py-4 px-2">
                          <div className="flex items-center justify-center">
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-8 w-8 rounded-full"
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="mx-2 w-8 text-center">{item.quantity}</span>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-8 w-8 rounded-full"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </td>
                        <td className="py-4 px-2 text-center font-medium">
                          {(item.product.price * item.quantity).toFixed(2)} ₽
                        </td>
                        <td className="py-4 px-2 text-center">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => removeFromCart(item.product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex justify-between mb-4">
                  <span className="font-medium">Итого:</span>
                  <span className="text-xl font-bold text-minecraft-primary">{totalPrice.toFixed(2)} ₽</span>
                </div>

                <div className="mb-6">
                  <label htmlFor="minecraft-username" className="block mb-2 text-sm font-medium">
                    Ваш логин в Minecraft
                  </label>
                  <Input
                    id="minecraft-username"
                    type="text"
                    placeholder="Введите ваш логин"
                    value={minecraftUsername}
                    onChange={(e) => setMinecraftUsername(e.target.value)}
                    className="mb-2"
                    required
                  />
                  <p className="text-sm text-gray-500">
                    Ваши покупки будут выданы на этот аккаунт после оплаты
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={handleCheckout}
                    className="bg-minecraft-primary hover:bg-minecraft-secondary text-white py-3 px-6 rounded-md"
                    disabled={isProcessing || cartItems.length === 0}
                  >
                    {isProcessing ? 'Обработка...' : 'Оплатить'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={clearCart}
                    className="border-minecraft-primary text-minecraft-primary"
                  >
                    Очистить корзину
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <footer className="bg-minecraft-dark text-white py-6 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} FcGrief. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Cart;
