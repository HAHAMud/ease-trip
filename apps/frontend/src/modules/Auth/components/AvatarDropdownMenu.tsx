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
    <section className="ml-auto">
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
          sx={{
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.info.main,
            paddingX: '12px',
            paddingY: '8px',
          }}
        >
          <Box display="flex" gap={2}>
            <Avatar src={USER_AVATAR_IMAGE_PATH} alt="user avatar" sx={{ width: 36, height: 36 }} />
            <div className="text-2xl font-bold leading-10">派大星</div>
          </Box>

          <i className="text-sm not-italic">
            <span>一般會員</span>
            <address>Johnson@gmail.com</address>
          </i>
        </Box>
        <Box sx={{ backgroundColor: theme.palette.grey[50] }}>
          <span className="text-sm px-1">選項</span>
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
    </section>
  );
}
