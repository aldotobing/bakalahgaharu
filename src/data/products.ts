import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Merauke Mid Grade',
    grade: 'Mid Grade',
    colors: ['Brown', 'Black', 'Red'],
    price: 200,
    currency: 'USD',
    description: 'The distinctive aroma of super grade merauke gaharu when burned and smelled, is very thick and dense, forming a mini natural or super merauke. This model is very familiar and most in demand by countries such as Saudi Arabia, Abu Dhabi, Dubai, Qatar, and other Middle Eastern regions. Its strong and distinctive aroma can calm, relax and also add a positive aura to the room and yourself.',
    image: '/product1.jpg',
    badge: 'Best Seller'
  },
  {
    id: '2',
    name: 'Merauke Super Grade',
    grade: 'Super Grade',
    colors: ['Yellow', 'Brown', 'Black'],
    price: 375,
    currency: 'USD',
    description: 'The aroma of "Gaharu Merauke Sanai Muhassan" premium grade undoubtedly possesses a distinctive dimension of spices. When burned, it emits not only a sweet and woody scent but also resonates with remarkable spice notes. This fragrance has depth and warmth, evoking nostalgia for the spices traditionally used in Arab and Asian cultures, creating a rich and elegant atmosphere. With each inhalation, this aroma elevates the experience, becoming a symbol of luxury highly valued by the elite.',
    image: '/product2.jpg',
    badge: 'Most Wanted'
  }
];