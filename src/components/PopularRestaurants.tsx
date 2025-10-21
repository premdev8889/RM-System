import React from 'react';
import RestaurantCard from './RestaurantCard';

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  time: string;
  image: string;
}

const PopularRestaurants: React.FC = () => {
  const restaurants: Restaurant[] = [
    {
      id: "spice-garden",
      name: "Spice Garden",
      cuisine: "Indian • North Indian",
      rating: 4.3,
      time: "30-35 mins",
      image: "🏪"
    },
    {
      id: "pizza-palace",
      name: "Pizza Palace",
      cuisine: "Italian • Pizza",
      rating: 4.5,
      time: "25-30 mins",
      image: "🏪"
    },
    {
      id: "burger-junction",
      name: "Burger Junction",
      cuisine: "American • Fast Food",
      rating: 4.2,
      time: "20-25 mins",
      image: "🏪"
    },
    {
      id: "sushi-express",
      name: "Sushi Express",
      cuisine: "Japanese • Sushi",
      rating: 4.6,
      time: "35-40 mins",
      image: "🏪"
    },
    {
      id: "taco-fiesta",
      name: "Taco Fiesta",
      cuisine: "Mexican • Tacos",
      rating: 4.4,
      time: "25-30 mins",
      image: "🏪"
    },
    {
      id: "dessert-dreams",
      name: "Dessert Dreams",
      cuisine: "Desserts • Ice Cream",
      rating: 4.7,
      time: "15-20 mins",
      image: "🏪"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Popular Restaurants
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              id={restaurant.id}
              name={restaurant.name}
              cuisine={restaurant.cuisine}
              rating={restaurant.rating}
              time={restaurant.time}
              image={restaurant.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularRestaurants;