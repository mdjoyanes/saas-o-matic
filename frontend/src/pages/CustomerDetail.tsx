import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
    Container,
    Card,
    Button,
    Spinner,
    Form,
    Alert
} from "react-bootstrap";

import type { Customer } from "../types/customer";
import type { Simulation } from "../types/simulation";

import SimulationForm from "../components/SimulationForm";
import SimulationHistory from "../components/SimulationHistory";


import {
    getCustomer,
    getCustomerSimulations,
    updateCustomer
} from "../services/api";

export default function CustomerDetail() {

    const { id } = useParams();

    const [customer, setCustomer] = useState<Customer | null>(null);

    const [simulations, setSimulations] = useState<Simulation[]>([]);


    const [editing, setEditing] = useState(false);

    const [successMessage, setSuccessMessage] = useState("");

    const [formData, setFormData] = useState({
        company_name: "",
        tax_identifier: "",
        email: "",
        country: "",
        plan: ""
    });


    useEffect(() => {

        if (id) {

            loadCustomer(Number(id));

            loadSimulations(Number(id));

        }

    }, [id]);

    useEffect(() => {

        if (customer) {

            setFormData({

                company_name: customer.company_name,

                tax_identifier: customer.tax_identifier,

                email: customer.email,

                country: customer.country,

                plan: customer.plan

            });

        }

    }, [customer]);


    const loadCustomer = async (customerId: number) => {

        const data = await getCustomer(customerId);

        setCustomer(data);

    };


    const loadSimulations = async (customerId: number) => {

        const data = await getCustomerSimulations(customerId);

        setSimulations(data);

    };

    const handleUpdate = async () => {

        if (!customer) return;


        const updated = await updateCustomer(
            customer.id,
            formData
        );


        setCustomer(updated.customer);

        setEditing(false);


        setSuccessMessage(
            "Customer updated successfully ✓"
        );


        setTimeout(() => {

            setSuccessMessage("");

        }, 3000);

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
                {successMessage && (

                    <Alert
                        variant="success"
                        className="mt-3"
                    >
                        {successMessage}
                    </Alert>

                )}

            </Link>


            <Card className="shadow border-0">

                <Card.Body>


                    <div className="d-flex justify-content-between align-items-center">

                        <h2 className="fw-bold">
                            {editing
                                ? "Edit Customer"
                                : customer.company_name
                            }
                        </h2>


                        {!editing && (

                            <Button
                                variant="warning"
                                onClick={() => setEditing(true)}
                            >
                                ✏ Edit
                            </Button>

                        )}

                    </div>


                    <hr />


                    {editing ? (

                        <>


                            <Form.Group className="mb-3">

                                <Form.Label>
                                    Company Name
                                </Form.Label>

                                <Form.Control
                                    value={formData.company_name}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            company_name: e.target.value
                                        })
                                    }
                                />

                            </Form.Group>



                            <Form.Group className="mb-3">

                                <Form.Label>
                                    Tax Identifier
                                </Form.Label>

                                <Form.Control
                                    value={formData.tax_identifier}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            tax_identifier: e.target.value
                                        })
                                    }
                                />

                            </Form.Group>



                            <Form.Group className="mb-3">

                                <Form.Label>
                                    Email
                                </Form.Label>

                                <Form.Control
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            email: e.target.value
                                        })
                                    }
                                />

                            </Form.Group>



                            <Form.Group className="mb-3">

                                <Form.Label>
                                    Country
                                </Form.Label>

                                <Form.Control
                                    value={formData.country}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            country: e.target.value
                                        })
                                    }
                                />

                            </Form.Group>



                            <Form.Group className="mb-3">

                                <Form.Label>
                                    Plan
                                </Form.Label>


                                <Form.Select
                                    value={formData.plan}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            plan: e.target.value
                                        })
                                    }
                                >

                                    <option value="Enterprise">
                                        Enterprise
                                    </option>

                                    <option value="Business">
                                        Business
                                    </option>

                                    <option value="Starter">
                                        Starter
                                    </option>


                                </Form.Select>

                            </Form.Group>



                            <Button
                                variant="success"
                                onClick={handleUpdate}
                            >
                                Save Changes
                            </Button>


                            <Button
                                variant="secondary"
                                className="ms-2"
                                onClick={() => setEditing(false)}
                            >
                                Cancel
                            </Button>


                        </>


                    ) : (

                        <>


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


                        </>

                    )}


                </Card.Body>

            </Card>



            <div className="mt-5">


                <h3 className="mb-4">

                    Simulation History

                </h3>


                <div className="mb-4">

                    <p className="text-muted fs-5 mb-0">
                        Total simulations: <strong>{simulations.length}</strong>
                    </p>

                </div>


                <SimulationHistory
                    simulations={simulations}
                    onSimulationDeleted={() =>
                        loadSimulations(customer.id)
                    }
                    onSimulationUpdated={() =>
                        loadSimulations(customer.id)
                    }
                />


            </div>




            <SimulationForm

                customerId={customer.id}

                onSimulationCreated={() => {

                    loadSimulations(customer.id);

                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });

                }}

            />


        </Container>

    );

}