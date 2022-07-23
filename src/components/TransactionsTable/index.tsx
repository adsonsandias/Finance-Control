import React from "react";

import { api } from "../../services/api";
import { Container } from "./styles";

export function TransactionsTable() {
  React.useEffect(() => {
    api.get("transactions").then((response) => console.log(response.data));
  }, []);

  return (
    <Container>
      <div>
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
            <tr>
              <td className="title">Google Developer App</td>
              <td className="deposit">R$13.650</td>
              <td>Buiness</td>
              <td>15/03/2022</td>
            </tr>
            <tr>
              <td>JAL Auto Peça S/A</td>
              <td className="withdraw">- R$650</td>
              <td>Carro</td>
              <td>15/03/2022</td>
            </tr>
            <tr>
              <td>Desenvolvimento de site</td>
              <td className="deposit">R$5.850</td>
              <td>Desenvolvimento</td>
              <td>15/03/2022</td>
            </tr>
            <tr>
              <td>Alugue</td>
              <td className="withdraw">- R$1.650</td>
              <td>Casa</td>
              <td>15/03/2022</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Container>
  );
}
