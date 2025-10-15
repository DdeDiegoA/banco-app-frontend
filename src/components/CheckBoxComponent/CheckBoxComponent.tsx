import type { FormCheckType } from 'react-bootstrap/esm/FormCheck';
import Form from 'react-bootstrap/Form';

type CheckBoxComponentProps = {
    type: FormCheckType;
    label: string;
    id: string;
}

function CheckBoxComponent(
    props: CheckBoxComponentProps
) {
    return (
        <Form>
            <Form.Check // prettier-ignore
                type={props.type}
                id={`default-${props.id}`}
                label={props.label}
            />
        </Form>
    );
}

export default CheckBoxComponent;