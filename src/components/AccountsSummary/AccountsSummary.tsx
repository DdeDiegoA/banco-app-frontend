import { useState } from "react";
import AccountCard from "../AccountCard/AccountCard";
import type { Account } from "../../types/user.types";

type Props = {
    accounts: Account[];
};

const AccountsSummary = ({ accounts }: Props) => {
    const [isBalanceVisible, setIsBalanceVisible] = useState(true);

    const onToggleBalances = () => {
        setIsBalanceVisible((prevState) => !prevState);
    };

    return (
        <div className="accounts-summary">
            <div className="dashboard-page__section-header">
                <h2 id="accounts-title" className="dashboard-page__title">
                    Resumen de Cuentas
                </h2>
                <button
                    className="salute__btn"
                    aria-label={
                        isBalanceVisible ? "Ocultar saldos" : "Mostrar saldos"
                    }
                    onClick={onToggleBalances}
                >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden
                    >
                        {isBalanceVisible ? (
                            <>
                                <path
                                    d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"
                                    stroke="currentColor"
                                    strokeWidth="1.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="3"
                                    stroke="currentColor"
                                    strokeWidth="1.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </>
                        ) : (
                            <>
                                <path
                                    d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-6 0-10-7-10-7a10.07 10.07 0 0 1 3.06-5.06M9.9 4.24A9.98 9.98 0 0 1 12 4c6 0 10 7 10 7a9.98 9.98 0 0 1-2.06 4.06M1 1l22 22"
                                    stroke="currentColor"
                                    strokeWidth="1.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </>
                        )}
                    </svg>
                </button>
            </div>

            <div className="accounts__grid">
                {accounts.map((acct) => (
                    <AccountCard
                        key={acct.id}
                        type={acct.type}
                        number={acct.accountNumber}
                        balance={acct.balanceCents}
                        isBalanceVisible={isBalanceVisible}
                    />
                ))}
            </div>
        </div>
    );
};

export default AccountsSummary;
