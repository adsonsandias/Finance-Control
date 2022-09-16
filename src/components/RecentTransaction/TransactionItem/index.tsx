import { ReactComponent as IconCart } from "../../../assets/shopping-cart.svg";
import { Container } from "./styles";

interface ICATEGORY {
  category: string;
  type: string;
}

export function TransactionItem({ ...props }: ICATEGORY) {
  const { category, type } = props;

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
