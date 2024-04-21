
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { SvgIcon, SvgIconProps } from '@mui/material';

export const iconMapping = {
  Visibility: VisibilityIcon,
  VisibilityOff: VisibilityOffIcon,
  CheckCircleOutline: CheckCircleOutlineIcon,
  LiveHelp: LiveHelpIcon,
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
