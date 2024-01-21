import React from 'react';
import RestaurantList from './components/RestaurantList';
import PizzaList from './components/PizzaList';

const App = () => {
  return (
    <div>
      <h1>Pizza Mania</h1>

      <RestaurantList />
      <PizzaList />
    </div>
  );
};

export default App;
