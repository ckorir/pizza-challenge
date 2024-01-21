import React, { useState, useEffect } from 'react';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch('/restaurants')
      .then(response => response.json())
      .then(data => setRestaurants(data))
      .catch(error => console.error('Error fetching restaurants:', error));
  }, []);

  return (
    <div>
      <h2>Restaurants</h2>
      <ul>
        {restaurants.map(restaurant => (
          <li key={restaurant.id}>
            <strong>{restaurant.name}</strong> - {restaurant.address}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantList;