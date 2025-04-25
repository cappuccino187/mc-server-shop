import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart, Product } from '@/components/CartContext';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const getDefaultImageByCategory = (category: string) => {
    switch (category) {
      case 'privileges':
        return 'https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?q=80&w=400';
      case 'cases':
        return 'https://images.unsplash.com/photo-1613027917970-ccf1b94ae534?q=80&w=400';
      case 'fcplus':
        return 'https://images.unsplash.com/photo-1624953587687-daf255b6b80a?q=80&w=400';
      case 'other':
        return 'https://images.unsplash.com/photo-1688201810744-e4e8c7a3100a?q=80&w=400';
      default:
        return 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=400';
    }
  };

  const imageUrl = product.image || getDefaultImageByCategory(product.category);

  return (
    <Card className="overflow-hidden transition-all hover:shadow-xl bg-white bg-opacity-90 backdrop-blur-sm border border-minecraft-accent/30 hover:scale-[1.02] duration-300">
      <div className="h-40 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
        />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-xl text-minecraft-dark">{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-gray-600 mb-2">{product.category}</p>
        <p className="text-2xl font-bold text-minecraft-primary">{product.price.toFixed(2)} ₽</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={() => addToCart(product)} 
          className="w-full bg-minecraft-primary hover:bg-minecraft-secondary text-white"
        >
          <ShoppingCart className="mr-2 h-4 w-4" /> В корзину
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
