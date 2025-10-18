import React from "react";
import "./AccountsPage.css";
import AccountsSummary from "../../components/AccountsSummary/AccountsSummary";
import { useUserStore } from "../../stores/useUserStore";

const AccountsPage: React.FC = () => {
    const {
        userData: { accounts },
    } = useUserStore();

    return (
        <div className="accounts-page">
            <main className="accounts-page__main" role="main">
                <section
                    className="accounts-page__section accounts-page__section--accounts"
                    aria-labelledby="mis-cuentas-title"
                >
                    <div className="accounts-page__section-head">
                        <h1
                            id="mis-cuentas-title"
                            className="accounts-page__title"
                        >
                            Mis Cuentas
                        </h1>
                    </div>

                    <AccountsSummary accounts={accounts} />
                </section>
            </main>
        </div>
    );
};

export default AccountsPage;
