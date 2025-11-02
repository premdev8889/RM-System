'use client';

import { useState } from 'react';
import BottomNavigation from '../../components/BottomNavigation';
import SearchBar from '../../components/SearchBar';
import { CartProvider } from '../../components/CartContext';
import { OrderProvider } from '../../components/OrderContext';
import { useRouter } from 'next/navigation';

// Mock restaurant data
const mockRestaurants = [
  {
    id: 1,
    name: "Pizza Palace",
    cuisine: "Italian",
    rating: 4.5,
    deliveryTime: "25-35 min",
    image: "/api/placeholder/300/200",
    distance: "1.2 km"
  },
  {
    id: 2,
    name: "Burger House",
    cuisine: "American",
    rating: 4.2,
    deliveryTime: "20-30 min",
    image: "/api/placeholder/300/200",
    distance: "0.8 km"
  },
  {
    id: 3,
    name: "Sushi Express",
    cuisine: "Japanese",
    rating: 4.7,
    deliveryTime: "30-40 min",
    image: "/api/placeholder/300/200",
    distance: "2.1 km"
  },
  {
    id: 4,
    name: "Spice Garden",
    cuisine: "Indian",
    rating: 4.3,
    deliveryTime: "35-45 min",
    image: "/api/placeholder/300/200",
    distance: "1.5 km"
  },
  {
    id: 5,
    name: "Taco Fiesta",
    cuisine: "Mexican",
    rating: 4.1,
    deliveryTime: "20-25 min",
    image: "/api/placeholder/300/200",
    distance: "0.9 km"
  },
  {
    id: 6,
    name: "Dragon Wok",
    cuisine: "Chinese",
    rating: 4.4,
    deliveryTime: "25-35 min",
    image: "/api/placeholder/300/200",
    distance: "1.8 km"
  }
];

const cuisineFilters = ["All", "Italian", "American", "Japanese", "Indian", "Mexican", "Chinese"];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const router = useRouter();

  const handleTabClick = (tab: string) => {
    switch (tab) {
      case 'home':
        router.push('/dashboard');
        break;
      case 'search':
        // Already on search page
        break;
      case 'cart':
        router.push('/cart');
        break;
      case 'orders':
        router.push('/orders');
        break;
      case 'profile':
        router.push('/profile');
        break;
    }
  };

  const filteredRestaurants = mockRestaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCuisine = selectedCuisine === 'All' || restaurant.cuisine === selectedCuisine;
    return matchesSearch && matchesCuisine;
  });

  const handleRestaurantClick = (restaurantId: number) => {
    router.push('/menu');
  };

  return (
    <OrderProvider>
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          <div className="pt-4 pb-20 px-4">
            {/* Search Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">Search Restaurants</h1>
              <SearchBar
                placeholder="Search for restaurants or cuisines..."
                value={searchQuery}
                onChange={setSearchQuery}
                className="mb-4"
              />
            </div>

            {/* Cuisine Filters */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-3">Filter by Cuisine</h2>
              <div className="flex flex-wrap gap-2">
                {cuisineFilters.map((cuisine) => (
                  <button
                    key={cuisine}
                    onClick={() => setSelectedCuisine(cuisine)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCuisine === cuisine
                        ? 'bg-red-600 text-white'
                        : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {cuisine}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Results */}
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-700 mb-3">
                {filteredRestaurants.length} Restaurants Found
              </h2>
            </div>

            {/* Restaurant List */}
            <div className="space-y-4">
              {filteredRestaurants.length > 0 ? (
                filteredRestaurants.map((restaurant) => (
                  <div
                    key={restaurant.id}
                    onClick={() => handleRestaurantClick(restaurant.id)}
                    className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800">{restaurant.name}</h3>
                        <p className="text-sm text-gray-600">{restaurant.cuisine}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex items-center">
                            <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-sm text-gray-600">{restaurant.rating}</span>
                          </div>
                          <span className="text-sm text-gray-600">• {restaurant.deliveryTime}</span>
                          <span className="text-sm text-gray-600">• {restaurant.distance}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-500 mb-2">No restaurants found</h3>
                  <p className="text-gray-400">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          </div>

          <BottomNavigation activeTab="search" onTabClick={handleTabClick} />
        </div>
      </CartProvider>
    </OrderProvider>
  );
}