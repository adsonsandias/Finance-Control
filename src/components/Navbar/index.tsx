import { IconCalc, IconHomer, IconUser } from "./Icons";
import { Container } from "./styles";

export function Navbar() {
  return (
    <Container>
      <ul>
        <li>
          <a href="#homer">
            <IconHomer />
          </a>
        </li>
        <li>
          <a href="#trasation">
            <IconCalc />
          </a>
        </li>
        <li>
          <a href="#user">
            <IconUser />
          </a>
        </li>
      </ul>
    </Container>
  );
}
