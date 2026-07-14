import axios from "axios";
import type { Customer } from "../types/customer";
import type { Simulation } from "../types/simulation";

const api = axios.create({
    baseURL: "https://glowing-system-pj5jx57j5v4x3xj6-5000.app.github.dev",
    withCredentials: false,
});

export const getCustomers = async (): Promise<Customer[]> => {
    const response = await api.get("/customers");
    console.log("API Response:", response.data);
    return response.data;
};

export const getCustomer = async (id: number): Promise<Customer> => {
    const response = await api.get(`/customers/${id}`);
    return response.data;
};

export const getCustomerSimulations = async (
    customerId: number
): Promise<Simulation[]> => {

    const response = await api.get(
        `/customers/${customerId}/simulations`
    );

    return response.data;
};

export const createSimulation = async (
    customerId: number,
    activeUsers: number,
    storageGb: number,
    apiCalls: number
): Promise<Simulation> => {

    const response = await api.post("/simulations", {
        customer_id: customerId,
        active_users: activeUsers,
        storage_gb: storageGb,
        api_calls: apiCalls
    });

    return response.data;
};

export const deleteSimulation = async (
    simulationId: number
): Promise<void> => {

    await api.delete(`/simulations/${simulationId}`);

};

export default api;