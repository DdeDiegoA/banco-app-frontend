const CardSummary = () => {
    return <div className="card-contenedor">
        <div className="card-elementos">
            <div className="card-titulo">
                <h2>Resumen de Cuenta</h2>
            </div>
            <div className="card-valor">
                <p>Saldo: $0</p>
            </div>
            <div className="card-descripcion">
                <p>Descripción: </p>
            </div> 
            <div className="card-estado">
                <p>Estado: </p>
            </div> 
        </div>
    </div>;
};

export default CardSummary;