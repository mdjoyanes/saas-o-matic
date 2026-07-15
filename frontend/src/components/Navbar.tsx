import { Navbar, Container, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";


export default function AppNavbar() {


    const navigate = useNavigate();
    const location = useLocation();


    const [darkMode, setDarkMode] = useState(() => {

        return localStorage.getItem("theme") === "dark";

    });



    useEffect(() => {

        if (darkMode) {

            document.body.classList.add("dark-mode");

            localStorage.setItem(
                "theme",
                "dark"
            );

        } else {

            document.body.classList.remove("dark-mode");

            localStorage.setItem(
                "theme",
                "light"
            );

        }

    }, [darkMode]);



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
            bg={darkMode ? "dark" : "light"}
            variant={darkMode ? "dark" : "light"}
            className="shadow-sm sticky-top"
        >

            <Container>


                <Navbar.Brand
                    className="fw-bold"
                    style={{
                        cursor: "pointer"
                    }}
                    onClick={handleClick}
                >

                    <i className="bi bi-bar-chart-line-fill me-2"></i>

                    SaaS-O-Matic

                </Navbar.Brand>



                <Button
                    variant="link"
                    className="text-decoration-none fs-5"
                    title={
                        darkMode
                            ? "Switch to light mode"
                            : "Switch to dark mode"
                    }
                    onClick={() => setDarkMode(!darkMode)}
                >
                    {darkMode ? "☀️" : "🌙"}
                </Button>

            </Container>

        </Navbar>

    );

}