/* eslint-disable react/require-default-props */
import { ChangeEvent } from "react";

import { InputStyle } from "./styles";

export interface IINPUNTPROPS {
  type: string;
  name: string;
  id: string;
  placeholder: string;
  required?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function Input({ ...props }: IINPUNTPROPS) {
  const { type, name, placeholder, id, onChange, required } = props;

  return (
    <InputStyle
      type={type}
      name={name}
      id={id}
      required={required}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}
