import React from "react";
import "./TransactionCard.css";
import type { LedgerEntry } from "../../types/user.types";
import {
    adjustAccountNumber,
    transactionAccount,
} from "../../utils/transactionAccounts";
import { formatDate } from "../../utils/formatCreatedAt";
import { formatCurrencyCop } from "../../utils/formatCurrency";

type TransactionCardProps = {
    ledgerEntry: LedgerEntry;
};

const TransactionCard: React.FC<TransactionCardProps> = ({ ledgerEntry }) => {
    const { createdAt, amountCents, transaction, type } = ledgerEntry;
    return (
        <article
            className="transaction-card"
            role="article"
            aria-label={transactionAccount(type, transaction)}
        >
            <div className="transaction-card__content">
                <div className="transaction-card__title">
                    {transactionAccount(type, transaction)}
                </div>
                <div className="transaction-card__account">
                    {adjustAccountNumber(
                        type === "DEBIT"
                            ? transaction.toAccount.accountNumber
                            : transaction.fromAccount.accountNumber
                    )}
                </div>
                <div className="transaction-card__date">
                    {formatDate(createdAt)}
                </div>
            </div>

            <div className="transaction-card__meta">
                <div
                    className={`transaction-card__amount ${
                        type === "DEBIT"
                            ? "transaction-card__amount--positive"
                            : "transaction-card__amount--negative"
                    }`}
                >
                    {formatCurrencyCop(parseInt(amountCents) / 100)}
                </div>
                <div
                    className={`transaction-card__status transaction-card__status--${
                        transaction.status === "COMPLETED"
                            ? "success"
                            : transaction.status === "PENDING"
                            ? "warning"
                            : "danger"
                    }`}
                >
                    <span
                        className="transaction-card__status-dot"
                        aria-hidden
                    />
                    {transaction.status}
                </div>
            </div>
        </article>
    );
};

export default TransactionCard;
