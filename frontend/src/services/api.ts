import axios from "axios";

import type { Customer } from "../types/customer";
import type { Simulation } from "../types/simulation";


const api = axios.create({

    baseURL: import.meta.env.VITE_API_URL,

    withCredentials: false,

});


// GET ALL CUSTOMERS

export const getCustomers = async (): Promise<Customer[]> => {

    const response = await api.get("/customers");

    return response.data;

};



// GET CUSTOMER BY ID

export const getCustomer = async (
    id: number
): Promise<Customer> => {

    const response = await api.get(
        `/customers/${id}`
    );

    return response.data;

};



// GET CUSTOMER SIMULATIONS

export const getCustomerSimulations = async (
    customerId: number
): Promise<Simulation[]> => {

    const response = await api.get(
        `/customers/${customerId}/simulations`
    );

    return response.data;

};



// CREATE CUSTOMER

export const createCustomer = async (
    customerData: {

        company_name: string;

        tax_identifier: string;

        email: string;

        country: string;

        plan: string;

    }
): Promise<{
    message: string;
    customer: Customer;
}> => {


    const response = await api.post(
        "/customers",
        customerData
    );


    return response.data;

};



// UPDATE CUSTOMER

export const updateCustomer = async (
    id: number,
    customerData: {

        company_name: string;

        tax_identifier: string;

        email: string;

        country: string;

        plan: string;

    }
): Promise<{
    message: string;
    customer: Customer;
}> => {


    const response = await api.put(
        `/customers/${id}`,
        customerData
    );


    return response.data;

};



// DELETE CUSTOMER

export const deleteCustomer = async (
    customerId: number
): Promise<void> => {


    await api.delete(
        `/customers/${customerId}`
    );


};



// CREATE SIMULATION

export const createSimulation = async (
    customerId: number,
    activeUsers: number,
    storageGb: number,
    apiCalls: number
): Promise<Simulation> => {


    const response = await api.post(
        "/simulations",
        {

            customer_id: customerId,

            active_users: activeUsers,

            storage_gb: storageGb,

            api_calls: apiCalls

        }
    );


    return response.data;

};



// DELETE SIMULATION

export const deleteSimulation = async (
    simulationId: number
): Promise<void> => {


    await api.delete(
        `/simulations/${simulationId}`
    );


};

// UPDATE SIMULATION

export const updateSimulation = async (
    simulationId: number
): Promise<{
    message: string;
    simulation: Simulation;
}> => {


    const response = await api.put(
        `/simulations/${simulationId}`
    );


    return response.data;

};

export default api;