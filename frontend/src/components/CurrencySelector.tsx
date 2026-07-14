import Form from "react-bootstrap/Form";
import type { Currency } from "../utils/currency";

interface Props {
    value: Currency;
    onChange: (currency: Currency) => void;
}

export default function CurrencySelector({
    value,
    onChange
}: Props) {

    return (

        <Form.Select
            value={value}
            onChange={(e) =>
                onChange(e.target.value as Currency)
            }
        >

            <option value="EUR">🇪🇺 Euro (€)</option>

            <option value="USD">🇺🇸 US Dollar ($)</option>

            <option value="GBP">🇬🇧 Pound (£)</option>

        </Form.Select>

    );

}