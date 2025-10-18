import React from "react";
import "./RechargePage.css";
import { Link } from "react-router-dom";
import RechargeForm from "../../components/TransactionsForm/RechargeForm/RechargeForm";

const RechargePage: React.FC = () => {
    return (
        <div className="recharge-page">
            <header className="recharge-page__header">
                <Link
                    to="/transactions"
                    className="recharge-page__back"
                    aria-label="Volver"
                >
                    ←
                </Link>
                <h1 className="recharge-page__title">Recargar Celular</h1>
            </header>

            <main className="recharge-page__main">
                <RechargeForm />
            </main>
        </div>
    );
};

export default RechargePage;
