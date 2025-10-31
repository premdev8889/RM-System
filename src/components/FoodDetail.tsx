'use client';

import { useState } from 'react';
import Header from './Header';

interface FoodItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  isVeg: boolean;
  spiceLevel: number;
  cookingTime: string;
  ingredients: string[];
  nutritionInfo: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
  };
  nutrition?: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
  };
}

interface FoodDetailProps {
  foodItem: FoodItem;
  onBackClick: () => void;
  onAddToCart?: (item: FoodItem, quantity: number) => void;
}

export default function FoodDetail({ foodItem, onBackClick, onAddToCart }: FoodDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('Regular');
  const [showFullDescription, setShowFullDescription] = useState(false);

  const sizes = [
    { name: 'Regular', price: foodItem.price, popular: true },
    { name: 'Large', price: foodItem.price + 50 },
    { name: 'Family', price: foodItem.price + 120 }
  ];

  const handleAddToCart = () => {
    onAddToCart?.(foodItem, quantity);
    // Show success message or animation
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  const renderSpiceLevel = (level: number) => {
    return Array.from({ length: 3 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${i < level ? 'text-red-500' : 'text-gray-300'}`}
      >
        🌶️
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header 
        title={foodItem.name}
        showBack={true}
        onBackClick={onBackClick}
      />

      {/* Food Image */}
      <div className="relative h-64 bg-gradient-to-br from-red-400 to-red-600">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-48 h-48 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-6xl">🍛</span>
          </div>
        </div>
        
        {/* Veg/Non-veg Indicator */}
        <div className="absolute top-4 right-4">
          <div className={`w-6 h-6 border-2 ${foodItem.isVeg ? 'border-green-600' : 'border-red-600'} flex items-center justify-center`}>
            <div className={`w-3 h-3 rounded-full ${foodItem.isVeg ? 'bg-green-600' : 'bg-red-600'}`}></div>
          </div>
        </div>

        {/* Rating Badge */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
          <div className="flex items-center gap-1">
            {renderStars(foodItem.rating)}
            <span className="text-sm font-semibold ml-1">{foodItem.rating}</span>
            <span className="text-xs text-gray-600">({foodItem.reviews})</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Basic Info */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-gray-800">{foodItem.name}</h1>
            <div className="flex items-center gap-2">
              {renderSpiceLevel(foodItem.spiceLevel)}
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
            <span className="flex items-center gap-1">
              ⏱️ {foodItem.cookingTime}
            </span>
            <span className="flex items-center gap-1">
              🏷️ {foodItem.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-red-600">₹{foodItem.price}</span>
            {foodItem.originalPrice && (
              <span className="text-lg text-gray-500 line-through">₹{foodItem.originalPrice}</span>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-xl p-4">
          <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {showFullDescription ? foodItem.description : `${foodItem.description.substring(0, 120)}...`}
          </p>
          <button
            onClick={() => setShowFullDescription(!showFullDescription)}
            className="text-red-600 text-sm font-medium mt-2"
          >
            {showFullDescription ? 'Show Less' : 'Read More'}
          </button>
        </div>

        {/* Size Selection */}
        <div className="bg-white rounded-xl p-4">
          <h3 className="font-semibold text-gray-800 mb-3">Choose Size</h3>
          <div className="space-y-2">
            {sizes.map((size) => (
              <div
                key={size.name}
                onClick={() => setSelectedSize(size.name)}
                className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                  selectedSize === size.name
                    ? 'border-red-600 bg-red-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium">{size.name}</span>
                  {size.popular && (
                    <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">Popular</span>
                  )}
                </div>
                <span className="font-semibold">₹{size.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Ingredients */}
        <div className="bg-white rounded-xl p-4">
          <h3 className="font-semibold text-gray-800 mb-3">Ingredients</h3>
          <div className="flex flex-wrap gap-2">
            {foodItem.ingredients.map((ingredient, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
              >
                {ingredient}
              </span>
            ))}
          </div>
        </div>

        {/* Nutrition Info */}
        <div className="bg-white rounded-xl p-4">
          <h3 className="font-semibold text-gray-800 mb-3">Nutrition Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-red-600">{foodItem.nutrition?.calories || 'N/A'}</div>
              <div className="text-xs text-gray-600">Calories</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">{foodItem.nutrition?.protein || 'N/A'}</div>
              <div className="text-xs text-gray-600">Protein</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">{foodItem.nutrition?.carbs || 'N/A'}</div>
              <div className="text-xs text-gray-600">Carbs</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-yellow-600">{foodItem.nutrition?.fat || 'N/A'}</div>
              <div className="text-xs text-gray-600">Fat</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Add to Cart */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center"
            >
              -
            </button>
            <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center"
            >
              +
            </button>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-gray-600">Total</div>
            <div className="text-xl font-bold text-red-600">
              ₹{(sizes.find(s => s.name === selectedSize)?.price || foodItem.price) * quantity}
            </div>
          </div>
        </div>
        
        <button
          onClick={handleAddToCart}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 rounded-xl transition-colors"
        >
          Add to Cart
        </button>
      </div>

      {/* Bottom padding for fixed button */}
      <div className="h-32"></div>
    </div>
  );
}