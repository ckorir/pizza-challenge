from app import app, db
from faker import Faker
from flask_sqlalchemy import SQLAlchemy
from models import db, Restaurant, Pizza, RestaurantPizza

fake = Faker()

def clear_data():
    with app.app_context():
        db.session.query(RestaurantPizza).delete()
        db.session.query(Restaurant).delete()
        db.session.query(Pizza).delete()
        db.session.commit()

def seed():
    clear_data()

    with app.app_context():
        # Seed Restaurants
        restaurants = [
            Restaurant(name=fake.company(), address=fake.address()) for _ in range(5)
        ]
        db.session.add_all(restaurants)
        db.session.commit()

        # Seed Pizzas
        pizzas = [
            Pizza(name=fake.word(), ingredients=", ".join(fake.words())) for _ in range(5)
        ]
        db.session.add_all(pizzas)
        db.session.commit()

        # Seed RestaurantPizzas
        restaurant_pizzas = [
            RestaurantPizza(
                price=fake.random_int(min=1, max=30),
                restaurant_id=fake.random_element(elements=[r.id for r in restaurants]),
                pizza_id=fake.random_element(elements=[p.id for p in pizzas]),
            ) for _ in range(5)
        ]
        db.session.add_all(restaurant_pizzas)
        db.session.commit()

if __name__ == "__main__":
    seed()
