import React from "react";
import "./AccountCard.css";
import { AccountType, type Account } from "../../types/user.types";
import { formatCurrencyCop } from "../../utils/formatCurrency";
import { adjustAccountNumber } from "../../utils/transactionAccounts";

type Props = {
    type: Account["type"];
    number?: Account["accountNumber"];
    balance: Account["balanceCents"];
    isBalanceVisible?: boolean;
};

const AccountCard: React.FC<Props> = ({
    type,
    number,
    balance,
    isBalanceVisible = true,
}) => {
    const balanceNumber = parseInt(balance) / 100;

    return (
        <article className="account-card" role="group" aria-label={type}>
            <header className="account-card__header">
                <h3 className="account-card__title">
                    Cuenta {AccountType[type]}
                </h3>
                <span
                    className={`account-card__balance ${
                        parseInt(balance) > 0
                            ? "account-card__balance--positive"
                            : "account-card__balance--negative"
                    }`}
                >
                    {isBalanceVisible
                        ? formatCurrencyCop(balanceNumber)
                        : "••••••"}
                </span>
            </header>

            <div className="account-card__body">
                <div className="account-card__number" aria-hidden>
                    {number && adjustAccountNumber(number)}
                </div>
                {/* {meta && <div className="account-card__meta">{meta}</div>} */}
            </div>
        </article>
    );
};

export default AccountCard;
