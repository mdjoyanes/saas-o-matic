export type Currency =
    | "EUR"
    | "USD"
    | "GBP";


export const currencies = {

    EUR: {
        symbol: "€",
        name: "Euro"
    },

    USD: {
        symbol: "$",
        name: "Dollar"
    },

    GBP: {
        symbol: "£",
        name: "Pound"
    }

};



export const convertCurrency = (
    amount: number,
    currency: Currency,
    rates: Record<string, number>
) => {

    return amount * rates[currency];

};