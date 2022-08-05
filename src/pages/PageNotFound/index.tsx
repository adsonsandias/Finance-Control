import { Link } from "react-router-dom";

import { ReactComponent as CatIcon } from "../../assets/cat.svg";
import { Container } from "./styles";

export function PageNotFound() {
  return (
    <Container>
      <h1 data-glitch="OOPS!">OOPS!</h1>
      <CatIcon />
      <div>
        <p>Não conseguimos encontrar a página que você está buscando.</p>
        <p>Código de erro: 404</p>
        <Link to="/">Início</Link>
        <Link to="/login">Login</Link>
      </div>
    </Container>
  );
}
