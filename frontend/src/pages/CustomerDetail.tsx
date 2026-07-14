import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
    Container,
    Card,
    Button,
    Spinner
} from "react-bootstrap";

import type { Customer } from "../types/customer";
import type { Simulation } from "../types/simulation";

import SimulationForm from "../components/SimulationForm";
import SimulationHistory from "../components/SimulationHistory";

import {
    getCustomer,
    getCustomerSimulations
} from "../services/api";

export default function CustomerDetail() {

    const { id } = useParams();

    const [customer, setCustomer] = useState<Customer | null>(null);

    const [simulations, setSimulations] = useState<Simulation[]>([]);


    useEffect(() => {

        if (id) {

            loadCustomer(Number(id));

            loadSimulations(Number(id));

        }

    }, [id]);


    const loadCustomer = async (customerId: number) => {

        const data = await getCustomer(customerId);

        setCustomer(data);

    };


    const loadSimulations = async (customerId: number) => {

        const data = await getCustomerSimulations(customerId);

        setSimulations(data);

    };


    if (!customer) {

        return (
            <Container className="py-5 text-center">

                <Spinner animation="border" />

            </Container>
        );

    }


    return (

        <Container className="py-5">


            <Link to="/">

                <Button
                    variant="secondary"
                    className="mb-4"
                >
                    ← Back
                </Button>

            </Link>


            <Card className="shadow border-0">

                <Card.Body>


                    <h2 className="fw-bold">

                        {customer.company_name}

                    </h2>


                    <hr />


                    <p>
                        <strong>Tax Identifier:</strong>{" "}
                        {customer.tax_identifier}
                    </p>


                    <p>
                        <strong>Email:</strong>{" "}
                        {customer.email}
                    </p>


                    <p>
                        <strong>Country:</strong>{" "}
                        {customer.country}
                    </p>


                    <p>
                        <strong>Plan:</strong>{" "}
                        {customer.plan}
                    </p>


                </Card.Body>

            </Card>



            <div className="mt-5">


                <h3 className="mb-4">

                    Simulation History

                </h3>


                <p>

                    Total simulations: {simulations.length}

                </p>



                <SimulationHistory

                    simulations={simulations}

                    onSimulationDeleted={() =>
                        loadSimulations(customer.id)
                    }

                />


            </div>




            <SimulationForm

                customerId={customer.id}

                onSimulationCreated={() =>
                    loadSimulations(customer.id)
                }

            />


        </Container>

    );

}