import React from "react";
import { useForm, FormProvider, SubmitHandler, UseFormProps, FieldValues } from "react-hook-form";

interface FormProps<T extends FieldValues> extends UseFormProps<T> {
  children: React.ReactNode;
  onSubmit: SubmitHandler<T>;
}

export function Form<T extends FieldValues>({ children, onSubmit, ...formConfig }: FormProps<T>) {
  const methods = useForm<T>(formConfig);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
}
