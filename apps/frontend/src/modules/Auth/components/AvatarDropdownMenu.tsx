import type { MouseEvent } from 'react';
import { useState } from 'react';
import {
  Avatar,
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
  useTheme,
  EzIcon,
  EzButton,
  Box,
  Typography,
} from '@ease-trip/easy-ui';
import { USER_AVATAR_IMAGE_PATH } from '@/constants';

export function AvatarDropdownMenu() {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box marginLeft="auto">
      <EzButton onClick={handleClick}>
        <Avatar src={USER_AVATAR_IMAGE_PATH} alt="user avatar" sx={{ width: 36, height: 36 }} />
      </EzButton>
      <Menu
        anchorEl={anchorEl}
        slotProps={{ paper: { style: { backgroundColor: theme.palette.secondary.main } } }}
        open={open}
        onClose={handleClose}
      >
        <Box
          paddingX="12px"
          paddingY="8px"
          sx={(theme) => ({
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.info.main,
          })}
        >
          <Box display="flex" gap={2}>
            <Avatar src={USER_AVATAR_IMAGE_PATH} alt="user avatar" sx={{ width: 36, height: 36 }} />
            <Typography variant="h5" fontWeight={600}>
              派大星
            </Typography>
          </Box>

          <Box paddingTop="4px">
            <Typography variant="overline" display="block">
              一般會員
            </Typography>
            <Typography variant="overline" display="block">
              Johnson@gmail.com
            </Typography>
          </Box>
        </Box>
        <Box paddingX="4px" sx={(theme) => ({ backgroundColor: theme.palette.grey[50] })}>
          <Typography variant="tiny" marginX="4px">
            選項
          </Typography>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <EzIcon name="Settings" />
            </ListItemIcon>
            <ListItemText primary="設定" primaryTypographyProps={{ fontWeight: 600 }} />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <EzIcon name="TextSnippetOutlined" />
            </ListItemIcon>
            <ListItemText primary="服務條款" primaryTypographyProps={{ fontWeight: 600 }} />
          </MenuItem>
          <MenuItem sx={{ backgroundColor: theme.palette.secondary.main }}>
            <ListItemText primary="登出" primaryTypographyProps={{ textAlign: 'center', fontWeight: 600 }} />
          </MenuItem>
        </Box>
      </Menu>
    </Box>
  );
}
