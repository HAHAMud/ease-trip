import type { ComponentProps } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { styled } from '@mui/material';
import {
  FieldValues,
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormProps,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { ZodSchema } from 'zod';

const StyledForm = styled('form')({
  height: '100%',
});

type EzFormProviderProps<T extends FieldValues = FieldValues> = ComponentProps<typeof StyledForm> &
  UseFormProps<T> & {
    onSubmit: SubmitHandler<T>;
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

export function EzForm({ children, onSubmit, onError, schema, ...restUseFormProps }: EzFormProviderProps) {
  const methods = useForm({ ...restUseFormProps, ...(schema && { resolver: zodResolver(schema) }) });
  const onSubmitFn = methods.handleSubmit(errorWrapper(onSubmit), onError);

  return (
    <FormProvider {...methods}>
      <StyledForm onSubmit={onSubmitFn}>{children}</StyledForm>
    </FormProvider>
  );
}

export function EzPureFrom({ children, onSubmit }: ComponentProps<typeof StyledForm>) {
  return <StyledForm onSubmit={onSubmit}>{children}</StyledForm>;
}

export { useFormContext };
