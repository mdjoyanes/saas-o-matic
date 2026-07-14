from datetime import datetime

from database import db


class Simulation(db.Model):
    __tablename__ = "simulations"

    id = db.Column(db.Integer, primary_key=True)

    customer_id = db.Column(
        db.Integer,
        db.ForeignKey("customers.id"),
        nullable=False
    )

    active_users = db.Column(db.Integer, nullable=False)

    storage_gb = db.Column(db.Integer, nullable=False)

    api_calls = db.Column(db.Integer, nullable=False)

    base_price = db.Column(db.Float, nullable=False)

    tax_rate = db.Column(db.Float, nullable=False)

    tax_amount = db.Column(db.Float, nullable=False)

    total_price = db.Column(db.Float, nullable=False)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)