import Form from 'react-bootstrap/Form';

type InputComponentProps = {
    label: string;
    type: string;
    placeholder: string;
}
function InputComponent(props: InputComponentProps) {
    return (
        <div>
            <Form.Label htmlFor={props.label}>{props.label}</Form.Label>
            <Form.Control
                type={props.type}
                id={props.label}
                aria-describedby="passwordHelpBlock"
                placeholder={props.placeholder}
            />
            {/* <Form.Text id="passwordHelpBlock" muted> 
      </Form.Text> */}
        </div>
    );
}

export default InputComponent;