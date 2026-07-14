import { Navbar, Container } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

export default function AppNavbar() {

    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = () => {

        if (location.pathname !== "/") {

            navigate("/");

            setTimeout(() => {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }, 100);

        } else {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }

    };

    return (

        <Navbar
            bg="dark"
            variant="dark"
            className="shadow-sm sticky-top"
        >

            <Container>

                <Navbar.Brand
                    className="fw-bold"
                    style={{ cursor: "pointer" }}
                    onClick={handleClick}
                >

                    <i className="bi bi-bar-chart-line-fill me-2"></i>

                    SaaS-O-Matic

                </Navbar.Brand>

            </Container>

        </Navbar>

    );
}