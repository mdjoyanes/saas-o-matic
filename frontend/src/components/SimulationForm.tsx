import { useState } from "react";
import { Button, Card, Form, Alert } from "react-bootstrap";

import { createSimulation } from "../services/api";
import type { Simulation } from "../types/simulation";


interface Props {
    customerId: number;
    onSimulationCreated: () => void;
}

export default function SimulationForm({
    customerId,
    onSimulationCreated
}: Props) {

    const [activeUsers, setActiveUsers] = useState(10);
    const [storageGb, setStorageGb] = useState(100);
    const [apiCalls, setApiCalls] = useState(50000);

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<Simulation | null>(null);

    const handleSave = async () => {

        setLoading(true);

        try {

            const simulation = await createSimulation(
                customerId,
                activeUsers,
                storageGb,
                apiCalls
            );

            setResult(simulation);

            // Recarga el historial automáticamente
            onSimulationCreated();

        } catch (error) {

            console.error(error);
            alert("Error creating simulation.");

        } finally {

            setLoading(false);

        }

    };

    return (

        <Card className="shadow-sm mt-5">

            <Card.Body>

                <h3 className="mb-4">
                    New Simulation
                </h3>

                <Form.Group className="mb-3">

                    <Form.Label>
                        Active Users
                    </Form.Label>

                    <Form.Range
                        min={1}
                        max={100}
                        value={activeUsers}
                        onChange={(e) =>
                            setActiveUsers(Number(e.target.value))
                        }
                    />

                    <strong>{activeUsers}</strong>

                </Form.Group>

                <Form.Group className="mb-3">

                    <Form.Label>
                        Storage (GB)
                    </Form.Label>

                    <Form.Control
                        type="number"
                        value={storageGb}
                        onChange={(e) =>
                            setStorageGb(Number(e.target.value))
                        }
                    />

                </Form.Group>

                <Form.Group className="mb-4">

                    <Form.Label>
                        API Calls
                    </Form.Label>

                    <Form.Control
                        type="number"
                        value={apiCalls}
                        onChange={(e) =>
                            setApiCalls(Number(e.target.value))
                        }
                    />

                </Form.Group>

                <Button
                    onClick={handleSave}
                    disabled={loading}
                >
                    {loading ? "Saving..." : "Save Simulation"}
                </Button>

                {result && (

                    <Alert
                        variant="success"
                        className="mt-4"
                    >

                        <h5>Calculation Result</h5>

                        <p>
                            <strong>Base Price:</strong> €{result.base_price.toFixed(2)}
                        </p>

                        <p>
                            <strong>Tax:</strong> €{result.tax_amount.toFixed(2)}
                        </p>

                        <p>
                            <strong>Total:</strong> €{result.total_price.toFixed(2)}
                        </p>

                    </Alert>

                )}

            </Card.Body>

        </Card>

    );

}