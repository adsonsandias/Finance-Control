import { Player } from "@lottiefiles/react-lottie-player";
import { Link } from "react-router-dom";

import { ReactComponent as ArrowIcon } from "../../../../assets/arrow-icon.svg";
import { ContainerAnimation, Context } from "./styles";

export function HelpDetails() {
  return (
    <Context>
      <header>
        <nav aria-label="Navigate to Help Details">
          <ul>
            <li>
              <Link to="/user">
                <ArrowIcon />
                <span>Help</span>
              </Link>
            </li>
          </ul>
        </nav>
        <h2>Detalhes de Ajuda</h2>
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
