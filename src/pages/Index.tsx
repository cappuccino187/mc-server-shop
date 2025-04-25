import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const categoryItems = [
    {
      title: 'Привилегии',
      description: 'RANGER, ELDER, KING и другие привилегии',
      image: 'https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?q=80&w=400',
      link: '/privileges'
    },
    {
      title: 'Кейсы',
      description: 'Донат кейсы и кейсы с FCoins',
      image: 'https://images.unsplash.com/photo-1613027917970-ccf1b94ae534?q=80&w=400',
      link: '/cases'
    },
    {
      title: 'FC+',
      description: 'Подписка FC+ на разные периоды',
      image: 'https://images.unsplash.com/photo-1624953587687-daf255b6b80a?q=80&w=400',
      link: '/fcplus'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section 
          className={`text-center py-16 mb-12 rounded-xl bg-minecraft-dark bg-opacity-70 backdrop-blur-sm transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <h1 
            className={`text-4xl md:text-6xl font-bold text-white mb-4 transition-opacity duration-800 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          >
            FcGrief <span className="text-minecraft-accent">Minecraft Сервер</span>
          </h1>
          <p 
            className={`text-xl text-gray-200 max-w-2xl mx-auto mb-8 transition-opacity duration-800 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          >
            Получите преимущества на сервере с нашим донат-магазином
          </p>
          <div
            className={`transition-opacity duration-800 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          >
            <Button asChild className="minecraft-btn bg-minecraft-primary hover:bg-minecraft-secondary mr-4">
              <Link to="/privileges">Привилегии</Link>
            </Button>
            <Button asChild variant="outline" className="border-minecraft-accent text-white hover:bg-minecraft-accent/20">
              <Link to="/cases">Кейсы</Link>
            </Button>
          </div>
        </section>

        {/* Categories Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-white bg-minecraft-dark bg-opacity-70 py-2 rounded-lg">Категории</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryItems.map((item, index) => (
              <div
                key={index}
                className={`transition-all duration-500 delay-${index * 200} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                <Link to={item.link}>
                  <Card className="overflow-hidden h-full hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white bg-opacity-90 backdrop-blur-sm border-minecraft-primary/30">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-bold mb-2 text-minecraft-primary">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-12 bg-white bg-opacity-80 backdrop-blur-sm rounded-xl mb-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-minecraft-dark">Почему FcGrief?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="text-4xl mb-4 text-minecraft-primary">🛡️</div>
                <h3 className="text-xl font-bold mb-2">Уникальные привилегии</h3>
                <p className="text-gray-600">Получите доступ к эксклюзивным возможностям и командам</p>
              </div>
              <div className="text-center p-6">
                <div className="text-4xl mb-4 text-minecraft-primary">📦</div>
                <h3 className="text-xl font-bold mb-2">Выгодные кейсы</h3>
                <p className="text-gray-600">Открывайте кейсы с ценными предметами и бонусами</p>
              </div>
              <div className="text-center p-6">
                <div className="text-4xl mb-4 text-minecraft-primary">🔒</div>
                <h3 className="text-xl font-bold mb-2">Безопасные платежи</h3>
                <p className="text-gray-600">Мгновенное получение покупок после оплаты</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section 
          className={`text-center py-16 bg-minecraft-primary rounded-xl text-white mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <h2 className="text-3xl font-bold mb-4">Готовы начать?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Выбирайте из широкого ассортимента товаров для улучшения игрового процесса</p>
          <Button asChild variant="outline" className="bg-white text-minecraft-primary hover:bg-gray-100 border-white">
            <Link to="/privileges">Купить привилегию</Link>
          </Button>
        </section>
      </main>

      <footer className="bg-minecraft-dark text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">FcGrief</h3>
              <p className="text-gray-300">Лучший Minecraft сервер с уникальными возможностями</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Ссылки</h3>
              <ul className="space-y-2">
                <li><Link to="/privileges" className="text-gray-300 hover:text-white transition-colors">Привилегии</Link></li>
                <li><Link to="/cases" className="text-gray-300 hover:text-white transition-colors">Кейсы</Link></li>
                <li><Link to="/fcplus" className="text-gray-300 hover:text-white transition-colors">FC+</Link></li>
                <li><Link to="/other" className="text-gray-300 hover:text-white transition-colors">Другое</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Контакты</h3>
              <p className="text-gray-300">IP: play.fcgrief.com</p>
              <p className="text-gray-300">Дискорд: discord.gg/fcgrief</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">© {new Date().getFullYear()} FcGrief. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
