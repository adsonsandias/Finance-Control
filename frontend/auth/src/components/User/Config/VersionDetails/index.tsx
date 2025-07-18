import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { ReactComponent as ArrowIcon } from "../../../../assets/arrow-icon.svg";
import DeveloperAdsonSantos from "../../../../assets/dev-adson-santos.png";
import { ReactComponent as GithubIcon } from "../../../../assets/github-icon.svg";
import { ReactComponent as InstagramIcon } from "../../../../assets/instagram-icon.svg";
import { ReactComponent as LinkedinIcon } from "../../../../assets/linkedin-icon.svg";
import { containerLeft, item } from "../../../Helps/FrameMotion";
import { Context, DeveloperInfor } from "./styles";

export function VersionDetails() {
  return (
    <Context
      className="container"
      variants={containerLeft}
      initial="hidden"
      animate="visible"
    >
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
        <motion.div variants={item}>
          <h1>Beta 1.3.0</h1>
          <span>Developer Version</span>
        </motion.div>
        <div>
          <motion.h2 variants={item}>
            Sobre o Desenvolverdor e UI/UX Design
          </motion.h2>
          <motion.img variants={item} src={DeveloperAdsonSantos} alt="" />
          <motion.strong variants={item}>Adson Santos</motion.strong>
          <motion.span variants={item}>adsonbmx15@gmail.com</motion.span>
          <motion.ul variants={item}>
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
          </motion.ul>
        </div>
      </DeveloperInfor>
    </Context>
  );
}
