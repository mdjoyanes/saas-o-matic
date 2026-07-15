import { useState, useEffect } from "react";
import {
    getExchangeRates
} from "../services/exchange";

import {
    Card,
    Button,
    Modal,
    Form,
    Alert
} from "react-bootstrap";

import type { Simulation } from "../types/simulation";
import {
    deleteSimulation,
    updateSimulation
} from "../services/api";

import {
    convertCurrency,
    currencies,
    type Currency
} from "../utils/currency";


interface Props {
    simulations: Simulation[];
    onSimulationDeleted: () => void;
    onSimulationUpdated: () => void;
}


export default function SimulationHistory({
    simulations,
    onSimulationDeleted,
    onSimulationUpdated
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


    const [updatedMessage, setUpdatedMessage] =
        useState<number | null>(null);
    const [rates, setRates] = useState({
        EUR: 1,
        USD: 1,
        GBP: 1
    });
    useEffect(() => {

        const loadRates = async () => {

            try {

                const data = await getExchangeRates();

                setRates(data);

            } catch (error) {

                console.error(
                    "Error loading exchange rates",
                    error
                );

            }

        };


        loadRates();

    }, []);


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



                            <div className="mb-2">

                                <strong>Total:</strong>{" "}
                                {currencies[selectedCurrency].symbol}
                                {convertCurrency(
                                    simulation.total_price,
                                    selectedCurrency,
                                    rates
                                ).toFixed(2)}

                            </div>



                            <div className="d-flex align-items-center gap-2 mt-3">

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


                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={async () => {

                                        const updatedCurrencies = {
                                            ...savedCurrencies,
                                            [simulation.id]: selectedCurrency
                                        };


                                        setSavedCurrencies(updatedCurrencies);


                                        localStorage.setItem(
                                            "simulationCurrencies",
                                            JSON.stringify(updatedCurrencies)
                                        );


                                        await updateSimulation(
                                            simulation.id
                                        );

                                        onSimulationUpdated();


                                        setUpdatedMessage(
                                            simulation.id
                                        );


                                        setTimeout(() => {
                                            setUpdatedMessage(null);
                                        }, 2000);

                                    }}
                                >
                                    Save
                                </Button>

                            </div>

                            {updatedMessage === simulation.id && (

                                <Alert
                                    variant="success"
                                    className="mt-2 mb-0 py-2"
                                >
                                    Simulation updated successfully ✓
                                </Alert>

                            )}


                            <small className="text-muted d-block mt-3">
                                Created:{" "}
                                {simulation.created_at}
                            </small>

                            <small className="text-muted d-block">
                                Modified:{" "}
                                {simulation.updated_at}
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