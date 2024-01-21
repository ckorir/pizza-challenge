import React, { useState, useEffect } from 'react';

const PizzaList = () => {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    fetch('/pizzas')
      .then(response => response.json())
      .then(data => setPizzas(data))
      .catch(error => console.error('Error fetching pizzas:', error));
  }, []);

  return (
    <div>
      <h2>Pizzas</h2>
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
