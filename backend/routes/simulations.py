from flask import Blueprint, jsonify, request

from datetime import datetime
from zoneinfo import ZoneInfo

from database import db
from models.customer import Customer
from models.simulation import Simulation
from services.billing import calculate_base_price
from services.taxes import calculate_tax


simulations_bp = Blueprint("simulations", __name__)


@simulations_bp.route("/simulations", methods=["POST"])
def create_simulation():

    data = request.get_json()

    if not data:
        return jsonify({
            "error": "Request body is required."
        }), 400


    required_fields = [
        "customer_id",
        "active_users",
        "storage_gb",
        "api_calls"
    ]


    for field in required_fields:

        if field not in data:

            return jsonify({
                "error": f"Missing field: {field}"
            }), 400



    customer = Customer.query.get(
        data["customer_id"]
    )


    if not customer:

        return jsonify({
            "error": "Customer not found."
        }), 404



    base_price = calculate_base_price(
        data["active_users"]
    )


    taxes = calculate_tax(
        customer.country,
        base_price
    )



    simulation = Simulation(

        customer_id=customer.id,

        active_users=data["active_users"],

        storage_gb=data["storage_gb"],

        api_calls=data["api_calls"],

        base_price=base_price,

        tax_rate=taxes["tax_rate"],

        tax_amount=taxes["tax_amount"],

        total_price=taxes["total_price"]

    )



    db.session.add(simulation)

    db.session.commit()



    return jsonify(
        simulation.to_dict()
    ), 201





@simulations_bp.route(
    "/customers/<int:customer_id>/simulations",
    methods=["GET"]
)
def get_customer_simulations(customer_id):


    customer = Customer.query.get(
        customer_id
    )


    if not customer:

        return jsonify({
            "error": "Customer not found."
        }), 404



    simulations = Simulation.query.filter_by(

        customer_id=customer_id

    ).order_by(

        Simulation.created_at.desc()

    ).all()



    return jsonify([

        simulation.to_dict()

        for simulation in simulations

    ]), 200





@simulations_bp.route(
    "/simulations/<int:simulation_id>",
    methods=["PUT"]
)
def update_simulation(simulation_id):


    simulation = Simulation.query.get(
        simulation_id
    )


    if not simulation:

        return jsonify({
            "error": "Simulation not found."
        }), 404



    simulation.updated_at = datetime.now(
        ZoneInfo("Europe/Madrid")
    )



    db.session.commit()



    return jsonify({

        "message": "Simulation updated successfully.",

        "simulation": simulation.to_dict()

    }), 200





@simulations_bp.route(
    "/simulations/<int:simulation_id>",
    methods=["DELETE"]
)
def delete_simulation(simulation_id):


    simulation = Simulation.query.get(
        simulation_id
    )


    if not simulation:

        return jsonify({
            "error": "Simulation not found."
        }), 404



    db.session.delete(
        simulation
    )


    db.session.commit()



    return jsonify({

        "message": "Simulation deleted successfully."

    }), 200