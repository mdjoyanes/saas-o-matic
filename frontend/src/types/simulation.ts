export interface Simulation {
    id: number;
    customer_id: number;
    active_users: number;
    storage_gb: number;
    api_calls: number;
    base_price: number;
    tax_rate: number;
    tax_amount: number;
    total_price: number;
    created_at: string;
}