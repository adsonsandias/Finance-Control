import logoImg from "../../assets/logo.svg";
import fotoUser from "../../assets/user.png";
import { Container, Content, Logo, User } from "./styles";

export function Header() {
  return (
    <Container>
      <Content>
        <Logo>
          <img src={logoImg} alt="Finance Control" />
          <div>
            <span>Finance</span>
            <span>Control</span>
          </div>
        </Logo>
        <User>
          <div>
            <span>Adson Santos</span>
            <a href="https://google.com">sair</a>
          </div>
          <img src={fotoUser} alt="Perfil de usúario" />
        </User>
      </Content>
    </Container>
  );
}
