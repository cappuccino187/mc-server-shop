import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/components/CartContext';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const Header = () => {
  const { cartItems, totalPrice } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Calculate total items in cart
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { title: 'Главная', path: '/' },
    { title: 'Привилегии', path: '/privileges' },
    { title: 'Кейсы', path: '/cases' },
    { title: 'FC+', path: '/fcplus' },
    { title: 'Другое', path: '/other' },
  ];

  return (
    <header 
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled 
          ? 'bg-gray-900/90 backdrop-blur-lg shadow-lg py-3' 
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl md:text-2xl font-bold text-white">
              <span className="text-purple-500">Fc</span>Grief
            </span>
          </Link>

          {/* Server IP Display */}
          <div className="hidden md:flex items-center ml-6 px-3 py-1 bg-gray-800/50 rounded-full">
            <span className="text-gray-400 text-xs mr-2">IP:</span>
            <span className="text-green-400 text-sm font-mono">c11.play2go.cloud:20095</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  window.location.pathname === item.path
                    ? 'text-white bg-purple-600/30'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* Cart Button */}
          <div className="flex items-center space-x-2">
            <Link to="/cart">
              <Button variant="outline" size="sm" className="relative bg-transparent border-purple-600/30 text-white hover:bg-purple-600/20 hover:border-purple-600/50">
                <ShoppingCart className="h-4 w-4 mr-1" />
                <span>Корзина</span>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {/* Discord Button */}
            <a 
              href="https://discord.gg/MBQYxKMpJx" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden md:flex items-center text-gray-300 hover:text-white"
            >
              <Button variant="ghost" size="sm" className="bg-indigo-600/20 hover:bg-indigo-600/30">
                <span className="mr-1">Discord</span>
              </Button>
            </a>

            {/* Mobile Menu Trigger */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="md:hidden text-white hover:bg-white/10"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80%] sm:w-[350px] bg-gray-900 border-gray-800 p-0">
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                    <span className="text-xl font-bold text-white">
                      <span className="text-purple-500">Fc</span>Grief
                    </span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-gray-400 hover:text-white hover:bg-white/10"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  <div className="p-3 bg-gray-800/50 m-4 rounded-md">
                    <div className="flex items-center">
                      <span className="text-gray-400 text-xs mr-2">IP сервера:</span>
                      <span className="text-green-400 text-sm font-mono">c11.play2go.cloud:20095</span>
                    </div>
                  </div>

                  <div className="py-4 flex-grow">
                    <nav className="flex flex-col space-y-1 px-2">
                      {navItems.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`px-4 py-3 rounded-md transition-colors ${
                            window.location.pathname === item.path
                              ? 'text-white bg-purple-600/30'
                              : 'text-gray-300 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          {item.title}
                        </Link>
                      ))}

                      <a 
                        href="https://discord.gg/MBQYxKMpJx" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-3 rounded-md text-gray-300 hover:text-white hover:bg-indigo-600/20 flex items-center"
                      >
                        <span className="text-indigo-400 mr-2">Discord</span>
                        <span className="text-xs text-gray-500">discord.gg/MBQYxKMpJx</span>
                      </a>
                    </nav>
                  </div>
                  
                  <div className="p-4 border-t border-gray-800">
                    <Link 
                      to="/cart" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between w-full p-3 rounded-md bg-purple-600/20 text-white hover:bg-purple-600/30 transition-colors"
                    >
                      <div className="flex items-center">
                        <ShoppingCart className="h-5 w-5 mr-2" />
                        <span>Корзина</span>
                      </div>
                      <div className="text-right">
                        <span className="block text-sm">{totalItems} {totalItems === 1 ? 'товар' : 
                          totalItems > 1 && totalItems < 5 ? 'товара' : 'товаров'}</span>
                        <span className="block font-bold">{totalPrice.toFixed(2)} ₽</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
