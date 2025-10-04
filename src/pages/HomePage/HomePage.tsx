import CardSummary from "../../components/CardSummary/Card";
import { useState } from 'react';
import RedirectButton from '../../components/RedirectButton/RedirectButton';
import { useNavigate } from "react-router-dom";
import '../../components/RedirectButton/RedirectButton.css';

// Importación de los íconos SVG
import TransferIconSVG from '../../assets/transfer.svg';
import PayIconSVG from '../../assets/pay.svg';
import RechargeIconSVG from '../../assets/recharge.svg';

export default function HomePage() {
    const navigate = useNavigate();
    const [activeButton, setActiveButton] = useState('');

    return (
        <div>
            <h1>Resumen de Cuentas</h1>

            {/* Sección de Cards */}
            <CardSummary
                titulo="Cuenta de Ahorros"
                valor="$ 1.650.000"
                descripcion="****7890"
                estado="Disponible"
                valorNegativo={false}
            />
            <br />
            <CardSummary
                titulo="Tarjeta de Credito"
                valor="$ -3.450.000"
                descripcion="****7990"
                estado="Bloqueada"
                valorNegativo={true}
            />

            {/* Sección de Botones de Redirección */}
            <div className="buttonGroup">
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
        </div>
    );
}


