import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import CustomerCard from "../components/CustomerCard";
import SearchBar from "../components/SearchBar";
import CreateCustomer from "../components/CreateCustomer";

import type { Customer } from "../types/customer";
import { getCustomers } from "../services/api";


export default function Dashboard() {


    const [customers, setCustomers] = useState<Customer[]>([]);
    const [search, setSearch] = useState("");



    useEffect(() => {

        loadCustomers();

    }, []);



    const loadCustomers = async () => {

        const data = await getCustomers();

        setCustomers(data);

    };



    const filteredCustomers = customers.filter((customer) =>

        customer.company_name
            .toLowerCase()
            .includes(search.toLowerCase())

        ||

        customer.tax_identifier
            .toLowerCase()
            .includes(search.toLowerCase())

    );



    return (

        <Container className="pt-5 pb-5">


            <Row className="mb-5 text-center">

                <Col>

                    <h1 className="display-4 fw-bold">
                        SaaS-O-Matic
                    </h1>


                    <p className="lead text-muted mb-5">
                        Dynamic Billing & Subscription Optimizer
                    </p>

                </Col>

            </Row>




            {/* Search + Create button */}

            {/* Search + Create button */}

            <Row className="mb-4 align-items-center g-2">

                <Col
                    xs={12}
                    md={9}
                >

                    <SearchBar
                        value={search}
                        onChange={setSearch}
                    />

                </Col>


                <Col
                    xs={12}
                    md={3}
                    className="d-flex align-items-start mt-0"
                    style={{
                        transform: "translateY(-8px)"
                    }}
                >

                    <CreateCustomer
                        onCustomerCreated={loadCustomers}
                    />

                </Col>

            </Row>





            <Row>


                {filteredCustomers.length === 0 ? (


                    <Col className="text-center">


                        <p className="text-muted fs-5">
                            No customers found.
                        </p>


                    </Col>


                ) : (


                    filteredCustomers.map(customer => (


                        <Col

                            key={customer.id}

                            xs={12}
                            md={6}
                            lg={4}

                            className="mb-4"

                        >


                            <CustomerCard

                                customer={customer}

                                onCustomerDeleted={loadCustomers}

                            />


                        </Col>


                    ))


                )}


            </Row>


        </Container>

    );

}