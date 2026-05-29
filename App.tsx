import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Categories } from './components/Categories';
import { MenuSection } from './components/MenuSection';
import { Cart } from './components/Cart';
import { toast, Toaster } from 'sonner';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  popular?: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Margherita Pizza',
    description: 'Classic tomato sauce, fresh mozzarella, basil',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400',
    category: 'pizza',
    rating: 4.8,
    popular: true,
  },
  {
    id: '2',
    name: 'Pepperoni Pizza',
    description: 'Tomato sauce, mozzarella, premium pepperoni',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400',
    category: 'pizza',
    rating: 4.9,
    popular: true,
  },
  {
    id: '3',
    name: 'Chicken Burger',
    description: 'Grilled chicken, lettuce, tomato, special sauce',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
    category: 'burgers',
    rating: 4.6,
  },
  {
    id: '4',
    name: 'Beef Burger',
    description: 'Angus beef patty, cheese, pickles, onions',
    price: 11.99,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400',
    category: 'burgers',
    rating: 4.7,
    popular: true,
  },
  {
    id: '5',
    name: 'Caesar Salad',
    description: 'Romaine lettuce, parmesan, croutons, Caesar dressing',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400',
    category: 'salads',
    rating: 4.5,
  },
  {
    id: '6',
    name: 'Greek Salad',
    description: 'Fresh vegetables, feta cheese, olives, olive oil',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400',
    category: 'salads',
    rating: 4.6,
  },
  {
    id: '7',
    name: 'Spaghetti Carbonara',
    description: 'Pasta with eggs, bacon, parmesan, black pepper',
    price: 13.99,
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400',
    category: 'pasta',
    rating: 4.8,
  },
  {
    id: '8',
    name: 'Penne Arrabiata',
    description: 'Spicy tomato sauce, garlic, chili peppers',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400',
    category: 'pasta',
    rating: 4.7,
  },
  {
    id: '9',
    name: 'Chocolate Cake',
    description: 'Rich chocolate layers with chocolate ganache',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
    category: 'desserts',
    rating: 4.9,
  },
  {
    id: '10',
    name: 'Tiramisu',
    description: 'Italian dessert with coffee-soaked ladyfingers',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400',
    category: 'desserts',
    rating: 4.8,
  },
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredItems = selectedCategory === 'all'
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  const addToCart = (item: MenuItem) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    toast.success(`${item.name} added to cart`);
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(itemId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" richColors />
      <Header
        cartItemCount={totalItems}
        onCartClick={() => setIsCartOpen(true)}
      />
      <Hero />
      <Categories
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <MenuSection
        items={filteredItems}
        onAddToCart={addToCart}
      />
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />
    </div>
  );
}
