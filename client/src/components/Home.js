// Home.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import image from '../img/pizza2.png'

const RestaurantListItem = ({ restaurant }) => (
  <li key={restaurant.id}>
    <Link to={`/restaurants/${restaurant.id}`}>
      <strong>{restaurant.name}</strong> - {restaurant.address}
    </Link>
  </li>
);

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch('/restaurants')
      .then(response => response.json())
      .then(data => setRestaurants(data));
  }, []);

  return (
    <div>
      <img src={image} className="App-image" alt="logo" />
      <h2 class="title">All Restaurants</h2>
      <ul class="alllist">
        {restaurants.map(restaurant => (
          <RestaurantListItem key={restaurant.id} restaurant={restaurant} />
        ))}
      </ul>
    </div>
  );
};

export default Home;
