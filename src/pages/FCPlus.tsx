import { getProductsByCategory } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import Header from '@/components/Header';
import { CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/components/CartContext';

const FCPlus = () => {
  const fcPlusProducts = getProductsByCategory('fcplus');
  const { addToCart } = useCart();
  
  const features = [
    "Доступ к 3 дополнительным серверам",
    "Уникальная шапка с FC+ в чате",
    "Возможность лететь на спавне",
    "Доступ к /hat и /nick",
    "Приватные текстуры и скины",
    "Возможность создавать 5 варпов",
    "Доступ в креатив без ожидания",
    "Слоты для вайтлиста на всех серверах"
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-950 via-indigo-950 to-blue-950">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">FC+</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Премиум-подписка для самых преданных игроков сервера
          </p>
        </div>

        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-xl mb-12 h-64 md:h-80">
          <img 
            src="https://images.unsplash.com/photo-1624953587687-daf255b6b80a?q=80&w=1200" 
            alt="FC+ Premium" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent flex items-center">
            <div className="p-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Премиум подписка</h2>
              <p className="text-white/90 text-lg md:text-xl max-w-md">
                Получите максимальные возможности с FC+
              </p>
            </div>
          </div>
        </div>

        {/* Subscription Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {fcPlusProducts.map((product) => (
            <Card key={product.id} className="bg-white/10 border-blue-500/30 backdrop-blur-sm hover:border-blue-500/70 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl text-white">{product.name}</CardTitle>
                <CardDescription className="text-gray-300">{product.name.includes("месяц") ? "Месячная подписка" : product.name.includes("год") ? "Годовая подписка" : "Вечная подписка"}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="text-3xl font-bold text-blue-400 mb-4">{product.price.toFixed(2)} ₽</div>
                <div className="space-y-2">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => addToCart(product)} 
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white"
                >
                  Приобрести
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* FC+ Benefits */}
        <div className="rounded-xl overflow-hidden mb-16">
          <div className="bg-blue-900/30 p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Преимущества FC+</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-blue-400 mb-4">Игровые преимущества</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-3 shrink-0">1</div>
                    <p className="text-gray-300">Доступ к 3 приватным серверам, доступным только для подписчиков FC+</p>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-3 shrink-0">2</div>
                    <p className="text-gray-300">Возможность использовать полет на спавне и в безопасных зонах</p>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-3 shrink-0">3</div>
                    <p className="text-gray-300">Доступ к эксклюзивным командам и функциям </p>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-400 mb-4">Приоритетные возможности</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-3 shrink-0">1</div>
                    <p className="text-gray-300">Приоритетное подключение к серверам во время высокой нагрузки</p>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-3 shrink-0">2</div>
                    <p className="text-gray-300">Мгновенный доступ к новому контенту и режимам</p>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-3 shrink-0">3</div>
                    <p className="text-gray-300">Техническая поддержка в приоритетном порядке</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white/5 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Часто задаваемые вопросы</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">Как активировать FC+ после покупки?</h3>
              <p className="text-gray-300">После успешной оплаты привилегия будет активирована автоматически в течение нескольких минут. Вам нужно просто перезайти на сервер.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">Суммируются ли периоды подписки?</h3>
              <p className="text-gray-300">Да, если у вас уже есть активная подписка, новая покупка продлит её на соответствующий срок.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">Могу ли я перенести FC+ на другой аккаунт?</h3>
              <p className="text-gray-300">Перенос возможен только один раз в 30 дней и только через обращение к администрации сервера.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">Совместим ли FC+ с другими привилегиями?</h3>
              <p className="text-gray-300">Да, FC+ полностью совместим с любыми другими привилегиями и дополняет их возможности.</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-blue-950 text-white py-8 border-t border-blue-900/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-400">© {new Date().getFullYear()} FcGrief. Все права защищены.</p>
            <p className="text-gray-500 text-sm mt-2">FC+ является премиум подпиской для сервера FcGrief</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FCPlus;
