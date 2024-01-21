import React, { useState, useEffect } from 'react';

const PizzaList = ({ restaurantId }) => {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    if (restaurantId) {
      fetch(`/restaurants/${restaurantId}`)
        .then(response => response.json())
        .then(data => setPizzas(data.pizzas))
        .catch(error => console.error(`Error fetching pizzas for restaurant ${restaurantId}:`, error));
    }
  }, [restaurantId]);

  return (
    <div>
      <ul>
        {pizzas.map(pizza => (
          <li key={pizza.id}>
            
            <strong>{pizza.name}</strong> - {pizza.ingredients}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PizzaList;
