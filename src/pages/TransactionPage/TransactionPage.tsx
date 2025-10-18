import React from "react";
import "./TransactionsPage.css";
import TransactionOptionCard from "../../components/TransactionOptionCard/TransactionOptionCard";

/**
 * Transactions landing page - shows options and links to internal pages.
 * Use your router (react-router-dom) to navigate. Cards use <a href> so they work without router too.
 */

const TransactionsPage: React.FC = () => {
    return (
        <div className="transactions-page">
            <header className="transactions-page__header">
                <h1 className="transactions-page__title">Transacciones</h1>
                <p className="transactions-page__subtitle">
                    Selecciona el tipo de operación que deseas realizar
                </p>
            </header>

            <main className="transactions-page__main">
                <div className="transactions-page__grid" role="list">
                    <TransactionOptionCard
                        role="listitem"
                        to="/transactions/transfer"
                        icon="transfer"
                        title="Transferir Dinero"
                        description="Envía dinero a otras cuentas"
                    />

                    <TransactionOptionCard
                        to="/transactions/pay"
                        icon="pay"
                        title="Realizar Pago"
                        description="Paga servicios y facturas"
                    />

                    <TransactionOptionCard
                        to="/transactions/recharge"
                        icon="recharge"
                        title="Recargar Celular"
                        description="Recarga saldo a tu celular"
                    />
                </div>
            </main>
        </div>
    );
};

export default TransactionsPage;
