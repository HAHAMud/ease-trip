import { SvgIcon, SvgIconProps } from '@mui/material';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export const iconMapping = {
  Visibility: VisibilityIcon,
  VisibilityOff: VisibilityOffIcon,
} as const;

export type EzIconName = keyof typeof iconMapping;

export const getEzIcon = (name: EzIconName) => {
  if (!iconMapping[name]) console.warn(`No icon name mapping for: ${name}`);
  const Ikon: typeof SvgIcon = iconMapping[name] || null;
  return Ikon;
};

export interface EzIconProps extends Omit<SvgIconProps, 'name' | 'muiName'> {
  name: EzIconName;
}

export function EzIcon({ name, ...props }: EzIconProps) {
  const Icon_ = getEzIcon(name);
  return <Icon_ {...props} />;
}
