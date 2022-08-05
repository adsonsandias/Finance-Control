import { ChangeEvent } from "react";

import { InputStyle } from "./styles";

export interface IINPUNTPROPS {
  type: string;
  name: string;
  id: string;
  placeholder: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function Input({ ...props }: IINPUNTPROPS) {
  const { type, name, placeholder, id, onChange } = props;

  return (
    <InputStyle
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}
