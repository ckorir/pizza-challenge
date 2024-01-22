import React, { useEffect, useState } from 'react';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch('/restaurants')
      .then(response => response.json())
      .then(data => setRestaurants(data));
  }, []);

  return (
    <div>
      <h2>Restaurant List</h2>
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
