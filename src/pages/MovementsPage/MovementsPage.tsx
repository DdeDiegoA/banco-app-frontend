/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useState } from "react";
import "./MovementsPage.css";

import Select from "../../components/Select/Select";
import SummaryCards from "../../components/SummaryCards/SummaryCars";
import TransactionCard from "../../components/TransactionCard/TransactionCard";
import { useUserStore } from "../../stores/useUserStore";
import type { LedgerEntry } from "../../types/user.types";
import { useGetMoves } from "../../hooks/useTransfer";

const MovementsPage: React.FC = () => {
    const { mutate: getMoves } = useGetMoves();
    const {
        userData: { ledgerEntries },
    } = useUserStore();

    useEffect(() => {
        getMoves();
    }, []);

    const [typeFilter, setTypeFilter] = useState<"all" | LedgerEntry["type"]>(
        "all"
    );
    const [periodFilter, setPeriodFilter] = useState<
        "week" | "month" | "quarter" | "year"
    >("month");

    /* Period helpers */
    const now = useMemo(() => new Date("2024-09-25"), []);
    const startOfPeriod = useMemo(() => {
        const d = new Date(now);
        switch (periodFilter) {
            case "week": {
                const day = d.getDay(); // 0..6 (Sun..Sat)
                const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday as start
                const start = new Date(d.setDate(diff));
                start.setHours(0, 0, 0, 0);
                return start;
            }
            case "month": {
                return new Date(d.getFullYear(), d.getMonth(), 1);
            }
            case "quarter": {
                const q = Math.floor(d.getMonth() / 3);
                return new Date(d.getFullYear(), q * 3, 1);
            }
            case "year": {
                return new Date(d.getFullYear(), 0, 1);
            }
            default:
                return new Date(0);
        }
    }, [periodFilter, now]);

    /* --- filtered & sorted --- */
    const filtered = useMemo(() => {
        // defensive parse for amount cents
        const parseAmount = (entry: LedgerEntry) => {
            const n = Number(entry.amountCents);
            // if amountCents stored as string or numeric string, fallback to 0
            return Number.isFinite(n) ? n : 0;
        };

        // Filter by period and by type (if not "all")
        const items = (ledgerEntries || []).filter((t) => {
            const txDate = new Date(t.createdAt);
            if (txDate < startOfPeriod) return false;

            if (typeFilter !== "all") {
                // keep only entries that match the selected type
                return t.type === typeFilter;
            }
            return true;
        });

        // Sort: if a specific type is selected, sort by amount desc (largest first),
        // otherwise sort by date desc.
        items.sort((a, b) => {
            if (typeFilter === "all") {
                return +new Date(b.createdAt) - +new Date(a.createdAt);
            }

            const amtA = parseAmount(a);
            const amtB = parseAmount(b);

            // sort by absolute cents descending (largest magnitude first)
            if (amtB !== amtA) return amtB - amtA;

            // tie-breaker: newest first
            return +new Date(b.createdAt) - +new Date(a.createdAt);
        });

        return items;
    }, [ledgerEntries, startOfPeriod, typeFilter]);

    const totals = useMemo(() => {
        const incomes = filtered
            .filter((t) => t.type === "DEBIT")
            .reduce((s, t) => s + (Number(t.amountCents) || 0) / 100, 0);
        const expenses = filtered
            .filter((t) => t.type === "CREDIT")
            .reduce((s, t) => s + (Number(t.amountCents) || 0) / 100, 0);
        return { incomes, expenses };
    }, [filtered]);

    return (
        <div className="movements-page">
            <header className="movements-page__header" role="banner">
                <h1 className="movements-page__title">Movimientos</h1>
            </header>

            <main className="movements-page__main">
                <section
                    className="movements-page__filters"
                    aria-label="Filtros de movimientos"
                >
                    <div className="movements-page__controls">
                        <Select
                            id="type-select"
                            value={typeFilter}
                            onChange={(v) => setTypeFilter(v as any)}
                            options={[
                                { value: "all", label: "Todos" },
                                // CORRECCIÓN: DEBIT = Egresos, CREDIT = Ingresos
                                { value: "DEBIT", label: "Ingresos" },
                                { value: "CREDIT", label: "Egresos" },
                            ]}
                        />

                        <Select
                            id="period-select"
                            value={periodFilter}
                            onChange={(v) => setPeriodFilter(v as any)}
                            options={[
                                { value: "week", label: "Esta semana" },
                                { value: "month", label: "Este mes" },
                                { value: "quarter", label: "Este trimestre" },
                                { value: "year", label: "Este año" },
                            ]}
                        />
                    </div>

                    <SummaryCards
                        incomes={totals.incomes}
                        expenses={totals.expenses}
                    />
                </section>

                <section
                    className="movements-page__history"
                    aria-labelledby="history-heading"
                >
                    <div className="movements-page__history-header">
                        <h2
                            id="history-heading"
                            className="movements-page__subtitle"
                        >
                            Historial ({filtered.length} movimientos)
                        </h2>
                    </div>

                    <ul className="movements-page__list" role="list">
                        {filtered.map((t) => (
                            <li key={t.id}>
                                <TransactionCard ledgerEntry={t} />
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        </div>
    );
};

export default MovementsPage;
