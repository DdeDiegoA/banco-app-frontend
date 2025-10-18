import React from "react";
import "./SummaryCards.css";

type Props = { incomes: number; expenses: number };

const formatCurrency = (v: number) => {
    // Uses locale es-CO for thousands separator; adjust if needed
    return new Intl.NumberFormat("es-CO").format(Math.abs(v));
};

const SummaryCards: React.FC<Props> = ({ incomes, expenses }) => {
    return (
        <div className="summary-cards" aria-hidden>
            <div className="summary-cards__item summary-cards__item--incomes">
                <div className="summary-cards__label">Ingresos</div>
                <div className="summary-cards__value">
                    {" "}
                    ${formatCurrency(incomes)}
                </div>
            </div>

            <div className="summary-cards__item summary-cards__item--expenses">
                <div className="summary-cards__label">Gastos</div>
                <div className="summary-cards__value">
                    {" "}
                    ${formatCurrency(expenses)}
                </div>
            </div>
        </div>
    );
};

export default SummaryCards;
