import React from "react";

import { AuthContext } from "../../contexts/AuthContext";
import { Loading } from "../Loading";
import { MonthTransaction } from "./MonthTransaction";
import {
  RecentTransactionItemStyles,
  MonthTransactionItemStyles,
} from "./styles";
import { TransactionItem } from "./TransactionItem";

export function RecentTransaction() {
  const { getCloudFirestore, userCollection, loading, setLoading } =
    React.useContext(AuthContext);

  React.useEffect(() => {
    async function getCloudFirestoreData() {
      setLoading(true);
      await getCloudFirestore();
      setLoading(false);
    }
    getCloudFirestoreData();
  }, []);

  if (loading) return <Loading />;
  return (
    <>
      <RecentTransactionItemStyles>
        <h1>Recentes Transações</h1>
        {userCollection &&
          userCollection.map(
            ({ id, title, type, amount, category, createdAt }) => (
              <TransactionItem
                key={id}
                title={title}
                type={type}
                category={category}
                value={
                  amount &&
                  new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(amount)
                }
                date={
                  createdAt &&
                  new Intl.DateTimeFormat("pt-BR").format(
                    new Date(createdAt.toDate().toString())
                  )
                }
              />
            )
          )}
      </RecentTransactionItemStyles>
      <MonthTransactionItemStyles>
        <MonthTransaction />
      </MonthTransactionItemStyles>
    </>
  );
}
