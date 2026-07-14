import { useState, type ChangeEvent } from "react";
import {
    Button,
    Modal,
    Form,
    Alert
} from "react-bootstrap";

import { createCustomer } from "../services/api";


interface Props {
    onCustomerCreated: () => void;
}


export default function CreateCustomer({
    onCustomerCreated
}: Props) {


    const [show, setShow] = useState(false);

    const [error, setError] = useState("");
    const [fieldErrors, setFieldErrors] = useState({
        tax_identifier: "",
        email: ""
    });

    const [formData, setFormData] = useState({

        company_name: "",
        tax_identifier: "",
        email: "",
        country: "",
        plan: "Enterprise"

    });

    const validateField = (
        name: string,
        value: string
    ) => {


        if (name === "tax_identifier") {

            const taxRegex = /^[A-Z0-9-]{5,20}$/i;


            setFieldErrors(prev => ({
                ...prev,
                tax_identifier:
                    taxRegex.test(value) && value.length >= 5
                        ? ""
                        : "Invalid Tax Identifier format"
            }));

        }



        if (name === "email") {

            const emailRegex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            setFieldErrors(prev => ({
                ...prev,
                email: emailRegex.test(value)
                    ? ""
                    : "Invalid email format"
            }));

        }

    };
    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {

        let value = e.target.value;


        if (e.target.name === "tax_identifier") {

            value = value
                .toUpperCase()
                .replace(/[^A-Z0-9-]/g, "");


            // máximo 20 caracteres
            value = value.substring(0, 20);

        }


        setFormData({

            ...formData,

            [e.target.name]: value

        });


        validateField(
            e.target.name,
            value
        );

    };

    const handleSubmit = async () => {

        try {

            setError("");

            await createCustomer(formData);


            setFormData({

                company_name: "",
                tax_identifier: "",
                email: "",
                country: "",
                plan: "Enterprise"

            });


            setShow(false);


            onCustomerCreated();


        } catch (error: any) {

            console.error(error);

            setError(
                error.response?.data?.error ||
                "Error creating customer."
            );

        }

    };


    return (

        <>

            <Button
                variant="primary"
                onClick={() => setShow(true)}
            >
                + New Customer
            </Button>


            <Modal
                show={show}
                onHide={() => setShow(false)}
                centered
            >

                <Modal.Header closeButton>

                    <Modal.Title>
                        Create New Customer
                    </Modal.Title>

                </Modal.Header>


                <Modal.Body>


                    {error && (

                        <Alert variant="danger">
                            {error}
                        </Alert>

                    )}


                    <Form.Group className="mb-3">

                        <Form.Label>
                            Company Name
                        </Form.Label>

                        <Form.Control
                            name="company_name"
                            value={formData.company_name}
                            onChange={handleChange}
                            placeholder="Example: NovaTech Solutions"
                        />

                    </Form.Group>



                    <Form.Group className="mb-3">

                        <Form.Label>
                            Tax Identifier
                        </Form.Label>

                        <Form.Control
                            name="tax_identifier"
                            value={formData.tax_identifier}
                            onChange={handleChange}
                            placeholder="Example: ESB12345678"
                            maxLength={20}
                            isInvalid={!!fieldErrors.tax_identifier}
                        />

                        <Form.Control.Feedback type="invalid">
                            {fieldErrors.tax_identifier}
                        </Form.Control.Feedback>

                    </Form.Group>



                    <Form.Group className="mb-3">

                        <Form.Label>
                            Email
                        </Form.Label>

                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="contact@company.com"
                            isInvalid={!!fieldErrors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                            {fieldErrors.email}
                        </Form.Control.Feedback>
                    </Form.Group>



                    <Form.Group className="mb-3">

                        <Form.Label>
                            Country
                        </Form.Label>

                        <Form.Control
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            placeholder="Country"
                        />

                    </Form.Group>



                    <Form.Group>

                        <Form.Label>
                            Plan
                        </Form.Label>


                        <Form.Select
                            name="plan"
                            value={formData.plan}
                            onChange={handleChange}
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


                </Modal.Body>


                <Modal.Footer>

                    <Button
                        variant="secondary"
                        onClick={() => setShow(false)}
                    >
                        Cancel
                    </Button>


                    <Button
                        variant="primary"
                        onClick={handleSubmit}
                        disabled={
                            !!fieldErrors.tax_identifier ||
                            !!fieldErrors.email ||
                            !formData.company_name ||
                            !formData.tax_identifier ||
                            !formData.email ||
                            !formData.country
                        }
                    >
                        Save Customer
                    </Button>


                </Modal.Footer>


            </Modal>


        </>

    );

}