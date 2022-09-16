import { ReactComponent as IconCart } from "../../../assets/shopping-cart.svg";
import { Container } from "./styles";

export function TransactionItem() {
  return (
    <Container>
      <div>
        <IconCart />
        <strong>Desenvolvimento de site</strong>
        <span>13/04/2021</span>
      </div>
      <div>
        <span>Venda</span>
        <span>R$ 12.000,00</span>
      </div>
    </Container>
  );
}
