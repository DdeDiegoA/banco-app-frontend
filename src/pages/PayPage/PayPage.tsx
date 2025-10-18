import React from "react";
import "./PayPage.css";
import { Link } from "react-router-dom";
import PayForm from "../../components/TransactionsForm/PayForm/PayForm";

const PayPage: React.FC = () => {
    return (
        <div className="pay-page">
            <header className="pay-page__header">
                <Link
                    to="/transactions"
                    className="pay-page__back"
                    aria-label="Volver"
                >
                    ←
                </Link>
                <h1 className="pay-page__title">Realizar Pago</h1>
            </header>

            <main className="pay-page__main">
                <PayForm />
            </main>
        </div>
    );
};

export default PayPage;
