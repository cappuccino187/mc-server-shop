import { Product } from '@/components/CartContext';

export const products: Product[] = [
  // Привилегии
  {
    id: 'priv-ranger',
    name: 'RANGER',
    price: 25.00,
    category: 'privileges',
    image: 'https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?q=80&w=400'
  },
  {
    id: 'priv-elder',
    name: 'ELDER',
    price: 79.00,
    category: 'privileges',
    image: 'https://images.unsplash.com/photo-1640167189719-c7f2df5fe0f1?q=80&w=400'
  },
  {
    id: 'priv-king',
    name: 'KING',
    price: 119.00,
    category: 'privileges',
    image: 'https://images.unsplash.com/photo-1639766484063-f9fe3fb73fa7?q=80&w=400'
  },
  {
    id: 'priv-wizard',
    name: 'WIZARD',
    price: 249.00,
    category: 'privileges',
    image: 'https://images.unsplash.com/photo-1584198898385-b152c2cc1724?q=80&w=400'
  },
  {
    id: 'priv-griefer',
    name: 'GRIEFER',
    price: 349.00,
    category: 'privileges',
    image: 'https://images.unsplash.com/photo-1562184552-b7a0512e75de?q=80&w=400'
  },
  {
    id: 'priv-legend',
    name: 'LEGEND',
    price: 550.00,
    category: 'privileges',
    image: 'https://images.unsplash.com/photo-1608085575984-d61d8335340e?q=80&w=400'
  },
  {
    id: 'priv-gladiator',
    name: 'GLADIATOR',
    price: 854.00,
    category: 'privileges',
    image: 'https://images.unsplash.com/photo-1622762330622-94fe2b61a38e?q=80&w=400'
  },

  // Кейсы
  {
    id: 'case-donate-1',
    name: '1 донат кейс',
    price: 45.00,
    category: 'cases',
    image: 'https://images.unsplash.com/photo-1613027917970-ccf1b94ae534?q=80&w=400'
  },
  {
    id: 'case-donate-3',
    name: '3 донат кейса',
    price: 120.00,
    category: 'cases',
    image: 'https://images.unsplash.com/photo-1614792696804-4cb60d931f95?q=80&w=400'
  },
  {
    id: 'case-donate-5',
    name: '5 донат кейсов',
    price: 200.00,
    category: 'cases',
    image: 'https://images.unsplash.com/photo-1634168536788-4029589bbaba?q=80&w=400'
  },
  {
    id: 'case-donate-10',
    name: '10 донат кейсов',
    price: 350.00,
    category: 'cases',
    image: 'https://images.unsplash.com/photo-1635858494198-6962961665ce?q=80&w=400'
  },
  {
    id: 'case-fcoins-1',
    name: '1 кейс с FCoins',
    price: 35.00,
    category: 'cases',
    image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=400'
  },
  {
    id: 'case-fcoins-3',
    name: '3 кейса с FCoins',
    price: 65.00,
    category: 'cases',
    image: 'https://images.unsplash.com/photo-1682172200755-0a83f4e0a96a?q=80&w=400'
  },
  {
    id: 'case-fcoins-5',
    name: '5 кейсов с FCoins',
    price: 105.00,
    category: 'cases',
    image: 'https://images.unsplash.com/photo-1616731948638-8a235d93b555?q=80&w=400'
  },
  {
    id: 'case-fcoins-10',
    name: '10 кейсов с FCoins',
    price: 185.00,
    category: 'cases',
    image: 'https://images.unsplash.com/photo-1619903973919-5d527171647c?q=80&w=400'
  },
  {
    id: 'case-all-or-nothing',
    name: 'Все или ничего',
    price: 320.00,
    category: 'cases',
    image: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?q=80&w=400'
  },

  // FC+
  {
    id: 'fcplus-month',
    name: 'FC+ на 1 месяц',
    price: 119.00,
    category: 'fcplus',
    image: 'https://images.unsplash.com/photo-1624953587687-daf255b6b80a?q=80&w=400'
  },
  {
    id: 'fcplus-year',
    name: 'FC+ на год',
    price: 568.00,
    category: 'fcplus',
    image: 'https://images.unsplash.com/photo-1622633968996-8970e8ea0a5f?q=80&w=400'
  },
  {
    id: 'fcplus-forever',
    name: 'FC+ навсегда',
    price: 1176.00,
    category: 'fcplus',
    image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=400'
  },

  // Другое
  {
    id: 'other-unban',
    name: 'РАЗБАН АККАУНТА',
    price: 250.00,
    category: 'other',
    image: 'https://images.unsplash.com/photo-1688201810744-e4e8c7a3100a?q=80&w=400'
  },
  {
    id: 'other-unmute',
    name: 'РАЗМУТ АККАУНТА',
    price: 50.00,
    category: 'other',
    image: 'https://images.unsplash.com/photo-1614521084980-811d04f6c6cb?q=80&w=400'
  },

  // Валюта
  {
    id: 'currency-fcoins',
    name: 'FCoins (3 ед.)',
    price: 1.00,
    category: 'currency',
    image: 'https://images.unsplash.com/photo-1621844102693-5daecb41939f?q=80&w=400'
  }
];

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};
