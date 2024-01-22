# Pizza Mania API

This project is a Flask API for managing pizza restaurants, pizzas, and their relationships. It includes models for Restaurant, Pizza, RestaurantPizza, as well as validations and routes for performing CRUD operations.

## Setup

To set up the project, follow these steps:

1. Install Dependancies

```sh
pipenv install

```
2. Create and seed the database:

```sh
flask db upgrade
python3 server/seed.py

```
3. Run the Flask API:

```sh
flask db upgrade
python3 server/python3.py

```

4. You can run your React app on [`localhost:4000`](http://localhost:4000) by running:

```sh
npm start --prefix client
```

## Models

You need to create the following relationships:

- A `Restaurant` has many `Pizzas` through `RestaurantPizza`.
- A `Pizza` has many `Restaurants` through `RestaurantPizza`.
- A `RestaurantPizza` belongs to a `Restaurant` and belongs to a `Pizza`.

## Validations

The project includes the following validations:

`RestaurantPizza` model:

- `price` must be between 1 and 30.


## Routes

The following routes are available:

### GET /restaurants

Return JSON data in the format below:

```json
[
  { "id": 1, "name": "Pizza Palace", "address": "123 Main St" },
  { "id": 2, "name": "Slice Haven", "address": "456 Oak St" }
]
```

### GET /restaurants/:id

Returns details about a restaurant, including its pizzas, in the following format:

```json
{
  "id": 1,
  "name": "Pizza Palace",
  "address": "123 Main St",
  "pizzas": [
    {
      "id": 1,
      "name": "Margherita",
      "ingredients": "Tomato Sauce, Mozzarella, Basil"
    },
    {
      "id": 2,
      "name": "Pepperoni",
      "ingredients": "Tomato Sauce, Mozzarella, Pepperoni"
    }
  ]
}

```

If the restaurant does not exist, returns an error:

```json
{ 
    "error": "Restaurant not found" 
}

```
### DELETE /restaurants/:id

Deletes a restaurant and its associated RestaurantPizzas. Returns an empty response if successful or an error if the restaurant does not exist.

### GET /pizzas

Return JSON data in the format below:

```json
[
  { "id": 1, "name": "Margherita", "ingredients": "Tomato Sauce, Mozzarella, Basil" },
  { "id": 2, "name": "Pepperoni", "ingredients": "Tomato Sauce, Mozzarella, Pepperoni" }
]
```

### POST /restaurant_pizzas

Creates a new RestaurantPizza associated with an existing Pizza and Restaurant. Returns the pizza details if successful, or an error if the creation fails validation. The request body should include:

```json
{
  "price": 15,
  "pizza_id": 1,
  "restaurant_id": 3
}
```