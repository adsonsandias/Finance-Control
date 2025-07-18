/* eslint-disable react/require-default-props */
/* eslint-disable react/button-has-type */
import { ButtonStyle } from "./styles";

type ButtonProps = {
  onClick?: () => void;
  name: string;
  type: "button" | "submit" | "reset" | undefined;
  children: React.ReactNode;
  disabled?: boolean;
  isActive: "button" | "sign";
};

export function Button({ children, ...props }: ButtonProps) {
  const { onClick, name, type, disabled, isActive } = props;

  return (
    <ButtonStyle
      isActive={isActive}
      type={type}
      name={name}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </ButtonStyle>
  );
}
