import React, { useState } from 'react';


const PizzaForm = () => {
  const [formData, setFormData] = useState({
    price: '',
    pizza_id: '',
    restaurant_id: '',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    fetch('/restaurant_pizzas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        // Handle success as needed
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle errors as needed
      });
  };

  return (
    <div>
      <h2>Add Pizza to Restaurant</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Pizza ID:
          <input
            type="number"
            name="pizza_id"
            value={formData.pizza_id}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Restaurant ID:
          <input
            type="number"
            name="restaurant_id"
            value={formData.restaurant_id}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit" className="btn btn-primary">Add Pizza</button>
      </form>
    </div>
  );
};

export default PizzaForm;
