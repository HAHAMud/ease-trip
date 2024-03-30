import { styled } from '@mui/material';
import { ComponentProps } from 'react';
import { FieldValues, FormProvider, SubmitErrorHandler, UseFormProps, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodSchema } from 'zod';

const StyledForm = styled('form')({
  height: '100%',
});

type EzFormProviderProps<T extends FieldValues = FieldValues> = ComponentProps<typeof StyledForm> &
  UseFormProps<T> & {
    onSubmit: SubmitErrorHandler<T>;
    onError?: SubmitErrorHandler<T>;
    schema?: ZodSchema;
  };

/**
 * Prevent uncaught exception if onSubmit promise throws error
 */

export function EzForm({ children, onSubmit, onError, schema, ...restUseFormProps }: EzFormProviderProps) {
  const methods = useForm({ ...restUseFormProps, ...(schema && { resolver: zodResolver(schema) }) });
  const onSubmitFn = methods.handleSubmit(onSubmit, onError);

  return (
    <FormProvider {...methods}>
      <StyledForm onSubmit={onSubmitFn}>{children}</StyledForm>
    </FormProvider>
  );
}
