// RestaurantDetail.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RestaurantDetail = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [pizzas, setPizzas] = useState([]);
  const [formData, setFormData] = useState({
    price: '',
    pizza_id: '',
  });

  useEffect(() => {
    fetch(`/restaurants/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Restaurant not found');
        }
        return response.json();
      })
      .then(data => setRestaurant(data))
      .catch(error => console.error('Error fetching restaurant:', error));

    fetch('/pizzas')
      .then(response => response.json())
      .then(data => setPizzas(data))
      .catch(error => console.error('Error fetching pizzas:', error));
  }, [id]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    fetch('/restaurant_pizzas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        price: formData.price,
        pizza_id: formData.pizza_id,
        restaurant_id: id,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Pizza added successfully:', data);
        // You might want to update the local state here to reflect the new pizza
      })
      .catch(error => console.error('Error adding pizza:', error));
  };

  return (
    <div>
      {restaurant ? (
        <div>
          <h2>{restaurant.name}</h2>
          <h3>Pizzas in {restaurant.name}</h3>
          <ul>
            {restaurant.pizzas.map(pizza => (
              <li key={pizza.id}>{pizza.name} - {pizza.ingredients}</li>
            ))}
          </ul>
          <h3>Add Pizza to {restaurant.name}</h3>
          <form onSubmit={handleFormSubmit}>
            <label>
              Price:
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </label>
            <br />
            <label>
              Select Pizza:
              <select
                name="pizza_id"
                value={formData.pizza_id}
                onChange={(e) => setFormData({ ...formData, pizza_id: e.target.value })}
              >
                <option value="">Select Pizza</option>
                {pizzas.map(pizza => (
                  <option key={pizza.id} value={pizza.id}>{pizza.name}</option>
                ))}
              </select>
            </label>
            <br />
            <button type="submit">Add Pizza</button>
          </form>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RestaurantDetail;
