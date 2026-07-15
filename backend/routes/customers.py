from flask import Blueprint, jsonify, request
from email_validator import validate_email, EmailNotValidError

from database import db
from models.customer import Customer
from validators.nif_validator import validate_nif


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

        validate_email(
            data["email"],
            check_deliverability=False
        )


    except EmailNotValidError:

        return jsonify({
            "error": "Invalid email address."
        }), 400




    tax_identifier = data["tax_identifier"].strip()



    if len(tax_identifier) < 5:

        return jsonify({
            "error": "Invalid tax identifier."
        }), 400




    if data["country"].lower() == "spain":

        if not validate_nif(tax_identifier):

            return jsonify({
                "error": "Invalid Spanish tax identifier."
            }), 400





    existing_customer = Customer.query.filter_by(
        tax_identifier=tax_identifier.upper()
    ).first()



    if existing_customer:

        return jsonify({
            "error": "A customer with this tax identifier already exists."
        }), 409





    customer = Customer(

        company_name=data["company_name"].strip(),

        tax_identifier=tax_identifier.upper(),

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

    return jsonify([

        customer.to_dict()

        for customer in customers

    ]), 200






@customers_bp.route("/customers/search", methods=["GET"])
def search_customers():

    query = request.args.get("q", "").strip()



    if not query:

        return jsonify([]), 200





    customers = Customer.query.filter(

        (Customer.company_name.ilike(f"%{query}%"))

        |

        (Customer.tax_identifier.ilike(f"%{query}%"))

    ).all()



    return jsonify([

        customer.to_dict()

        for customer in customers

    ]), 200






@customers_bp.route("/customers/<int:customer_id>", methods=["GET"])
def get_customer(customer_id):

    customer = Customer.query.get_or_404(customer_id)

    return jsonify(customer.to_dict()), 200






@customers_bp.route("/customers/<int:customer_id>", methods=["DELETE"])
def delete_customer(customer_id):

    customer = Customer.query.get_or_404(customer_id)


    db.session.delete(customer)

    db.session.commit()


    return jsonify({

        "message": "Customer deleted successfully."

    }), 200






@customers_bp.route("/customers/<int:customer_id>", methods=["PUT"])
def update_customer(customer_id):

    customer = Customer.query.get_or_404(customer_id)

    data = request.get_json()



    customer.company_name = data["company_name"].strip()

    customer.tax_identifier = data["tax_identifier"].strip().upper()

    customer.email = data["email"].strip()

    customer.country = data["country"].strip()

    customer.plan = data["plan"].strip()



    db.session.commit()



    return jsonify({

        "message": "Customer updated successfully.",

        "customer": customer.to_dict()

    }), 200