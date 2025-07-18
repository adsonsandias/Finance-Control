/* eslint-disable react/require-default-props */
import { ChangeEvent } from "react";

import { InputStyle } from "./styles";

export interface IINPUTPROPS {
  type: string;
  name: string;
  id: string;
  placeholder: string;
  value?: string;
  required?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function Input({ ...props }: IINPUTPROPS) {
  const { type, name, placeholder, id, value, onChange, required } = props;

  return (
    <InputStyle
      type={type}
      name={name}
      id={id}
      value={value}
      required={required}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}
