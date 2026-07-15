import { useEffect, useState } from "react";
import {
    Button,
    Card,
    Form,
    Alert
} from "react-bootstrap";

import {
    getExchangeRates,
    type ExchangeRates
} from "../services/exchange";

import {
    createSimulation
} from "../services/api";

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


    const [currency, setCurrency] = useState("EUR");

    const [rates, setRates] = useState<ExchangeRates | null>(null);



    const [loading, setLoading] = useState(false);

    const [result, setResult] = useState<Simulation | null>(null);



    useEffect(() => {

        getExchangeRates()
            .then(setRates)
            .catch(error =>
                console.error(
                    "Exchange error:",
                    error
                )
            );

    }, []);




    const calculatePreviewPrice = () => {

        let total = 0;


        if (activeUsers <= 10) {

            total = activeUsers * 10;


        } else if (activeUsers <= 50) {

            total =
                (10 * 10) +
                ((activeUsers - 10) * 8);


        } else {

            total =
                (10 * 10) +
                (40 * 8) +
                ((activeUsers - 50) * 5);

        }


        return total;

    };




    const convertPrice = (
        price: number
    ) => {


        if (!rates) {

            return price;

        }


        return price * rates[
            currency as keyof ExchangeRates
        ];

    };





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


            onSimulationCreated();



        } catch (error) {


            console.error(error);

            alert(
                "Error creating simulation."
            );



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

                        max={200}

                        value={activeUsers}

                        onChange={(e) =>
                            setActiveUsers(
                                Number(e.target.value)
                            )
                        }

                    />


                    <strong>
                        {activeUsers}
                    </strong>




                    <div className="mt-3">


                        <strong>
                            Estimated monthly price:
                        </strong>


                        <h4 className="text-primary">

                            {currency}{" "}

                            {convertPrice(
                                calculatePreviewPrice()
                            ).toFixed(2)}

                        </h4>


                    </div>


                </Form.Group>






                <Form.Group className="mb-3">


                    <Form.Label>
                        Storage (GB)
                    </Form.Label>


                    <Form.Control

                        type="number"

                        value={storageGb}

                        onChange={(e) =>
                            setStorageGb(
                                Number(e.target.value)
                            )
                        }

                    />


                </Form.Group>






                <Form.Group className="mb-3">


                    <Form.Label>
                        API Calls
                    </Form.Label>


                    <Form.Control

                        type="number"

                        value={apiCalls}

                        onChange={(e) =>
                            setApiCalls(
                                Number(e.target.value)
                            )
                        }

                    />


                </Form.Group>







                <Form.Group className="mb-4">


                    <Form.Label>
                        Currency
                    </Form.Label>


                    <Form.Select

                        value={currency}

                        onChange={(e) =>
                            setCurrency(
                                e.target.value
                            )
                        }

                    >

                        <option value="EUR">
                            EUR (€)
                        </option>


                        <option value="USD">
                            USD ($)
                        </option>


                        <option value="GBP">
                            GBP (£)
                        </option>


                    </Form.Select>


                </Form.Group>







                <Button

                    onClick={handleSave}

                    disabled={loading}

                >

                    {
                        loading
                            ? "Saving..."
                            : "Save Simulation"
                    }


                </Button>







                {result && (


                    <Alert

                        variant="success"

                        className="mt-4"

                    >


                        <h5>
                            Calculation Result
                        </h5>




                        <p>

                            <strong>
                                Base Price:
                            </strong>{" "}


                            {currency}{" "}

                            {convertPrice(
                                result.base_price
                            ).toFixed(2)}


                        </p>





                        <p>

                            <strong>
                                Tax:
                            </strong>{" "}


                            {currency}{" "}

                            {convertPrice(
                                result.tax_amount
                            ).toFixed(2)}


                        </p>





                        <p>

                            <strong>
                                Total:
                            </strong>{" "}


                            {currency}{" "}

                            {convertPrice(
                                result.total_price
                            ).toFixed(2)}


                        </p>



                    </Alert>


                )}



            </Card.Body>


        </Card>

    );

}