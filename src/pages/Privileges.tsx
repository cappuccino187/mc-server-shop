import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { getProductsByCategory } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

const Privileges = () => {
  const [isVisible, setIsVisible] = useState(false);
  const privileges = getProductsByCategory('privileges');
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          className="mb-6 text-white flex items-center hover:bg-white/10"
          onClick={() => navigate('/')}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Назад
        </Button>

        {/* Hero Section */}
        <section 
          className={`text-center py-12 mb-12 rounded-xl bg-minecraft-dark bg-opacity-70 backdrop-blur-sm transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Привилегии</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Получите расширенные возможности на сервере FcGrief с нашими привилегиями
          </p>
        </section>

        {/* Privileges Comparison */}
        <section className="mb-12 overflow-x-auto">
          <div className="min-w-[768px]">
            <div className="grid grid-cols-8 gap-2 mb-2 text-center">
              <div className="bg-minecraft-dark text-white p-3 rounded-tl-lg font-bold">Функции</div>
              <div className="bg-green-100 text-green-800 p-3 font-bold">RANGER</div>
              <div className="bg-blue-100 text-blue-800 p-3 font-bold">ELDER</div>
              <div className="bg-indigo-100 text-indigo-800 p-3 font-bold">KING</div>
              <div className="bg-purple-100 text-purple-800 p-3 font-bold">WIZARD</div>
              <div className="bg-pink-100 text-pink-800 p-3 font-bold">GRIEFER</div>
              <div className="bg-amber-100 text-amber-800 p-3 font-bold">LEGEND</div>
              <div className="bg-red-100 text-red-800 p-3 rounded-tr-lg font-bold">GLADIATOR</div>
            </div>
            
            {/* Comparison rows */}
            {[
              { feature: "Количество домов", values: ["2", "3", "4", "5", "8", "10", "15"] },
              { feature: "Набор команд", values: ["Базовый", "Базовый+", "Средний", "Расширенный", "Продвинутый", "Максимальный", "Все"] },
              { feature: "Анти-уроны", values: ["❌", "❌", "✅", "✅", "✅", "✅", "✅"] },
              { feature: "Креатив", values: ["❌", "❌", "❌", "✅", "✅", "✅", "✅"] },
              { feature: "Питомцы", values: ["❌", "❌", "1", "2", "3", "5", "∞"] },
              { feature: "Префикс", values: ["❌", "✅", "✅", "✅", "✅", "✅", "✅"] },
              { feature: "Цветной чат", values: ["❌", "❌", "✅", "✅", "✅", "✅", "✅"] },
              { feature: "Отключение PvP", values: ["❌", "❌", "❌", "❌", "✅", "✅", "✅"] },
              { feature: "Двойной дроп", values: ["❌", "❌", "❌", "❌", "❌", "✅", "✅"] },
              { feature: "FCoins в день", values: ["1", "2", "5", "10", "15", "25", "50"] }
            ].map((row, rowIndex) => (
              <div key={rowIndex} className={`grid grid-cols-8 gap-2 mb-2 text-center ${rowIndex % 2 === 0 ? 'bg-gray-100/10' : 'bg-gray-200/10'}`}>
                <div className="p-3 text-white font-medium">{row.feature}</div>
                {row.values.map((value, colIndex) => (
                  <div key={colIndex} className={`p-3 ${value === "✅" ? 'text-green-400' : value === "❌" ? 'text-red-400' : 'text-white'}`}>
                    {value}
                  </div>
                ))}
              </div>
            ))}
            
            <div className="grid grid-cols-8 gap-2 text-center">
              <div className="bg-minecraft-dark text-white p-3 rounded-bl-lg font-bold">Цена</div>
              <div className="bg-green-100 text-green-800 p-3 font-bold">25₽</div>
              <div className="bg-blue-100 text-blue-800 p-3 font-bold">79₽</div>
              <div className="bg-indigo-100 text-indigo-800 p-3 font-bold">119₽</div>
              <div className="bg-purple-100 text-purple-800 p-3 font-bold">249₽</div>
              <div className="bg-pink-100 text-pink-800 p-3 font-bold">349₽</div>
              <div className="bg-amber-100 text-amber-800 p-3 font-bold">550₽</div>
              <div className="bg-red-100 text-red-800 p-3 rounded-br-lg font-bold">854₽</div>
            </div>
          </div>
        </section>

        {/* Products List */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center text-white">Выберите привилегию</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {privileges.map((privilege, index) => (
              <div
                key={privilege.id}
                className={`transition-all duration-500 delay-${index * 100} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                <ProductCard product={privilege} />
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-minecraft-dark text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400">© {new Date().getFullYear()} FcGrief. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Privileges;
