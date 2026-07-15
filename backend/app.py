from flask import Flask
from flask_cors import CORS

from config import Config
from database import db

from models.customer import Customer
from models.simulation import Simulation

from routes.customers import customers_bp
from routes.simulations import simulations_bp


app = Flask(__name__)

app.config.from_object(Config)

CORS(app)

db.init_app(app)


app.register_blueprint(customers_bp)
app.register_blueprint(simulations_bp)



@app.route("/")
def home():

    return {
        "message": "SaaS-O-Matic API running"
    }



def seed_database():

    print("Customers in database:", Customer.query.count())


    if Customer.query.count() == 0:

        customers = [

            Customer(
                company_name="NovaTech Solutions",
                tax_identifier="12345678Z",
                email="contact@novatech.es",
                country="Spain",
                plan="Enterprise"
            ),

            Customer(
                company_name="CloudPeak Systems",
                tax_identifier="87654321X",
                email="contact@example.com",
                country="Germany",
                plan="Enterprise"
            ),

            Customer(
                company_name="BrightCore Technologies",
                tax_identifier="US45896321",
                email="support@example.com",
                country="United States",
                plan="Starter"
            )

        ]

        db.session.add_all(customers)

        db.session.commit()

        print("Database seeded successfully.")



if __name__ == "__main__":

    with app.app_context():

        db.create_all()

        seed_database()


    app.run(
        host="0.0.0.0",
        port=5000,
        debug=False
    )