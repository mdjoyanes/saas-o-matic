from flask import Blueprint, jsonify, request
from models.customer import Customer
from database import db

customers_bp = Blueprint("customers", __name__)


@customers_bp.route("/customers", methods=["POST"])
def create_customer():

    data = request.get_json()

    customer = Customer(
        company_name=data["company_name"],
        tax_identifier=data["tax_identifier"],
        email=data["email"],
        country=data["country"],
        plan=data["plan"]
    )

    db.session.add(customer)
    db.session.commit()

    return jsonify({
        "message": "Customer created successfully"
    }), 201


@customers_bp.route("/customers", methods=["GET"])
def get_customers():

    customers = Customer.query.all()

    result = []

    for customer in customers:
        result.append({
            "id": customer.id,
            "company_name": customer.company_name,
            "tax_identifier": customer.tax_identifier,
            "email": customer.email,
            "country": customer.country,
            "plan": customer.plan
        })

    return jsonify(result), 200