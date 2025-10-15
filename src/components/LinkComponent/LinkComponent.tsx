import Button from 'react-bootstrap/Button';

type LinkComponentProps = {
    variant: string;
    content: string;
}

function LinkComponent(
    props: LinkComponentProps
) {
    return (
        <>
            <Button variant={props.variant}>{props.content}</Button>
        </>
    );
}

export default LinkComponent;