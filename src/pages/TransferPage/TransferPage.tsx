import React from "react";
import "./TransferPage.css";
import { Link } from "react-router-dom";
import TransferForm from "../../components/TransactionsForm/TransferForm/TransferForm";

const TransferPage: React.FC = () => {
    return (
        <div className="transfer-page">
            <header className="transfer-page__header">
                <Link
                    to="/transactions"
                    className="transfer-page__back"
                    aria-label="Volver"
                >
                    ←
                </Link>
                <h1 className="transfer-page__title">Transferir Dinero</h1>
            </header>

            <main className="transfer-page__main">
                <TransferForm />
            </main>
        </div>
    );
};

export default TransferPage;
