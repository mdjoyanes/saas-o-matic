from datetime import datetime

from database import db


class Customer(db.Model):
    __tablename__ = "customers"

    id = db.Column(db.Integer, primary_key=True)

    company_name = db.Column(db.String(150), nullable=False)

    tax_identifier = db.Column(db.String(20), unique=True, nullable=False)

    email = db.Column(db.String(120), nullable=False)

    country = db.Column(db.String(100), nullable=False)

    plan = db.Column(db.String(50), nullable=False)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    simulations = db.relationship(
        "Simulation",
        backref="customer",
        lazy=True,
        cascade="all, delete-orphan"
    )