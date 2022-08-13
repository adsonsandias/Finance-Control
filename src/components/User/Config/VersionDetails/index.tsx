import { Link } from "react-router-dom";

import { ReactComponent as ArrowIcon } from "../../../../assets/arrow-icon.svg";
import DeveloperAdsonSantos from "../../../../assets/dev-adson-santos.png";
import { ReactComponent as GithubIcon } from "../../../../assets/github-icon.svg";
import { ReactComponent as InstagramIcon } from "../../../../assets/instagram-icon.svg";
import { ReactComponent as LinkedinIcon } from "../../../../assets/linkedin-icon.svg";
import { Context, DeveloperInfor } from "./styles";

export function VersionDetails() {
  return (
    <Context>
      <header>
        <nav aria-label="Navigate to Help Details">
          <ul>
            <li>
              <Link to="/user">
                <ArrowIcon />
                <span>Versão do App</span>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <DeveloperInfor>
        <div>
          <h1>Beta 1.3.0</h1>
          <span>Developer Version</span>
        </div>
        <div>
          <h2>Sobre o Desenvolverdor e UI/UX Design</h2>
          <img src={DeveloperAdsonSantos} alt="" />
          <strong>Adson Santos</strong>
          <span>adsonbmx15@gmail.com</span>
          <ul>
            <li>
              <a
                target="_blank"
                href="https://www.instagram.com/adson.san.dev/"
                rel="noreferrer"
              >
                <InstagramIcon />
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://www.linkedin.com/in/adson-santos-front-end/"
                rel="noreferrer"
              >
                <LinkedinIcon />
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://github.com/adsonsandias"
                rel="noreferrer"
              >
                <GithubIcon />
              </a>
            </li>
          </ul>
        </div>
      </DeveloperInfor>
    </Context>
  );
}
