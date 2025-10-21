import React from 'react';
import { Search, MapPin } from 'lucide-react';
import Button from './Button';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-red-50 to-orange-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Discover the best food & drinks
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Order from your favorite restaurants and get it delivered to your doorstep
          </p>
          
          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl shadow-lg">
              <div className="flex-1 flex items-center border border-gray-200 rounded-lg px-4 py-3">
                <MapPin className="h-5 w-5 text-red-600 mr-3" />
                <input
                  type="text"
                  placeholder="Enter your location"
                  className="flex-1 outline-none text-gray-700"
                />
              </div>
              <div className="flex-1 flex items-center border border-gray-200 rounded-lg px-4 py-3">
                <Search className="h-5 w-5 text-red-600 mr-3" />
                <input
                  type="text"
                  placeholder="Search for restaurants or food"
                  className="flex-1 outline-none text-gray-700"
                />
              </div>
              <Button variant="primary" size="lg">
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;