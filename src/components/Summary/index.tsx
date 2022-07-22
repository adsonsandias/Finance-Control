import iconTotal from "../../assets/dolar.svg";
import iconEntries from "../../assets/entrar.svg";
import iconOutputs from "../../assets/saida.svg";
import { Container } from "./styles";

export function Summary() {
  return (
    <Container>
      <div>
        <div>
          <header>
            <p>Entradas</p>
            <img src={iconEntries} alt="Entradas de valores" />
          </header>
          <strong>
            R$ <span>4900,</span>00
          </strong>
        </div>
      </div>
      <div>
        <div>
          <header>
            <p>Saidas</p>
            <img src={iconOutputs} alt="Saida de valor" />
          </header>
          <strong>
            - R$ <span>900,</span>00
          </strong>
        </div>
      </div>
      <div>
        <div>
          <header>
            <p>Total</p>
            <img src={iconTotal} alt="Valor Total" />
          </header>
          <strong>
            R$ <span>42900,</span>00
          </strong>
        </div>
      </div>
    </Container>
  );
}
