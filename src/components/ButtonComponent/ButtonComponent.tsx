import Button from 'react-bootstrap/Button';

type ButtonComponentProps = {
    variant: string;
    size: "sm" | "lg";
    content: string;
     className:string
};
   



function ButtonComponent(props: ButtonComponentProps) {
    return (
        <div className="">
            <Button variant={props.variant} size={props.size} className={props.className+' rounded-custom'}>
                {props.content}
            </Button>
        </div>
    );
}

export default ButtonComponent;