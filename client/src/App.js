// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import PizzaForm from './components/PizzaForm';
import PizzaList from './components/PizzaList';
import RestaurantList from './components/RestaurantList';
import RestaurantDetail from './components/RestaurantDetail';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pizzas" element={<PizzaList />} />
        <Route path="/restaurants" element={<RestaurantList />} />
        <Route path="/add-pizza" element={<PizzaForm />} />
        <Route path="/restaurants/:id" element={<RestaurantDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
