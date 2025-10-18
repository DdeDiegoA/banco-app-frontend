export interface Client {
    id: string;
    name: string;
    email: string;
    address: string;
    phone: string;
}

export interface Account {
    id: string;
    type: "CHECKING" | "SAVINGS";
    balanceCents: string;
    accountNumber: string;
}

export interface Transaction {
    id: string;
    amountCents: string;
    status: "COMPLETED" | "PENDING" | "FAILED";
    fromAccount: {
        accountNumber: string;
        type: "CHECKING" | "SAVINGS";
    };
    toAccount: {
        accountNumber: string;
        type: "CHECKING" | "SAVINGS";
    };
    createdAt: string;
}

export interface LedgerEntry {
    id: string;
    type: "DEBIT" | "CREDIT";
    amountCents: string;
    createdAt: string;
    transaction: {
        fromAccount: {
            accountNumber: string;
        };
        toAccount: {
            accountNumber: string;
        };
        status: "COMPLETED" | "PENDING" | "FAILED";
    };
}

export interface UserData {
    client?: Client;
    accounts: Account[];
    transactions: Transaction[];
    ledgerEntries: LedgerEntry[];
}

export const AccountType = {
    CHECKING: "Corriente",
    SAVINGS: "Ahorros",
} as const;
