import { Player } from "@lottiefiles/react-lottie-player";
import { Link } from "react-router-dom";

import { ReactComponent as ArrowIcon } from "../../../../assets/arrow-icon.svg";
import { Context, ContainerAnimation } from "./styles";

export function LoginDetails() {
  return (
    <Context>
      <header>
        <nav aria-label="Navigate to Help Details">
          <ul>
            <li>
              <Link to="/user">
                <ArrowIcon />
                <span>Login detalhes</span>
              </Link>
            </li>
          </ul>
        </nav>
        <h2>Detalhes de Login</h2>
      </header>
      <ContainerAnimation>
        <Player
          autoplay
          loop
          src="https://assets3.lottiefiles.com/packages/lf20_w1fl6e19.json"
          style={{ height: "300px", width: "300px" }}
        />
        <p>Estamos nos esforçando para terminar essa página.</p>
      </ContainerAnimation>
    </Context>
  );
}
