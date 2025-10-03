

import CardLogin from "../../components/CardLogin/CardLogin";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function HomePage() {

    return (

        <Container fluid className="h-100">
            <Row className="h-100">
               <div className="d-none d-md-flex col-md-6 col-lg-7 flex-column justify-content-center align-items-center px-5 py-5 bg-custom-primary h-100"></div>
                <Col className="d-flex align-items-center justify-content-center">
                    <div className="d-flex flex-column gap-5">
                       <div className=""> <h2 className="fw-bold text-custom-primary">Iniciar Sesión</h2>
                        <div className="text-custom-gray">Accede a tu cuenta de Kairon Bank</div></div>
                        <CardLogin></CardLogin>
                        <div className="text-center" style={{maxWidth:"400px"}}>Al iniciar sesión, aceptas nuestros Términos y Condiciones y Política de Privacidad</div>
                    </div>
                </Col>
            </Row>


        </Container>

    )

}
