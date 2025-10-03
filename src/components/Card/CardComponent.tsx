// import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

type CardComponentProps = {
    // style: React.HTMLAttributes<HTMLDivElement>;
    width: string;
    title: string;
    description: string;
    children: React.ReactNode;
    
}
function CardComponent(props: CardComponentProps) {
    return (
        <Card style={{width: props.width, border:'none'}} className='shadow-1 rounded-custom'>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <Card.Body>
                {/* <Card.Title>{props.title}</Card.Title>
                <Card.Text>
                    {props.description}s
                </Card.Text> */}
                {/* <Button variant="primary">Go somewhere</Button> */}

                {props.children}

            </Card.Body>
        </Card>
    );
}

export default CardComponent;