import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation, 30-hour battery life, and premium sound quality. Perfect for music lovers and professionals.',
    price: 299.99,
    originalPrice: 399.99,
    category: 'Electronics',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
    inStock: true,
    stockCount: 15,
    rating: 4.8,
    reviews: 124,
    brand: 'AudioTech',
    tags: ['wireless', 'noise-cancelling', 'premium']
  },
  {
    id: '2',
    name: 'Organic Cotton T-Shirt',
    description: 'Comfortable, breathable organic cotton t-shirt available in multiple colors. Sustainably sourced and ethically manufactured.',
    price: 29.99,
    category: 'Clothing',
    image: 'https://images.pexels.com/photos/1261427/pexels-photo-1261427.jpeg?auto=compress&cs=tinysrgb&w=500',
    inStock: true,
    stockCount: 45,
    rating: 4.5,
    reviews: 89,
    brand: 'EcoWear',
    tags: ['organic', 'cotton', 'sustainable']
  },
  {
    id: '3',
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracking watch with heart rate monitoring, GPS, water resistance, and 7-day battery life.',
    price: 249.99,
    originalPrice: 299.99,
    category: 'Electronics',
    image: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=500',
    inStock: true,
    stockCount: 8,
    rating: 4.6,
    reviews: 156,
    brand: 'FitTech',
    tags: ['fitness', 'smartwatch', 'gps']
  },
  {
    id: '4',
    name: 'Artisan Coffee Beans',
    description: 'Premium single-origin coffee beans, medium roast, sourced directly from sustainable farms. Rich flavor with notes of chocolate and caramel.',
    price: 24.99,
    category: 'Food & Beverage',
    image: 'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=500',
    inStock: true,
    stockCount: 32,
    rating: 4.9,
    reviews: 78,
    brand: 'Mountain Roasters',
    tags: ['coffee', 'organic', 'single-origin']
  },
  {
    id: '5',
    name: 'Minimalist Desk Lamp',
    description: 'Modern LED desk lamp with adjustable brightness, USB charging port, and sleek minimalist design. Perfect for home offices.',
    price: 89.99,
    category: 'Home & Office',
    image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=500',
    inStock: true,
    stockCount: 12,
    rating: 4.4,
    reviews: 45,
    brand: 'ModernLight',
    tags: ['led', 'adjustable', 'usb']
  },
  {
    id: '6',
    name: 'Leather Crossbody Bag',
    description: 'Handcrafted genuine leather crossbody bag with multiple compartments. Timeless design suitable for both casual and formal occasions.',
    price: 149.99,
    category: 'Accessories',
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=500',
    inStock: false,
    stockCount: 0,
    rating: 4.7,
    reviews: 92,
    brand: 'CraftLeather',
    tags: ['leather', 'handcrafted', 'crossbody']
  },
  {
    id: '7',
    name: 'Bluetooth Portable Speaker',
    description: 'Compact waterproof Bluetooth speaker with 360-degree sound, 12-hour battery life, and premium build quality.',
    price: 79.99,
    originalPrice: 99.99,
    category: 'Electronics',
    image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=500',
    inStock: true,
    stockCount: 20,
    rating: 4.5,
    reviews: 134,
    brand: 'SoundWave',
    tags: ['bluetooth', 'waterproof', 'portable']
  },
  {
    id: '8',
    name: 'Ceramic Plant Pot Set',
    description: 'Beautiful set of 3 ceramic plant pots with drainage holes and saucers. Perfect for indoor plants and herbs.',
    price: 45.99,
    category: 'Home & Garden',
    image: 'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=500',
    inStock: true,
    stockCount: 25,
    rating: 4.3,
    reviews: 67,
    brand: 'GreenThumb',
    tags: ['ceramic', 'plants', 'set']
  }
];

export const categories = [
  'All Categories',
  'Electronics',
  'Clothing',
  'Food & Beverage',
  'Home & Office',
  'Accessories',
  'Home & Garden'
];