import { Card, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import type { Customer } from "../types/customer";

interface Props {
    customer: Customer;
}

export default function CustomerCard({ customer }: Props) {

    const navigate = useNavigate();

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

    return (

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

            </Card.Body>

        </Card>

    );

}