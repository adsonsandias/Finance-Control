import React from "react";

import iconTotal from "../../assets/dolar.svg";
import fotoUser from "../../assets/new-user.png";
import { AuthContext } from "../../contexts/AuthContext";
import { CardTotal, NewCategory, UserInfo, UserSection } from "./styles";

export function UserProfile() {
  const { userCollection } = React.useContext(AuthContext);
  const [dados, setDados] = React.useState({
    deposit: 0,
    withdraw: 0,
    total: 0,
  });

  React.useEffect(() => {
    const summary = userCollection.reduce(
      (acc, transaction) => {
        if (transaction.type === "deposit") {
          acc.deposit += transaction.amount;
          acc.total += transaction.amount;
        } else if (transaction.type === "withdraw") {
          acc.withdraw += transaction.amount;
          acc.total -= transaction.amount;
        } else {
          return acc;
        }

        return acc;
      },
      {
        deposit: 0,
        withdraw: 0,
        total: 0,
      }
    );

    setDados({
      deposit: summary.deposit,
      withdraw: summary.withdraw,
      total: summary.total,
    });
  }, [userCollection]);
  const { signOut, user } = React.useContext(AuthContext);
  const userLogado = JSON.parse(user as string);

  return (
    <UserSection>
      <div>
        <UserInfo>
          {userLogado.photoURL ? (
            <img src={userLogado.photoURL} alt="Perfil de usúario" />
          ) : (
            <img src={fotoUser} alt="Perfil de usúario" />
          )}
          <div>
            <div>
              <h1>
                {userLogado.displayName
                  ? userLogado.displayName
                  : userLogado.email}
              </h1>
              <span>{userLogado.email && userLogado.email}</span>
            </div>
            <button type="button" onClick={signOut}>
              sair
            </button>
          </div>
        </UserInfo>
        <CardTotal>
          <div>
            <div>
              <header>
                <p>Total</p>
                <img src={iconTotal} alt="Valor Total" />
              </header>
              <strong>
                {dados &&
                  new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(dados?.total)}
              </strong>
              <span>Última entrada dia 13 de abril</span>
            </div>
          </div>
        </CardTotal>
      </div>
      <NewCategory>
        <h1>Novas Categorias</h1>
        <ul>
          <li>
            <p>Vendas</p>
            <p>13/04/2022</p>
          </li>
          <li>
            <p>Vendas</p>
            <p>13/04/2022</p>
          </li>
          <li>
            <p>Vendas</p>
            <p>13/04/2022</p>
          </li>
          <li>
            <p>Vendas</p>
            <p>13/04/2022</p>
          </li>
          <li>
            <p>Vendas</p>
            <p>13/04/2022</p>
          </li>
        </ul>
      </NewCategory>
    </UserSection>
  );
}
