from flask import Flask
from flask_cors import CORS
from routes.customers import customers_bp

from config import Config
from database import db

# Importar los modelos
from models.customer import Customer
from models.simulation import Simulation

app = Flask(__name__)
app.config.from_object(Config)

CORS(app)

db.init_app(app)

app.register_blueprint(customers_bp)

@app.route("/")
def home():
    return {
        "message": "SaaS-O-Matic API running"
    }


if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)