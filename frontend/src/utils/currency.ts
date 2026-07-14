export const currencies = {
    EUR: {
        symbol: "€",
        rate: 1
    },
    USD: {
        symbol: "$",
        rate: 1.17
    },
    GBP: {
        symbol: "£",
        rate: 0.86
    }
};

export type Currency = keyof typeof currencies;

export function convertCurrency(
    amount: number,
    currency: Currency
) {
    return amount * currencies[currency].rate;
}