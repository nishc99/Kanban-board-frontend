import React from "react";
import { InputWrapper, InputLabel, InputError, Input, Select } from "./styles";

export default function FormInput(props) {
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

      {type === "select" ? (
        <Select value={value} onChange={onChange}>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      ) : (
      <Input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        />
      )}
      {hasError && <InputError>{errorMessage}</InputError>}
    </InputWrapper>
  );
}

