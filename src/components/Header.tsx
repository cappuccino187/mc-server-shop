import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/components/CartContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();
  
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-minecraft-dark bg-opacity-90 text-white py-4 sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-minecraft-primary hover:text-minecraft-accent transition-colors">
            FcGrief
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <div className="lg:hidden">
          <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menu">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden lg:flex space-x-8">
          <Link to="/" className="hover:text-minecraft-accent transition-colors py-2">Главная</Link>
          <Link to="/privileges" className="hover:text-minecraft-accent transition-colors py-2">Привилегии</Link>
          <Link to="/cases" className="hover:text-minecraft-accent transition-colors py-2">Кейсы</Link>
          <Link to="/fcplus" className="hover:text-minecraft-accent transition-colors py-2">FC+</Link>
          <Link to="/other" className="hover:text-minecraft-accent transition-colors py-2">Другое</Link>
        </nav>

        <Link to="/cart" className="relative">
          <Button variant="outline" className="border-minecraft-accent">
            <ShoppingCart className="text-minecraft-accent" />
            {totalItems > 0 && (
              <Badge variant="destructive" className="absolute -top-2 -right-2 min-w-5 h-5 flex items-center justify-center">
                {totalItems}
              </Badge>
            )}
          </Button>
        </Link>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-minecraft-dark bg-opacity-95 py-4 px-6 absolute w-full">
          <nav className="flex flex-col space-y-4">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="hover:text-minecraft-accent transition-colors">Главная</Link>
            <Link to="/privileges" onClick={() => setIsMenuOpen(false)} className="hover:text-minecraft-accent transition-colors">Привилегии</Link>
            <Link to="/cases" onClick={() => setIsMenuOpen(false)} className="hover:text-minecraft-accent transition-colors">Кейсы</Link>
            <Link to="/fcplus" onClick={() => setIsMenuOpen(false)} className="hover:text-minecraft-accent transition-colors">FC+</Link>
            <Link to="/other" onClick={() => setIsMenuOpen(false)} className="hover:text-minecraft-accent transition-colors">Другое</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
