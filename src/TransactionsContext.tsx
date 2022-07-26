/* eslint-disable react/jsx-no-constructed-context-values */
import React from "react";

import { api } from "./services/api";

interface ITRANSACTIONS {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

type ITRANSACTIONINPUT = Omit<ITRANSACTIONS, "id" | "createdAt">;

interface ITRANSACTIONSPROVIDERPROPS {
  children: React.ReactNode;
}

interface ITRANSACTIONSCONTEXTDATA {
  transactions: ITRANSACTIONS[];
  createTransaction: (transaction: ITRANSACTIONINPUT) => void;
}

export const TransactionsContext =
  React.createContext<ITRANSACTIONSCONTEXTDATA>({} as ITRANSACTIONSCONTEXTDATA);

export function TransactionsProvider({ children }: ITRANSACTIONSPROVIDERPROPS) {
  const [transactions, setTransactions] = React.useState<ITRANSACTIONS[]>([]);

  React.useEffect(() => {
    api
      .get("transactions")
      .then((response) => setTransactions(response.data.transactions));
  }, []);

  function createTransaction(transaction: ITRANSACTIONINPUT) {
    api.post("/transactions", transaction);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}
