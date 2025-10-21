'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, ShoppingCart } from 'lucide-react';
import { MenuCard } from './MenuCard';
import { Button } from './Button';
import Link from 'next/link';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  isVeg: boolean;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Butter Chicken',
    description: 'Creamy tomato-based curry with tender chicken pieces',
    price: 320,
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400',
    rating: 4.5,
    category: 'Main Course',
    isVeg: false
  },
  {
    id: '2',
    name: 'Paneer Tikka Masala',
    description: 'Grilled cottage cheese in rich spicy gravy',
    price: 280,
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400',
    rating: 4.3,
    category: 'Main Course',
    isVeg: true
  },
  {
    id: '3',
    name: 'Chicken Biryani',
    description: 'Aromatic basmati rice with spiced chicken',
    price: 350,
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d51a?w=400',
    rating: 4.7,
    category: 'Rice & Biryani',
    isVeg: false
  },
  {
    id: '4',
    name: 'Veg Biryani',
    description: 'Fragrant rice with mixed vegetables and spices',
    price: 250,
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400',
    rating: 4.2,
    category: 'Rice & Biryani',
    isVeg: true
  },
  {
    id: '5',
    name: 'Masala Dosa',
    description: 'Crispy crepe with spiced potato filling',
    price: 120,
    image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400',
    rating: 4.4,
    category: 'South Indian',
    isVeg: true
  },
  {
    id: '6',
    name: 'Chicken Tikka',
    description: 'Grilled marinated chicken pieces',
    price: 280,
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400',
    rating: 4.6,
    category: 'Starters',
    isVeg: false
  },
  {
    id: '7',
    name: 'Gulab Jamun',
    description: 'Sweet milk dumplings in sugar syrup',
    price: 80,
    image: 'https://images.unsplash.com/photo-1571167530149-c72f17bb2304?w=400',
    rating: 4.5,
    category: 'Desserts',
    isVeg: true
  },
  {
    id: '8',
    name: 'Mango Lassi',
    description: 'Refreshing yogurt drink with mango',
    price: 60,
    image: 'https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=400',
    rating: 4.3,
    category: 'Beverages',
    isVeg: true
  }
];

const categories = ['All', 'Starters', 'Main Course', 'Rice & Biryani', 'South Indian', 'Desserts', 'Beverages'];

export const FoodMenu: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showVegOnly, setShowVegOnly] = useState(false);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesVeg = !showVegOnly || item.isVeg;
    return matchesCategory && matchesSearch && matchesVeg;
  });

  const addToCart = (item: MenuItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      let updatedCart;
      if (existingItem) {
        updatedCart = prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        updatedCart = [...prevCart, { ...item, quantity: 1 }];
      }
      
      // Store cart in localStorage
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800">Our Menu</h1>
            <div className="relative">
              <Link href="/cart">
                <Button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Cart ({getTotalItems()})
                  {getTotalItems() > 0 && (
                    <span className="ml-2 text-sm">₹{getTotalPrice()}</span>
                  )}
                </Button>
              </Link>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for dishes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showVegOnly}
                  onChange={(e) => setShowVegOnly(e.target.checked)}
                  className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                />
                <span className="text-sm text-gray-700">Veg Only</span>
              </label>
              
              <Filter className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Category Tabs */}
        <div className="flex overflow-x-auto gap-2 mb-6 pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <MenuCard
              key={item.id}
              {...item}
              onAddToCart={addToCart}
            />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No items found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Floating Cart Button for Mobile */}
      {getTotalItems() > 0 && (
        <div className="fixed bottom-4 right-4 md:hidden">
          <Link href="/cart">
            <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              {getTotalItems()} items • ₹{getTotalPrice()}
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};