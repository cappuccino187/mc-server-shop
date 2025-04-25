import { getProductsByCategory } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import Header from '@/components/Header';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Other = () => {
  const otherProducts = getProductsByCategory('other');
  const currency = getProductsByCategory('currency');

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Другие услуги</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Разбан, размут и другие полезные услуги для игроков
          </p>
        </div>

        {/* Services Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Услуги разбана и размута</h2>
          
          <Alert className="mb-6 bg-red-900/20 border-red-700/50 text-white">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <AlertTitle className="text-red-400">Важная информация</AlertTitle>
            <AlertDescription className="text-gray-300">
              Услуги разбана и размута не распространяются на блокировки за серьезные нарушения, 
              такие как читы, эксплойты и преднамеренные действия, наносящие вред серверу.
            </AlertDescription>
          </Alert>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {otherProducts.map(product => (
              <div key={product.id} className="bg-white/5 rounded-xl overflow-hidden">
                <div className="h-40 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-white">{product.name}</h3>
                  <p className="text-gray-300 mb-4">
                    {product.name.includes("РАЗБАН") 
                      ? "Разблокировка вашего аккаунта на сервере после нарушения правил" 
                      : "Снятие ограничения на общение в чате после нарушения правил"}
                  </p>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Стоимость услуги:</p>
                      <p className="text-2xl font-bold text-red-400">{product.price.toFixed(2)} ₽</p>
                    </div>
                    <ProductCard product={product} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-10 bg-gray-700" />

        {/* Currency Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Внутриигровая валюта</h2>
          
          <div className="bg-yellow-900/20 rounded-xl overflow-hidden mb-8">
            <div className="p-6">
              <div className="flex items-center gap-6 flex-wrap md:flex-nowrap">
                <div className="h-32 w-32 overflow-hidden rounded-full flex-shrink-0 mx-auto md:mx-0">
                  <img 
                    src={currency[0]?.image || "https://images.unsplash.com/photo-1621844102693-5daecb41939f?q=80&w=400"}
                    alt="FCoins" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-2 text-yellow-400">FCoins</h3>
                  <p className="text-gray-300 mb-4">
                    Внутриигровая валюта для покупки предметов и услуг непосредственно на сервере.
                    Используйте FCoins для торговли с другими игроками и приобретения эксклюзивных товаров.
                  </p>
                  <div className="flex items-center justify-center md:justify-start gap-4">
                    <div>
                      <p className="text-xl font-bold text-yellow-400">{currency[0]?.price.toFixed(2)} ₽</p>
                      <p className="text-sm text-gray-400">за 3 FCoins</p>
                    </div>
                    <ProductCard product={currency[0]} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/5 rounded-xl p-6">
              <div className="text-3xl mb-3 text-yellow-500">💰</div>
              <h3 className="text-xl font-semibold mb-2 text-white">Где использовать</h3>
              <p className="text-gray-300">
                Используйте FCoins в торговых автоматах на сервере, для покупки особых предметов и для торговли с игроками
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6">
              <div className="text-3xl mb-3 text-yellow-500">🔄</div>
              <h3 className="text-xl font-semibold mb-2 text-white">Как получить</h3>
              <p className="text-gray-300">
                Приобретите FCoins в магазине, выиграйте их в кейсах или получите за активность на сервере
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6">
              <div className="text-3xl mb-3 text-yellow-500">⚡</div>
              <h3 className="text-xl font-semibold mb-2 text-white">Мгновенное зачисление</h3>
              <p className="text-gray-300">
                После покупки FCoins мгновенно зачисляются на ваш аккаунт на сервере
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white/5 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Часто задаваемые вопросы</h2>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-b-white/10">
              <AccordionTrigger className="text-white hover:text-white/80">
                Как быстро будет выполнен разбан/размут?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                После подтверждения оплаты услуга будет оказана в течение 10-15 минут автоматически. 
                В редких случаях может потребоваться до 1 часа для ручной обработки заявки администратором.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="border-b-white/10">
              <AccordionTrigger className="text-white hover:text-white/80">
                Могу ли я купить разбан/размут для другого игрока?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                Да, при оформлении заказа вы можете указать никнейм другого игрока, для которого приобретается услуга.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="border-b-white/10">
              <AccordionTrigger className="text-white hover:text-white/80">
                Есть ли лимит на покупку FCoins?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                Нет, вы можете приобрести любое количество FCoins, добавляя товар в корзину нужное количество раз.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4" className="border-b-white/10">
              <AccordionTrigger className="text-white hover:text-white/80">
                Что делать, если я был забанен за читы?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                К сожалению, услуга разбана не распространяется на блокировки за использование 
                читов, эксплойтов и других серьезных нарушений правил сервера.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger className="text-white hover:text-white/80">
                Можно ли вернуть деньги за услугу?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                Возврат средств возможен только в случае, если услуга не была оказана в течение 24 часов 
                после оплаты. Для возврата необходимо обратиться в поддержку через Discord сервер.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-8 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-400">© {new Date().getFullYear()} FcGrief. Все права защищены.</p>
            <p className="text-gray-500 text-sm mt-2">Для вопросов и поддержки: discord.gg/fcgrief</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Other;
