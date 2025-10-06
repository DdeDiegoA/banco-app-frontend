import './Card.css';

interface CardSummaryProps {
    titulo: string;
    valor: string;
    descripcion: string;
    estado: string;
    valorNegativo?: boolean;
}

/*
* Componente de tarjeta bancaria que muestra información resumida de una cuenta
* Estas son las propiedades que el componente acepta
*/
const CardSummary: React.FC<CardSummaryProps> = ({
    titulo,
    valor,
    descripcion,
    estado,
    valorNegativo = false
}) => {
    return (
        <article className="card-contenedor">
            <div className="card-elementos">
                {/* Título de la cuenta */}
                <div className="card-titulo">
                    <h3>{titulo}</h3>
                </div>

                {/* Número de cuenta enmascarado */}
                <div className="card-descripcion">
                    <p>{descripcion}</p>
                </div>

                {/* Saldo principal - elemento destacado */}
                <div className={`card-valor ${valorNegativo ? 'card-valor--negativo' : ''}`}>
                    <p>{valor}</p>
                </div>

                {/* Estado de la cuenta */}
                <div className="card-estado">
                    <span>{estado}</span>
                </div>
            </div>
        </article>
    );
};

export default CardSummary;
















// const CardSummary = () => {
//    return <div className="card-contenedor">
//        <div className="card-elementos">
//            <div className="card-titulo">//
//                <h2>Resumen de Cuenta</h2>
//            </div>
//            <div className="card-valor">
//                <p>Saldo: $0</p>
//            </div>
//            <div className="card-descripcion">
//                <p>Descripción: </p>
//            </div>
//            <div className="card-estado">
//                <p>Estado: </p>
//            </div>
//        </div>
//    </div>;
//};
//export default CardSummary;