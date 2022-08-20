/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import React from "react";

import { AuthContext } from "../../contexts/AuthContext";
import { container, item } from "../Helps/FrameMotion";
import { Loading } from "../Loading";
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

  if (loading) return <Loading />;
  return (
    <Container
      className="container"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <MobileTitle>
        <h1>Transactions</h1>
        <span>{userCollection.length} itens</span>
      </MobileTitle>
      <table>
        <motion.thead variants={item}>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </motion.thead>
        <tbody>
          {userCollection &&
            userCollection.map(
              ({ id, title, type, amount, category, createdAt }: any) => (
                <motion.tr variants={item} key={id}>
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
                </motion.tr>
              )
            )}
        </tbody>
      </table>
    </Container>
  );
}
