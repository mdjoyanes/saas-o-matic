const EXCHANGE_API =
"https://open.er-api.com/v6/latest/EUR";


export interface ExchangeRates {

    EUR: number;
    USD: number;
    GBP: number;

}


export const getExchangeRates = async (): Promise<ExchangeRates> => {


    const response = await fetch(
        EXCHANGE_API
    );


    if (!response.ok) {

        throw new Error(
            "Failed to fetch exchange rates"
        );

    }


    const data = await response.json();


    return {

        EUR: 1,

        USD: data.rates.USD,

        GBP: data.rates.GBP

    };

};