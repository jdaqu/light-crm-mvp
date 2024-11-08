import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";

interface CustomFormInputProps extends Omit<TextFieldProps, 'name'> {
  name: string; 
}

const CustomFormInput: React.FC<CustomFormInputProps> = ({ name, ...props }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <TextField {...field} {...props} />}
    />
  );
};

export default CustomFormInput;
