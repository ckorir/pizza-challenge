import React, { useState, useEffect } from 'react';
import RestaurantList from './components/RestaurantList';
import PizzaList from './components/PizzaList';
import PizzaForm from './components/PizzaForm';

const App = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  useEffect(() => {
    fetch('/restaurants')
      .then(response => response.json())
      .then(data => setRestaurants(data))
      .catch(error => console.error('Error fetching restaurants:', error));
  }, []);

  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  return (
    <div>
      <h1>Pizza Mania</h1>

      <div>
        <h2>Restaurants</h2>
        <ul>
          {restaurants.map(restaurant => (
            <li key={restaurant.id} onClick={() => handleRestaurantClick(restaurant)}>
              <strong>{restaurant.name}</strong> - {restaurant.address}
            </li>
          ))}
        </ul>
      </div>

      {selectedRestaurant && (
        <div>
          <h2>{selectedRestaurant.name} Pizzas</h2>
          <PizzaList restaurantId={selectedRestaurant.id} />
          <PizzaForm
            restaurantId={selectedRestaurant}
            onPizzaAdded={() => {
              // Reload the pizza list for the selected restaurant after adding a new pizza
              setSelectedRestaurant(selectedRestaurant);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default App;
