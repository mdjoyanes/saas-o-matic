import { useState } from "react";
import {
    Card,
    Button,
    Modal,
    Form,
    Alert
} from "react-bootstrap";

import type { Simulation } from "../types/simulation";
import { deleteSimulation } from "../services/api";

import {
    convertCurrency,
    currencies,
    type Currency
} from "../utils/currency";


interface Props {
    simulations: Simulation[];
    onSimulationDeleted: () => void;
}


export default function SimulationHistory({
    simulations,
    onSimulationDeleted
}: Props) {


    const [showModal, setShowModal] = useState(false);

    const [selectedSimulation, setSelectedSimulation] =
        useState<Simulation | null>(null);


    const [temporaryCurrencies, setTemporaryCurrencies] =
        useState<Record<number, Currency>>({});

    const [savedCurrencies, setSavedCurrencies] =
        useState<Record<number, Currency>>(() => {

            const saved = localStorage.getItem(
                "simulationCurrencies"
            );

            return saved
                ? JSON.parse(saved)
                : {};

        });


    const [savedMessage, setSavedMessage] =
        useState<number | null>(null);


    const handleDelete = async () => {

        if (!selectedSimulation) return;


        await deleteSimulation(selectedSimulation.id);


        setShowModal(false);


        onSimulationDeleted();

    };


    const getCurrency = (id: number): Currency => {

        return savedCurrencies[id] || "EUR";

    };


    if (simulations.length === 0) {

        return (
            <p className="text-muted">
                No simulations yet.
            </p>
        );

    }


    return (
        <>

            {simulations.map((simulation) => {


                const currency = getCurrency(simulation.id);
                const selectedCurrency =
                    temporaryCurrencies[simulation.id] || currency;


                return (

                    <Card
                        key={simulation.id}
                        className="mb-3 shadow-sm position-relative"
                    >


                        <Button
                            variant="link"
                            className="position-absolute top-0 end-0 text-secondary fs-4 text-decoration-none"
                            onMouseEnter={(e) =>
                                e.currentTarget.classList.replace(
                                    "text-secondary",
                                    "text-danger"
                                )
                            }
                            onMouseLeave={(e) =>
                                e.currentTarget.classList.replace(
                                    "text-danger",
                                    "text-secondary"
                                )
                            }
                            onClick={() => {

                                setSelectedSimulation(simulation);

                                setShowModal(true);

                            }}
                        >

                            ×

                        </Button>



                        <Card.Body>


                            <p>
                                <strong>Users:</strong>{" "}
                                {simulation.active_users}
                            </p>


                            <p>
                                <strong>Storage:</strong>{" "}
                                {simulation.storage_gb} GB
                            </p>


                            <p>
                                <strong>API Calls:</strong>{" "}
                                {simulation.api_calls.toLocaleString()}
                            </p>



                            <p>
                                <strong>Total:</strong>{" "}
                                {currencies[selectedCurrency].symbol}
                                {convertCurrency(
                                    simulation.total_price,
                                    selectedCurrency
                                ).toFixed(2)}
                            </p>



                            <div className="d-flex justify-content-center mt-3">

                                <Form.Select
                                    style={{
                                        width: "220px"
                                    }}
                                    value={selectedCurrency}
                                    onChange={(e) =>
                                        setTemporaryCurrencies({
                                            ...temporaryCurrencies,
                                            [simulation.id]: e.target.value as Currency
                                        })
                                    }
                                >
                                    <option value="EUR">
                                        🇪🇺 Euro (€)
                                    </option>

                                    <option value="USD">
                                        🇺🇸 Dollar ($)
                                    </option>

                                    <option value="GBP">
                                        🇬🇧 Pound (£)
                                    </option>

                                </Form.Select>

                            </div>

                            <div className="text-center">

                                <Button
                                    variant="primary"
                                    size="sm"
                                    className="mt-2"
                                    onClick={() => {

                                        const updatedCurrencies = {
                                            ...savedCurrencies,
                                            [simulation.id]: selectedCurrency
                                        };

                                        setSavedCurrencies(updatedCurrencies);

                                        localStorage.setItem(
                                            "simulationCurrencies",
                                            JSON.stringify(updatedCurrencies)
                                        );

                                        setSavedMessage(simulation.id);

                                        setTimeout(() => {
                                            setSavedMessage(null);
                                        }, 2000);

                                    }}
                                >
                                    Save Currency
                                </Button>

                            </div>

                            {savedMessage === simulation.id && (

                                <Alert
                                    variant="success"
                                    className="mt-3 mb-0"
                                >
                                    Currency saved successfully ✓
                                </Alert>

                            )}


                            <small className="text-muted d-block mt-3">

                                {new Date(
                                    simulation.created_at
                                ).toLocaleString()}

                            </small>


                        </Card.Body>


                    </Card>

                );

            })}



            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                centered
            >

                <Modal.Header closeButton>

                    <Modal.Title>
                        Delete Simulation
                    </Modal.Title>

                </Modal.Header>


                <Modal.Body>

                    Are you sure you want to delete this simulation?

                </Modal.Body>


                <Modal.Footer>

                    <Button
                        variant="secondary"
                        onClick={() => setShowModal(false)}
                    >
                        Cancel
                    </Button>


                    <Button
                        variant="danger"
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>


                </Modal.Footer>


            </Modal>


        </>
    );

}