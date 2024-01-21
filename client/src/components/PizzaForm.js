import React, { useState, useEffect } from 'react';

const PizzaForm = ({ restaurantId, onPizzaAdded }) => {
  const [price, setPrice] = useState('');
  const [pizzaId, setPizzaId] = useState('');
  const [availablePizzas, setAvailablePizzas] = useState([]);

  useEffect(() => {
    // Fetch available pizzas when the component mounts
    fetch('/pizzas')
      .then(response => response.json())
      .then(data => setAvailablePizzas(data))
      .catch(error => console.error('Error fetching available pizzas:', error));
  }, []);

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handlePizzaChange = (event) => {
    setPizzaId(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Validate form data
    if (!price || !pizzaId) {
      alert('Please fill in all fields');
      return;
    }

    // Post new restaurant pizza
    fetch('/restaurant_pizzas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        price: Number(price),
        restaurant_id: restaurantId,
        pizza_id: Number(pizzaId),
      }),
    })
      .then(response => response.json())
      .then(data => {
        // Clear form fields
        setPrice('');
        setPizzaId('');

        // Trigger a callback to update the list of pizzas
        onPizzaAdded(data);
        
      })
      .catch(error => console.error('Error adding restaurant pizza:', error));
  };

  return (
    <div>
      <h2>Add Pizza to Restaurant</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Price:
          <input type="number" value={price} onChange={handlePriceChange} />
        </label>
        <br />
        <label>
          Pizza:
          <select value={pizzaId} onChange={handlePizzaChange}>
            <option value="">Select Pizza</option>
            {availablePizzas.map(pizza => (
              <option key={pizza.id} value={pizza.id}>{pizza.name}</option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit">Add Pizza</button>
      </form>
    </div>
  );
};

export default PizzaForm;
