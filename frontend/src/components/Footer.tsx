import { Container } from "react-bootstrap";

export default function Footer() {
    return (
        <footer className="app-footer border-top mt-5 py-4">

            <Container className="text-center">

                <small>
                    © 2026 SaaS-O-Matic • Created by{" "}
                    <strong>Marc Dominguez</strong>
                </small>

            </Container>

        </footer>
    );
}