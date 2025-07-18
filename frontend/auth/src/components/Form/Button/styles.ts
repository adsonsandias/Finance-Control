import styled from "styled-components";

interface IBTNTYPEPROPS {
  isActive?: "button" | "sign";
}

export const ButtonStyle = styled.button<IBTNTYPEPROPS>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-size: 1rem;
  padding: 1rem 3.5rem;
  height: 4rem;
  @media (max-width: 480px) {
    height: 3.5rem;
    font-size: 0.88rem;
  }

  font-weight: ${(props) => (props.isActive === "sign" ? "bold" : "normal")};
  border: ${(props) =>
    props.isActive === "button" ? "1px solid #d7d7d7" : "none"};
  background: ${(props) =>
    props.isActive === "sign" ? "var(--gradient-first)" : "transparent"};
  border-radius: 0.94rem;
  color: ${(props) =>
    props.isActive === "button" ? "var(--color-text-2)" : "#ffffff"};
  transition: all ease 0.3s;

  &:hover,
  &:focus {
    outline: none;
    box-shadow: ${(props) =>
      props.isActive === "sign"
        ? "0px 0px 0px 4px #FFF4CA, 0px 0px 0px 5px rgba(253, 195, 87, 0.8)"
        : "0px 0px 0px 4px rgba(239, 239, 239, 0.8),0px 0px 0px 5px rgba(123, 123, 123, 0.5)"};
  }
`;
