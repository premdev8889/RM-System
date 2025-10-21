import React from 'react';
import { Star, Clock } from 'lucide-react';

interface RestaurantCardProps {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  time: string;
  image: string;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  name,
  cuisine,
  rating,
  time,
  image,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer">
      <div className="h-48 bg-gradient-to-r from-red-100 to-orange-100 rounded-t-xl flex items-center justify-center">
        <span className="text-6xl">{image}</span>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
        <p className="text-gray-600 mb-3">{cuisine}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm font-medium text-gray-700">{rating}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-1" />
            <span className="text-sm">{time}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;