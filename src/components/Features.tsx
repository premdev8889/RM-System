import React from 'react';
import { Search, Truck, Star } from 'lucide-react';

interface Feature {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Features: React.FC = () => {
  const features: Feature[] = [
    {
      id: "easy-order",
      icon: <Search className="h-8 w-8 text-red-600" />,
      title: "Easy to Order",
      description: "Browse menus and order with just a few clicks"
    },
    {
      id: "fast-delivery",
      icon: <Truck className="h-8 w-8 text-red-600" />,
      title: "Fast Delivery",
      description: "Get your food delivered hot and fresh to your door"
    },
    {
      id: "quality-food",
      icon: <Star className="h-8 w-8 text-red-600" />,
      title: "Quality Food",
      description: "Only the best restaurants and highest quality food"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.id} className="text-center">
              <div className="bg-red-100 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;