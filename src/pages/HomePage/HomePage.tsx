import CardSummary from "../../components/CardSummary/Card";
import { useState, useEffect } from 'react';
import RedirectButton from '../../components/RedirectButton/RedirectButton';
import { useNavigate } from "react-router-dom";
import './HomePage.css';

// Importación de los íconos SVG
import TransferIconSVG from '../../assets/transfer.svg';
import PayIconSVG from '../../assets/pay.svg';
import RechargeIconSVG from '../../assets/recharge.svg';

/**
* HomePage 
* Página principal del dashboard bancario
* Incluye toggle de visibilidad y loading states
*/
export default function HomePage() {
    const navigate = useNavigate();
    const [activeButton, setActiveButton] = useState('');
    const [showBalances, setShowBalances] = useState(true);
    const [loading, setLoading] = useState(true);

    // Nombre del usuario - en producción vendría del store
    const userName = "Cristian";

    // Datos de las cuentas (en producción vendrían de la API)
    const accountsData = [
        {
            titulo: "Cuenta de Ahorros",
            valorReal: "$ 2.450.000",
            descripcion: "****7890",
            estado: "Disponible",
            valorNegativo: false
        },
        {
            titulo: "Cuenta Corriente",
            valorReal: "$ 890.000",
            descripcion: "****3210",
            estado: "Disponible",
            valorNegativo: false
        },
        {
            titulo: "Tarjeta de Crédito",
            valorReal: "$ -150.000",
            descripcion: "****4444",
            estado: "Disponible",
            valorNegativo: true
        }
    ];

    // Simula carga de datos (reemplazar con llamada API real)
    useEffect(() => {
        setLoading(true);
        // Simula delay de red
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    /**
     * Toggle para mostrar/ocultar saldos
     */
    const handleToggleVisibility = () => {
        setShowBalances(!showBalances);
    };

    /**
     * Formatea el valor según visibilidad
     */
    const getDisplayValue = (valorReal: string) => {
        return showBalances ? valorReal : "••••••";
    };

    // Loading state
    if (loading) {
        return (
            <div className="homePage">
                <header className="homePageHeader">
                    <div className="skeleton skeletonTitle"></div>
                    <div className="skeleton skeletonSubtitle"></div>
                </header>
                <main className="homePageContent">
                    <section className="accountSummarySection">
                        <div className="sectionHeader">
                            <div className="skeleton skeletonSectionTitle"></div>
                        </div>
                        <div className="accountsGrid">
                            <div className="skeleton skeletonCard"></div>
                            <div className="skeleton skeletonCard"></div>
                        </div>
                    </section>
                    <section className="quickAccessSection">
                        <div className="skeleton skeletonSectionTitle"></div>
                        <div className="quickAccessGrid">
                            <div className="skeleton skeletonButton"></div>
                            <div className="skeleton skeletonButton"></div>
                            <div className="skeleton skeletonButton"></div>
                        </div>
                    </section>
                </main>
            </div>
        );
    }

    return (
        <div className="homePage">
            {/* Encabezado de bienvenida */}
            <header className="homePageHeader">
                <h1 className="welcomeTitle">¡Hola, {userName}!</h1>
                <p className="welcomeSubtitle">Bienvenido a Kairon Bank</p>
            </header>

            {/* Contenido principal */}
            <main className="homePageContent">
                {/* Sección de resumen de cuentas */}
                <section className="accountSummarySection">
                    <div className="sectionHeader">
                        <h2 className="sectionTitle">Resumen de Cuentas</h2>
                        <button
                            className="toggleVisibility"
                            onClick={handleToggleVisibility}
                            aria-label={showBalances ? "Ocultar saldos" : "Mostrar saldos"}
                            aria-pressed={!showBalances}
                        >
                            {showBalances ? (
                                // Ícono de ojo abierto
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                            ) : (
                                // Ícono de ojo cerrado
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                                    <line x1="1" y1="1" x2="23" y2="23" />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Grid de tarjetas de cuentas */}
                    <div className="accountsGrid">
                        {accountsData.map((account, index) => (
                            <CardSummary
                                key={index}
                                titulo={account.titulo}
                                valor={getDisplayValue(account.valorReal)}
                                descripcion={account.descripcion}
                                estado={account.estado}
                                valorNegativo={account.valorNegativo}
                            />
                        ))}
                    </div>
                </section>

                {/* Sección de accesos rápidos */}
                <section className="quickAccessSection">
                    <h2 className="sectionTitle">Accesos Rápidos</h2>

                    {/* Grid de botones de acción rápida */}
                    <div className="quickAccessGrid">
                        <RedirectButton
                            icon={<img src={TransferIconSVG} alt="" />}
                            label="Transferir"
                            onClick={() => {
                                setActiveButton('transfer');
                                navigate('/transfer');
                            }}
                            isActive={activeButton === 'transfer'}
                        />
                        <RedirectButton
                            icon={<img src={PayIconSVG} alt="" />}
                            label="Pagar"
                            onClick={() => {
                                setActiveButton('pay');
                                navigate('/pay');
                            }}
                            isActive={activeButton === 'pay'}
                        />
                        <RedirectButton
                            icon={<img src={RechargeIconSVG} alt="" />}
                            label="Recargar"
                            onClick={() => {
                                setActiveButton('recharge');
                                navigate('/recharge');
                            }}
                            isActive={activeButton === 'recharge'}
                        />
                    </div>
                </section>
            </main>
        </div>
    );
}



// import CardLogin from "../../components/CardLogin/CardLogin";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";

// export default function HomePage() {

//     return (

//         <Container fluid className="h-100">
//             <Row className="h-100">
//                <div className="d-none d-md-flex col-md-6 col-lg-7 flex-column justify-content-center align-items-center px-5 py-5 bg-custom-primary h-100"></div>
//                 <Col className="d-flex align-items-center justify-content-center">
//                     <div className="d-flex flex-column gap-5">
//                        <div className=""> <h2 className="fw-bold text-custom-primary">Iniciar Sesión</h2>
//                         <div className="text-custom-gray">Accede a tu cuenta de Kairon Bank</div></div>
//                         <CardLogin></CardLogin>
//                         <div className="text-center" style={{maxWidth:"400px"}}>Al iniciar sesión, aceptas nuestros Términos y Condiciones y Política de Privacidad</div>
//                     </div>
//                 </Col>
//             </Row>


//         </Container>

//     )
