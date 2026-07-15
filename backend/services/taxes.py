TAX_RATES = {
    "spain": 0.21,
    "france": 0.20,
    "germany": 0.19,
    "italy": 0.22,
    "portugal": 0.23,
    "united kingdom": 0.20,
    "united states": 0.00,
    "usa": 0.00,
}


def calculate_tax(country: str, base_price: float):

    if not country:
        return {"tax_rate": 0, "tax_amount": 0, "total_price": base_price}

    rate = TAX_RATES.get(country.strip().lower(), 0)

    tax_amount = base_price * rate

    total = base_price + tax_amount

    return {
        "tax_rate": rate,
        "tax_amount": round(tax_amount, 2),
        "total_price": round(total, 2),
    }
