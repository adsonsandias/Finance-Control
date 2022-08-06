/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import { AuthContext } from "../../contexts/AuthContext";
import { Container, MobileTitle } from "./styles";

export function TransactionsTable() {
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

  if (loading) return <>Carregando</>;
  return (
    <Container>
      <MobileTitle>
        <h1>Transactions</h1>
        <span>{userCollection.length} itens</span>
      </MobileTitle>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {userCollection &&
            userCollection.map(
              ({ id, title, type, amount, category, createdAt }: any) => (
                <tr key={id}>
                  <td>{title}</td>
                  <td className={type}>
                    {amount &&
                      new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(amount)}
                  </td>
                  <td>{category}</td>
                  <td>
                    {createdAt &&
                      new Intl.DateTimeFormat("pt-BR").format(
                        new Date(createdAt.toDate().toString())
                      )}
                  </td>
                </tr>
              )
            )}
        </tbody>
      </table>
    </Container>
  );
}
