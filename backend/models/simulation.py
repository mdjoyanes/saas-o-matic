from datetime import datetime
from zoneinfo import ZoneInfo

from database import db


class Simulation(db.Model):
    __tablename__ = "simulations"


    id = db.Column(
        db.Integer,
        primary_key=True
    )


    customer_id = db.Column(
        db.Integer,
        db.ForeignKey("customers.id"),
        nullable=False
    )


    active_users = db.Column(
        db.Integer,
        nullable=False
    )


    storage_gb = db.Column(
        db.Integer,
        nullable=False
    )


    api_calls = db.Column(
        db.Integer,
        nullable=False
    )


    base_price = db.Column(
        db.Float,
        nullable=False
    )


    tax_rate = db.Column(
        db.Float,
        nullable=False
    )


    tax_amount = db.Column(
        db.Float,
        nullable=False
    )


    total_price = db.Column(
        db.Float,
        nullable=False
    )


    created_at = db.Column(
        db.DateTime,
        default=lambda: datetime.now(
            ZoneInfo("Europe/Madrid")
        )
    )


    updated_at = db.Column(
        db.DateTime,
        default=lambda: datetime.now(
            ZoneInfo("Europe/Madrid")
        ),
        onupdate=lambda: datetime.now(
            ZoneInfo("Europe/Madrid")
        )
    )


    def to_dict(self):

        return {

            "id": self.id,

            "customer_id": self.customer_id,

            "active_users": self.active_users,

            "storage_gb": self.storage_gb,

            "api_calls": self.api_calls,

            "base_price": self.base_price,

            "tax_rate": self.tax_rate,

            "tax_amount": self.tax_amount,

            "total_price": self.total_price,

            "created_at": self.created_at.strftime(
                "%d/%m/%Y %H:%M:%S"
            ) if self.created_at else None,


            "updated_at": self.updated_at.strftime(
                "%d/%m/%Y %H:%M:%S"
            ) if self.updated_at else None

        }