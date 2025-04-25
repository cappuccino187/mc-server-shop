import { useState } from 'react';
import { getProductsByCategory } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import Header from '@/components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

const Cases = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  const allCases = getProductsByCategory('cases');
  const donateCases = allCases.filter(product => product.name.includes('донат'));
  const fcoinsCases = allCases.filter(product => product.name.includes('FCoins'));
  const specialCases = allCases.filter(product => !product.name.includes('донат') && !product.name.includes('FCoins'));

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Кейсы</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Открывайте кейсы и получайте ценные предметы, привилегии и другие бонусы
          </p>
        </div>

        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-xl mb-12 h-64 md:h-80">
          <img 
            src="https://images.unsplash.com/photo-1616731948638-8a235d93b555?q=80&w=1200" 
            alt="Кейсы" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-transparent flex items-center">
            <div className="p-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Уникальные кейсы</h2>
              <p className="text-white/90 text-lg md:text-xl max-w-md">
                Каждый кейс содержит случайные предметы разной редкости
              </p>
            </div>
          </div>
        </div>

        {/* Case Categories Tabs */}
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4 bg-purple-900/30 rounded-xl p-1">
            <TabsTrigger value="all" className="data-[state=active]:bg-purple-700">
              Все кейсы
            </TabsTrigger>
            <TabsTrigger value="donate" className="data-[state=active]:bg-purple-700">
              Донат кейсы
            </TabsTrigger>
            <TabsTrigger value="fcoins" className="data-[state=active]:bg-purple-700">
              Кейсы с FCoins
            </TabsTrigger>
            <TabsTrigger value="special" className="data-[state=active]:bg-purple-700">
              Специальные
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {allCases.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="donate" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {donateCases.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="fcoins" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {fcoinsCases.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="special" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {specialCases.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Case Information */}
        <div className="bg-white/10 rounded-xl p-6 mb-12">
          <h2 className="text-2xl font-bold mb-4 text-white">Как работают кейсы?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-purple-900/30 p-4 rounded-lg">
              <div className="text-3xl mb-2">🎁</div>
              <h3 className="text-xl font-semibold mb-2 text-white">Шаг 1</h3>
              <p className="text-gray-300">Выберите и оплатите кейс, который вам нравится</p>
            </div>
            <div className="bg-purple-900/30 p-4 rounded-lg">
              <div className="text-3xl mb-2">🎮</div>
              <h3 className="text-xl font-semibold mb-2 text-white">Шаг 2</h3>
              <p className="text-gray-300">Введите свой игровой ник при оформлении заказа</p>
            </div>
            <div className="bg-purple-900/30 p-4 rounded-lg">
              <div className="text-3xl mb-2">🏆</div>
              <h3 className="text-xl font-semibold mb-2 text-white">Шаг 3</h3>
              <p className="text-gray-300">Получите случайный предмет автоматически на сервере</p>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-purple-500/20" />

        {/* Case Contents */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Содержимое кейсов</h2>
          
          <div className="bg-white/5 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4 text-purple-400">Донат кейсы</h3>
            <p className="text-gray-300 mb-4">Могут содержать следующие предметы:</p>
            <ul className="list-disc pl-5 text-gray-300 space-y-1">
              <li>Привилегии разных уровней (шанс выпадения зависит от ценности)</li>
              <li>Валюта сервера - FCoins (от 10 до 100 единиц)</li>
              <li>Редкие предметы и ресурсы</li>
              <li>Временный доступ к FC+</li>
            </ul>
          </div>
          
          <div className="bg-white/5 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4 text-purple-400">Кейсы с FCoins</h3>
            <p className="text-gray-300 mb-4">Гарантированно содержат:</p>
            <ul className="list-disc pl-5 text-gray-300 space-y-1">
              <li>От 25 до 200 FCoins в зависимости от стоимости кейса</li>
              <li>Шанс получить бонусные FCoins (до 50% больше)</li>
              <li>Небольшой шанс выиграть привилегию или другие ценные предметы</li>
            </ul>
          </div>
          
          <div className="bg-white/5 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-purple-400">Кейс "Все или ничего"</h3>
            <p className="text-gray-300 mb-4">Особый кейс с высоким риском и высокой наградой:</p>
            <ul className="list-disc pl-5 text-gray-300 space-y-1">
              <li>50% шанс не получить ничего</li>
              <li>30% шанс получить привилегию KING или ниже</li>
              <li>15% шанс получить привилегию WIZARD или GRIEFER</li>
              <li>5% шанс получить привилегию LEGEND или GLADIATOR</li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-8 border-t border-purple-900/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-400">© {new Date().getFullYear()} FcGrief. Все права защищены.</p>
            <p className="text-gray-500 text-sm mt-2">Сервер не связан с Mojang AB</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Cases;
