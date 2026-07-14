import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
    return (

        <Form className="mb-4">

            <InputGroup>

                <InputGroup.Text>
                    <i className="bi bi-search"></i>
                </InputGroup.Text>

                <Form.Control
                    size="lg"
                    type="text"
                    placeholder="Search company or tax identifier..."
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />

            </InputGroup>

        </Form>

    );
}