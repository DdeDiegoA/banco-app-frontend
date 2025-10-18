import React from "react";
import "./DashboardPage.css";

import TransactionsList from "../../components/TransactionsList/TransactionsList";
import Salute from "../../components/Salute/Salute";
import QuickActions from "../../components/QuickActions/QuickActions";
import AccountsSummary from "../../components/AccountsSummary/AccountsSummary";
import { useUserStore } from "../../stores/useUserStore";
import { Link } from "react-router-dom";

/**
 * DashboardPage - Página principal del dashboard
 * - Estructura semántica: header, main, aside
 * - BEM: .dashboard-page, .dashboard-page__section, etc.
 */

const DashboardPage: React.FC = () => {
    const { userData } = useUserStore();
    const lastTransactions = userData?.ledgerEntries.slice(0, 5);

    if (!userData) {
        return <div>loading</div>;
    }

    return (
        <div className="dashboard-page">
            <header className="dashboard-page__header">
                {userData.client && <Salute client={userData.client} />}
            </header>

            <main className="dashboard-page__main">
                <section
                    className="dashboard-page__section dashboard-page__accounts"
                    aria-labelledby="accounts-title"
                >
                    <AccountsSummary accounts={userData.accounts} />

                    <h3 className="dashboard-page__subtitle">
                        Accesos Rápidos
                    </h3>
                    <QuickActions />
                </section>

                <aside
                    className="dashboard-page__aside"
                    aria-labelledby="transactions-title"
                >
                    <div className="dashboard-page__aside-header">
                        <h2
                            id="transactions-title"
                            className="dashboard-page__title"
                        >
                            Últimas Transacciones
                        </h2>
                        <Link className="dashboard-page__link" to="/movements">
                            Ver todas
                        </Link>
                    </div>

                    <TransactionsList transactions={lastTransactions} />
                </aside>
            </main>
        </div>
    );
};

export default DashboardPage;
