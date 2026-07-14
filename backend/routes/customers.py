from flask import Blueprint, jsonify, request
from email_validator import validate_email, EmailNotValidError

from database import db
from models.customer import Customer
from validators.nif_validator import validate_dni

customers_bp = Blueprint("customers", __name__)


@customers_bp.route("/customers", methods=["POST"])
def create_customer():
    data = request.get_json()

    if not data:
        return jsonify({
            "error": "Request body is required."
        }), 400

    required_fields = [
        "company_name",
        "tax_identifier",
        "email",
        "country",
        "plan"
    ]

    for field in required_fields:
        if field not in data or not str(data[field]).strip():
            return jsonify({
                "error": f"Missing required field: {field}"
            }), 400

    try:
        validate_email(data["email"])
    except EmailNotValidError:
        return jsonify({
            "error": "Invalid email address."
        }), 400

    if data["country"].strip().lower() in ["spain", "españa", "espana"]:
        if not validate_dni(data["tax_identifier"]):
            return jsonify({
                "error": "Invalid DNI."
            }), 400

    existing_customer = Customer.query.filter_by(
        tax_identifier=data["tax_identifier"]
    ).first()

    if existing_customer:
        return jsonify({
            "error": "A customer with this tax identifier already exists."
        }), 409

    customer = Customer(
        company_name=data["company_name"].strip(),
        tax_identifier=data["tax_identifier"].strip().upper(),
        email=data["email"].strip(),
        country=data["country"].strip(),
        plan=data["plan"].strip()
    )

    db.session.add(customer)
    db.session.commit()

    return jsonify({
        "message": "Customer created successfully.",
        "customer": customer.to_dict()
    }), 201


@customers_bp.route("/customers", methods=["GET"])
def get_customers():
    customers = Customer.query.all()
    return jsonify([customer.to_dict() for customer in customers]), 200


@customers_bp.route("/customers/<int:customer_id>", methods=["GET"])
def get_customer(customer_id):
    customer = Customer.query.get_or_404(customer_id)
    return jsonify(customer.to_dict()), 200