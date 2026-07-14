import { useState } from "react";
import { Card, Badge, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import type { Customer } from "../types/customer";
import { deleteCustomer } from "../services/api";


interface Props {
    customer: Customer;
    onCustomerDeleted: () => void;
}


export default function CustomerCard({
    customer,
    onCustomerDeleted
}: Props) {


    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);



    const getBadgeVariant = () => {

        switch (customer.plan.toLowerCase()) {

            case "enterprise":
                return "danger";

            case "business":
                return "warning";

            default:
                return "primary";

        }

    };



    const handleDelete = async () => {

        await deleteCustomer(customer.id);

        setShowModal(false);

        onCustomerDeleted();

    };



    return (

        <>


            <Card
                className="shadow h-100 border-0"
                style={{
                    cursor: "pointer",
                    transition: "transform .2s ease, box-shadow .2s ease",
                    borderRadius: "16px"
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow =
                        "0 12px 25px rgba(0,0,0,.15)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "";
                }}
                onClick={() => navigate(`/customer/${customer.id}`)}
            >

                <Card.Body>


                    <div className="d-flex justify-content-between align-items-center mb-3">

                        <Card.Title className="fw-bold fs-4 mb-0">
                            {customer.company_name}
                        </Card.Title>


                        <Badge bg={getBadgeVariant()}>
                            {customer.plan}
                        </Badge>


                    </div>


                    <hr />


                    <p className="mb-3">

                        <i className="bi bi-globe-americas me-2"></i>

                        {customer.country}

                    </p>


                    <p className="mb-0">

                        <i className="bi bi-envelope-fill me-2"></i>

                        {customer.email}

                    </p>

                    <div className="text-end mt-3">

                        <Button
                            variant="link"
                            className="text-secondary fs-4 fw-bold text-decoration-none p-0"
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
                            onClick={(e) => {

                                e.stopPropagation();

                                setShowModal(true);

                            }}
                        >
                            ×
                        </Button>

                    </div>

                </Card.Body>


            </Card>



            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                centered
            >

                <Modal.Header closeButton>

                    <Modal.Title>
                        Delete Customer
                    </Modal.Title>

                </Modal.Header>


                <Modal.Body>

                    Are you sure you want to delete{" "}
                    <strong>{customer.company_name}</strong>?

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