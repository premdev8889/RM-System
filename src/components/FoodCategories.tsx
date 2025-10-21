import React from 'react';

interface FoodCategory {
  id: string;
  name: string;
  emoji: string;
}

const FoodCategories: React.FC = () => {
  const categories: FoodCategory[] = [
    { id: "pizza", name: "Pizza", emoji: "🍕" },
    { id: "burger", name: "Burger", emoji: "🍔" },
    { id: "biryani", name: "Biryani", emoji: "🍛" },
    { id: "chinese", name: "Chinese", emoji: "🥡" },
    { id: "desserts", name: "Desserts", emoji: "🍰" },
    { id: "drinks", name: "Drinks", emoji: "🥤" }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          What's on your mind?
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {categories.map((category) => (
            <div key={category.id} className="text-center group cursor-pointer">
              <div className="bg-gray-50 rounded-full w-20 h-20 mx-auto flex items-center justify-center group-hover:bg-red-50 transition-colors">
                <span className="text-3xl">{category.emoji}</span>
              </div>
              <p className="mt-3 font-medium text-gray-700 group-hover:text-red-600 transition-colors">
                {category.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoodCategories;