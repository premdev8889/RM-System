'use client';

import React from 'react';
import { Plus, Star } from 'lucide-react';
import { Button } from './Button';

interface MenuCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  isVeg: boolean;
  onAddToCart: (item: any) => void;
}

export const MenuCard: React.FC<MenuCardProps> = ({
  id,
  name,
  description,
  price,
  image,
  rating,
  category,
  isVeg,
  onAddToCart
}) => {
  const handleAddToCart = () => {
    onAddToCart({
      id,
      name,
      price,
      image,
      category,
      isVeg
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="relative">
        <img 
          src={image} 
          alt={name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3">
          <div className={`w-4 h-4 rounded-full border-2 ${
            isVeg ? 'border-green-600 bg-green-100' : 'border-red-600 bg-red-100'
          }`}>
            <div className={`w-2 h-2 rounded-full m-0.5 ${
              isVeg ? 'bg-green-600' : 'bg-red-600'
            }`}></div>
          </div>
        </div>
        <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span className="text-sm font-medium">{rating}</span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <span className="text-lg font-bold text-red-600">₹{price}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {category}
          </span>
          <Button
            onClick={handleAddToCart}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm"
          >
            <Plus className="w-4 h-4" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};