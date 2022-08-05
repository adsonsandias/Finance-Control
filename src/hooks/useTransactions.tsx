export {};

/* eslint-disable react/jsx-no-constructed-context-values */
// import React from "react";

// import { api } from "../services/api";

// interface ITRANSACTION {
//   id: number;
//   title: string;
//   amount: number;
//   type: string;
//   category: string;
//   createdAt: string;
// }

// type ITRANSACTIONINPUT = Omit<ITRANSACTION, "id" | "createdAt">;

// interface ITRANSACTIONSPROVIDERPROPS {
//   children: React.ReactNode;
// }

// interface IDISPATCH {
//   dispatch: true | false;
//   setDispatch: () => void;
// }

// interface ITRANSACTIONSCONTEXTDATA {
//   transactions: ITRANSACTION[];
//   dispatch: IDISPATCH["dispatch"];

//   setDispatch: (dispatch: IDISPATCH["dispatch"]) => void;
//   createTransaction: (transaction: ITRANSACTIONINPUT) => Promise<void>;
// }

// const TransactionsContext = React.createContext<ITRANSACTIONSCONTEXTDATA>(
//   {} as ITRANSACTIONSCONTEXTDATA
// );

// export function TransactionsProvider({ children }: ITRANSACTIONSPROVIDERPROPS) {
//   const [transactions, setTransactions] = React.useState<ITRANSACTION[]>([]);
//   const [dispatch, setDispatch] = React.useState<IDISPATCH["dispatch"]>(false);

//   React.useEffect(() => {
//     api
//       .get("transactions")
//       .then((response) => setTransactions(response.data.transactions));
//   }, [dispatch]);

//   async function createTransaction(transactionInput: ITRANSACTIONINPUT) {
//     const response = await api.post("/transactions", {
//       ...transactionInput,
//       createdAt: new Date(),
//     });
//     const { transaction } = response.data;
//     setTransactions([...transactions, transaction]);
//   }

//   return (
//     <TransactionsContext.Provider
//       value={{ transactions, createTransaction, dispatch, setDispatch }}
//     >
//       {children}
//     </TransactionsContext.Provider>
//   );
// }

// export function useTransactions() {
//   const context = React.useContext(TransactionsContext);

//   return context;
// }
