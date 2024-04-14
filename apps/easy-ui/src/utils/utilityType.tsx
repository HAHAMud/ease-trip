import { ComponentType, forwardRef, PropsWithoutRef, RefAttributes } from 'react';
import { capitalize } from '@mui/material';

const ezComponentPrefix = 'Ez';

export type VariantComponentProps<T> = Omit<T, 'variant'>;

export const defaultPropsComponentFactory = <T, U>(
  BaseComponent: ComponentType<T>,
  defaultProps: Partial<PropsWithoutRef<T> & RefAttributes<U>>,
  displayName?: string
) => {
  const Component = forwardRef<U, T>((props, ref) => <BaseComponent {...defaultProps} {...props} ref={ref} />);

  Component.defaultProps = defaultProps;
  Component.displayName = displayName;

  return Component;
};

export const variantComponentFactory = <T, U>(
  BaseComponent: ComponentType<T>,
  defaultProps: Partial<PropsWithoutRef<T> & RefAttributes<U>> & { variant: string }
) =>
  defaultPropsComponentFactory<T, U>(
    BaseComponent,
    defaultProps,
    getVariantComponentDisplayName(defaultProps.variant, BaseComponent.displayName?.slice(ezComponentPrefix.length))
  );

export const getVariantComponentDisplayName = (variant: string, component?: string) =>
  `${ezComponentPrefix}${capitalize(variant)}${capitalize(component ?? '')}`;
