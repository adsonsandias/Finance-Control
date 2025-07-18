import React, { createContext, useContext } from "react";
import {
  useTransactions,
  IUseTransactionsReturn,
} from "../../application/hooks/useTransactions";
import { dependencyContainer } from "../../shared/utils/DependencyContainer";

interface ITransactionProviderProps {
  children: React.ReactNode;
}

const TransactionContext = createContext<IUseTransactionsReturn | undefined>(
  undefined
);

function TransactionProvider({ children }: ITransactionProviderProps) {
  const { transactionService } = dependencyContainer;
  const transactionHook = useTransactions(transactionService);

  return (
    <TransactionContext.Provider value={transactionHook}>
      {children}
    </TransactionContext.Provider>
  );
}

export const useTransactionContext = (): IUseTransactionsReturn => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error(
      "useTransactionContext must be used within a TransactionProvider"
    );
  }
  return context;
};

export { TransactionProvider };
