'use client';

import { useState } from 'react';
import Header from './Header';
import SearchBar from './SearchBar';
import BottomNavigation from './BottomNavigation';
import { useCart } from './CartContext';

interface RestaurantMenuProps {
  onBackClick?: () => void;
  onFoodItemClick?: (foodItem: any) => void;
}

export default function RestaurantMenu({ onBackClick, onFoodItemClick }: RestaurantMenuProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const { addToCart } = useCart();

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'starters', name: 'Starters' },
    { id: 'main', name: 'Main Course' },
    { id: 'breads', name: 'Breads' },
    { id: 'desserts', name: 'Desserts' },
    { id: 'beverages', name: 'Beverages' }
  ];

  // Sample food items data
  const foodItems = [
    {
      id: 1,
      name: 'Butter Chicken',
      description: 'Chicken in rich tomato and butter gravy',
      price: 349,
      category: 'main',
      image: '/api/placeholder/300/200',
      isVeg: false,
      isBestseller: true,
      rating: 4.5,
      reviews: 128,
      ingredients: ['Chicken', 'Tomato', 'Butter', 'Cream', 'Spices'],
      nutrition: { calories: 420, protein: 28, carbs: 12, fat: 32 }
    },
    {
      id: 2,
      name: 'Palak Paneer',
      description: 'Cottage cheese cubes in spinach gravy',
      price: 299,
      category: 'main',
      image: '/api/placeholder/300/200',
      isVeg: true,
      isBestseller: false,
      rating: 4.3,
      reviews: 95,
      ingredients: ['Paneer', 'Spinach', 'Onion', 'Garlic', 'Spices'],
      nutrition: { calories: 320, protein: 18, carbs: 15, fat: 22 }
    },
    {
      id: 3,
      name: 'Butter Naan',
      description: 'Soft leavened bread',
      price: 49,
      category: 'breads',
      image: '/api/placeholder/300/200',
      isVeg: true,
      isBestseller: false,
      rating: 4.2,
      reviews: 67,
      ingredients: ['Flour', 'Butter', 'Yogurt', 'Yeast'],
      nutrition: { calories: 280, protein: 8, carbs: 45, fat: 8 }
    },
    {
      id: 4,
      name: 'Garlic Naan',
      description: 'Naan topped with garlic',
      price: 59,
      category: 'breads',
      image: '/api/placeholder/300/200',
      isVeg: true,
      isBestseller: false,
      rating: 4.4,
      reviews: 52,
      ingredients: ['Flour', 'Garlic', 'Butter', 'Yogurt', 'Yeast'],
      nutrition: { calories: 290, protein: 9, carbs: 46, fat: 9 }
    }
  ];

  const handleFoodItemClick = (foodItem: any) => {
    console.log('Food item clicked:', foodItem); // Debug log
    if (onFoodItemClick) {
      onFoodItemClick(foodItem);
    }
  };

  const handleAddToCart = (foodItem: any, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card click
    addToCart({
      id: foodItem.id.toString(),
      name: foodItem.name,
      price: foodItem.price,
      image: foodItem.image,
      category: foodItem.category,
      description: foodItem.description
    });
    console.log('Added to cart:', foodItem.name); // Debug log
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <Header 
        title="Spice Garden" 
        showBack={true} 
        showMenu={true}
        onBackClick={onBackClick}
      />

      {/* Search Bar */}
      <div className="px-4 -mt-2">
        <SearchBar 
          placeholder="Search Menu Items"
          value={searchQuery}
          onChange={setSearchQuery}
        />
      </div>

      {/* Restaurant Info Card */}
      <div className="bg-white mx-4 mt-4 rounded-2xl shadow-lg p-4">
        <div className="flex items-center mb-2">
          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white mr-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.325 14.37a1 1 0 01-1.65 0l-4.999-7A1 1 0 017.325 6h9.35a1 1 0 01.65 1.37l-4 7z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Spice Garden</h2>
            <p className="text-sm text-gray-500">Authentic Indian Cuisine</p>
          </div>
        </div>
        
        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex text-yellow-400 mr-2">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-gray-600 font-medium">4.5</span>
          <span className="text-gray-400 text-sm ml-2">(128 reviews)</span>
        </div>

        {/* Address & Info */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-gray-600">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm">123 Street, Area, City</span>
          </div>
          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">OPEN</span>
        </div>

        {/* Hours & Delivery */}
        <div className="flex text-sm text-gray-500 mb-4">
          <div className="flex items-center mr-4">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>11:00 AM - 10:00 PM</span>
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>30 min delivery</span>
          </div>
        </div>

        {/* Scan Again Button */}
        <button 
          onClick={onBackClick}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors shadow"
        >
          SCAN AGAIN
        </button>
      </div>

      {/* Special Offers */}
      <div className="mt-6 px-4">
        <h2 className="text-lg font-bold text-gray-800 mb-3">Today's Special</h2>
        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl p-3 text-white shadow-lg">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="font-bold text-lg">50% OFF on Family Combos</p>
              <p className="text-sm opacity-90">Use code: FAMILY50</p>
              <p className="text-xs mt-1 opacity-75">Valid until today midnight</p>
            </div>
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-red-600 font-bold text-xl">
              50%
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="mt-6 px-4">
        <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium ${
                activeCategory === category.id
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-gray-700 shadow'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Popular Items */}
      <div className="mt-6 px-4">
        <h2 className="text-lg font-bold text-gray-800 mb-3">Popular Items</h2>
        <div className="grid grid-cols-2 gap-3">
          <div 
            className="bg-white rounded-xl overflow-hidden shadow cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleFoodItemClick({
              id: 'popular-1',
              name: 'Butter Chicken',
              description: 'Creamy tomato-based curry with tender chicken pieces',
              price: 299,
              category: 'main',
              image: '/api/placeholder/300/200',
              isVeg: false,
              isBestseller: true,
              rating: 4.8,
              reviews: 156,
              ingredients: ['Chicken', 'Tomato', 'Cream', 'Butter', 'Spices'],
              nutrition: { calories: 450, protein: 28, carbs: 12, fat: 32 }
            })}
          >
            <div className="h-24 bg-gray-200 relative">
              <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                Bestseller
              </div>
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-gray-800">Butter Chicken</h3>
              <div className="flex items-center mt-1">
                <div className="flex text-yellow-400 text-xs">
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-xs text-gray-600 ml-1">4.8</span>
                </div>
                <span className="text-gray-500 text-xs ml-2">• 20 min</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="font-bold text-gray-800">₹299</span>
                <button 
                  className="bg-red-600 text-white text-xs px-2 py-1 rounded"
                  onClick={(e) => handleAddToCart({
                    id: 'popular-1',
                    name: 'Butter Chicken',
                    description: 'Creamy tomato-based curry with tender chicken pieces',
                    price: 299,
                    category: 'main',
                    image: '/api/placeholder/300/200'
                  }, e)}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          
          <div 
            className="bg-white rounded-xl overflow-hidden shadow cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleFoodItemClick({
              id: 'popular-2',
              name: 'Paneer Tikka',
              description: 'Cottage cheese marinated in spices and grilled to perfection',
              price: 249,
              category: 'starters',
              image: '/api/placeholder/300/200',
              isVeg: true,
              isBestseller: false,
              rating: 4.6,
              reviews: 89,
              ingredients: ['Paneer', 'Bell Peppers', 'Onion', 'Yogurt', 'Spices'],
              nutrition: { calories: 280, protein: 16, carbs: 8, fat: 20 }
            })}
          >
            <div className="h-24 bg-gray-200 relative">
              <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                Veg
              </div>
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-gray-800">Paneer Tikka</h3>
              <div className="flex items-center mt-1">
                <div className="flex text-yellow-400 text-xs">
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-xs text-gray-600 ml-1">4.6</span>
                </div>
                <span className="text-gray-500 text-xs ml-2">• 15 min</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="font-bold text-gray-800">₹249</span>
                <button 
                  className="bg-red-600 text-white text-xs px-2 py-1 rounded"
                  onClick={(e) => handleAddToCart({
                    id: 'popular-2',
                    name: 'Paneer Tikka',
                    description: 'Cottage cheese marinated in spices and grilled to perfection',
                    price: 249,
                    category: 'starters',
                    image: '/api/placeholder/300/200'
                  }, e)}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Categories */}
      <div className="mt-6 px-4">
        {/* Starters Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">Starters</h2>
            <span className="text-sm text-gray-500">6 items</span>
          </div>
          
          <div className="space-y-4">
            {/* Menu Item with Image */}
            <div 
              className="bg-white rounded-xl p-3 shadow-sm flex cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleFoodItemClick({
                id: 'starter-1',
                name: 'Paneer Tikka',
                description: 'Cottage cheese marinated in spices and grilled to perfection',
                price: 249,
                category: 'starters',
                image: '/api/placeholder/300/200',
                isVeg: true,
                isBestseller: false,
                rating: 4.6,
                reviews: 89,
                ingredients: ['Paneer', 'Bell Peppers', 'Onion', 'Yogurt', 'Spices'],
                nutrition: { calories: 280, protein: 16, carbs: 8, fat: 20 }
              })}
            >
              <div className="w-20 h-20 bg-gray-200 rounded-lg mr-3 flex-shrink-0"></div>
              <div className="flex-1">
                <div className="flex items-center">
                  <h3 className="font-semibold text-gray-800">Paneer Tikka</h3>
                  <svg className="w-4 h-4 text-green-600 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-500 text-sm">Cottage cheese marinated in spices and grilled</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-bold text-gray-800">₹249</span>
                  <button 
                    className="bg-red-600 text-white text-xs px-3 py-1 rounded-full"
                    onClick={(e) => handleAddToCart({
                      id: 'starter-1',
                      name: 'Paneer Tikka',
                      description: 'Cottage cheese marinated in spices and grilled to perfection',
                      price: 249,
                      category: 'starters',
                      image: '/api/placeholder/300/200'
                    }, e)}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
            
            {/* Menu Item with Image */}
            <div 
              className="bg-white rounded-xl p-3 shadow-sm flex cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleFoodItemClick({
                id: 'starter-2',
                name: 'Chicken Tikka',
                description: 'Boneless chicken pieces marinated and grilled to perfection',
                price: 299,
                category: 'starters',
                image: '/api/placeholder/300/200',
                isVeg: false,
                isBestseller: true,
                rating: 4.7,
                reviews: 124,
                ingredients: ['Chicken', 'Yogurt', 'Ginger', 'Garlic', 'Spices'],
                nutrition: { calories: 320, protein: 28, carbs: 6, fat: 18 }
              })}
            >
              <div className="w-20 h-20 bg-gray-200 rounded-lg mr-3 flex-shrink-0"></div>
              <div className="flex-1">
                <div className="flex items-center">
                  <h3 className="font-semibold text-gray-800">Chicken Tikka</h3>
                  <svg className="w-4 h-4 text-red-600 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-500 text-sm">Boneless chicken pieces marinated and grilled</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-bold text-gray-800">₹299</span>
                  <button 
                    className="bg-red-600 text-white text-xs px-3 py-1 rounded-full"
                    onClick={(e) => handleAddToCart({
                      id: 'starter-2',
                      name: 'Chicken Tikka',
                      description: 'Boneless chicken pieces marinated and grilled to perfection',
                      price: 299,
                      category: 'starters',
                      image: '/api/placeholder/300/200'
                    }, e)}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Course Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">Main Course</h2>
            <span className="text-sm text-gray-500">8 items</span>
          </div>
          
          <div className="space-y-4">
            {/* Dynamic Menu Items */}
            {foodItems
              .filter(item => item.category === 'main')
              .map((item) => (
                <div 
                  key={item.id}
                  className="bg-white rounded-xl p-3 shadow-sm flex cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleFoodItemClick(item)}
                >
                  <div className="w-20 h-20 bg-gray-200 rounded-lg mr-3 flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      {item.isBestseller && (
                        <div className="ml-2 px-1.5 py-0.5 bg-red-100 text-red-800 text-xs rounded">Bestseller</div>
                      )}
                      {item.isVeg && (
                        <svg className="w-4 h-4 text-green-600 ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <p className="text-gray-500 text-sm">{item.description}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-bold text-gray-800">₹{item.price}</span>
                      <button 
                        className="bg-red-600 text-white text-xs px-3 py-1 rounded-full hover:bg-red-700 transition-colors"
                        onClick={(e) => handleAddToCart(item, e)}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        
        {/* Breads Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">Breads</h2>
            <span className="text-sm text-gray-500">5 items</span>
          </div>
          
          <div className="space-y-4">
            {/* Dynamic Bread Items */}
            {foodItems
              .filter(item => item.category === 'breads')
              .map((item) => (
                <div 
                  key={item.id}
                  className="bg-white rounded-xl p-3 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleFoodItemClick(item)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                        {item.isVeg && (
                          <svg className="w-4 h-4 text-green-600 ml-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <p className="text-gray-500 text-sm">{item.description}</p>
                    </div>
                    <div className="flex items-center">
                      <span className="font-bold text-gray-800 mr-2">₹{item.price}</span>
                      <button 
                        className="bg-red-600 text-white text-xs px-3 py-1 rounded-full hover:bg-red-700 transition-colors"
                        onClick={(e) => handleAddToCart(item, e)}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}