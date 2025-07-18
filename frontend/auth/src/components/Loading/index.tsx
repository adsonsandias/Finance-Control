import { Player } from "@lottiefiles/react-lottie-player";

import { Container } from "./styles";

export function Loading() {
  return (
    <Container>
      <Player
        autoplay
        loop
        src="https://assets3.lottiefiles.com/packages/lf20_ynzkvsrh.json"
        style={{ height: "120px", width: "120px" }}
      />
    </Container>
  );
}
