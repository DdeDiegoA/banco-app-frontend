export type AccountDTO = {
    id: string;
    accountNumber: string;
    type: string;
    balanceCents: string; // string en la API
};

export type LedgerEntryDTO = {
    id: string;
    transaction: {
        id: string;
        fromAccount: AccountDTO;
        toAccount: AccountDTO;
        amountCents: string;
        status: string;
        createdAt: string;
    };
    account: AccountDTO;
    type: "DEBIT" | "CREDIT";
    amountCents: string;
    createdAt: string;
};

export type TransferResponseDTO = {
    id: string;
    fromAccount: AccountDTO;
    toAccount: AccountDTO;
    amountCents: string;
    status: string;
    ledgerEntries: LedgerEntryDTO[];
    createdAt: string;
};

/* Normalized types used in frontend */
export type Account = {
    id: string;
    accountNumber: string;
    type: string;
    balanceCents: number;
};

export type LedgerEntry = {
    id: string;
    transactionId: string;
    account: Account;
    type: "DEBIT" | "CREDIT";
    amountCents: number;
    createdAt: string;
};

export type TransferResult = {
    id: string;
    fromAccount: Account;
    toAccount: Account;
    amountCents: number;
    status: string;
    ledgerEntries: LedgerEntry[];
    createdAt: string;
};

export type TransferInput = {
    fromAccountNumber: string;
    toAccountNumber: string;
    amount: number; // decimal e.g. 10.50
};
