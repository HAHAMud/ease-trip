import { styled } from '@mui/material';
import { StyledComponent } from '@emotion/styled';
import { ComponentProps } from 'react';
import { FieldValues, FormProvider, SubmitErrorHandler, SubmitHandler, UseFormProps, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodSchema } from 'zod';

const StyledForm: StyledComponent<any> = styled('form')({
  height: '100%',
});

type EzFormProviderProps<T extends FieldValues = any> = ComponentProps<typeof StyledForm> &
  UseFormProps<T> & {
    onSubmit?: SubmitHandler<T>;
    onError?: SubmitErrorHandler<T>;
    schema?: ZodSchema;
  };

/**
 * Prevent uncaught exception if onSubmit promise throws error
 */
const errorWrapper =
  (fn: any) =>
  (...params: [...any]) => {
    return Promise.resolve(fn(...params)).catch(() => {});
  };

export function EzFormProvider({ children, onSubmit, onError, schema, ...restUseFormProps }: EzFormProviderProps) {
  const methods = useForm({ ...restUseFormProps, ...(schema && { resolver: zodResolver(schema) }) });

  return (
    <FormProvider {...methods}>
      <StyledForm onSubmit={methods.handleSubmit(errorWrapper(onSubmit), onError as any)}>{children}</StyledForm>
    </FormProvider>
  );
}
