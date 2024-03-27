import { SvgIcon, SvgIconProps } from '@mui/material';

import { Visibility, VisibilityOff } from '@mui/icons-material';

export const iconMapping = {
  Visibility: Visibility,
  VisibilityOff: VisibilityOff,
} as const;

export type EzIconName = keyof typeof iconMapping;

export const getEzIcon = (name: EzIconName) => {
  if (!iconMapping[name]) console.warn(`No icon name mapping for: ${name}`);
  const Ikon: typeof SvgIcon = iconMapping[name];
  return Ikon;
};

export interface EzIconProps extends Omit<SvgIconProps, 'name' | 'muiName'> {
  name: EzIconName;
}

export function EzIcon({ name, ...props }: EzIconProps) {
  const Icon_ = getEzIcon(name);
  return <Icon_ {...props} />;
}
