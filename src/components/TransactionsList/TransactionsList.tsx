import React from "react";
import "./TransactionsList.css";
import type { LedgerEntry } from "../../types/user.types";
import { formatCurrencyCop } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatCreatedAt";
import { transactionAccount } from "../../utils/transactionAccounts";

type TransactionItemProps = {
    tsItem: LedgerEntry;
};

const TransactionItem = ({ tsItem }: TransactionItemProps) => {
    const { type, amountCents, createdAt, transaction } = tsItem;

    const amountNumber = parseInt(amountCents) / 100;

    return (
        <li className="transactions__item" role="listitem">
            <div className="transactions__meta">
                <div className="transactions__title">
                    {transactionAccount(type, transaction)}
                </div>
                <div className="transactions__date">
                    {formatDate(createdAt)}
                </div>
            </div>
            <div
                className={`transactions__amount ${
                    type === "DEBIT"
                        ? "transactions__amount--positive"
                        : "transactions__amount--negative"
                }`}
            >
                {formatCurrencyCop(amountNumber)}
            </div>
        </li>
    );
};

const TransactionsList: React.FC<{ transactions: LedgerEntry[] }> = ({
    transactions,
}) => {
    return (
        <section
            className="transactions"
            aria-labelledby="transactions-heading"
        >
            <ul
                className="transactions__list"
                role="list"
                id="transactions-heading"
            >
                {transactions.map((ledgerEntry) => (
                    <TransactionItem
                        key={ledgerEntry.id}
                        tsItem={ledgerEntry}
                    />
                ))}
            </ul>
        </section>
    );
};

export default TransactionsList;
