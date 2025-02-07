import React from "react";
import { InputWrapper, InputLabel, InputError, Input, Select } from "./styles";
import { FiSearch } from "react-icons/fi";

export default function FormInput1(props) {
  const {
    label,
    placeholder,
    onChange,
    value,
    hasError,
    errorMessage,
    type,
    width,
    options,
  } = props;
  return (
    <InputWrapper margin={props.margin} width={width}>
      {label && <InputLabel>{label}</InputLabel>}
      <Input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        />
      {hasError && <InputError>{errorMessage}</InputError>}
    </InputWrapper>
  );
}