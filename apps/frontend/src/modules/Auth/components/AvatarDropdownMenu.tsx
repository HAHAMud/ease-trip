import type { MouseEvent } from 'react';
import { useState } from 'react';
import {
  Avatar,
  Grid,
  Menu,
  MenuItem as BaseMenuItem,
  ListItemText,
  ListItemIcon,
  useTheme,
  EzIcon,
  EzButton,
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
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        anchorEl={anchorEl}
        slotProps={{ paper: { style: { backgroundColor: theme.palette.secondary.main } } }}
        open={open}
        onClose={handleClose}
      >
        <section
          style={{
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.info.main,
            padding: '8px',
            paddingLeft: '12px',
            paddingRight: '12px',
          }}
        >
          <Grid container direction="row" gap={2}>
            <Avatar src={USER_AVATAR_IMAGE_PATH} alt="user avatar" sx={{ width: 36, height: 36 }} />
            <div className="text-2xl font-bold leading-10">派大星</div>
          </Grid>

          <i className="text-sm not-italic">
            <span>一般會員</span>
            <address>Johnson@gmail.com</address>
          </i>
        </section>
        <section style={{ backgroundColor: theme.palette.grey[50] }}>
          <span style={{ paddingLeft: '4px', paddingRight: '4px', fontSize: '0.875rem', lineHeight: '1.25rem' }}>
            選項
          </span>
          <BaseMenuItem onClick={handleClose}>
            <ListItemIcon>
              <EzIcon name="Settings" />
            </ListItemIcon>
            <ListItemText primary="設定" primaryTypographyProps={{ fontWeight: 600 }} />
          </BaseMenuItem>
          <BaseMenuItem onClick={handleClose}>
            <ListItemIcon>
              <EzIcon name="TextSnippetOutlined" />
            </ListItemIcon>
            <ListItemText primary="服務條款" primaryTypographyProps={{ fontWeight: 600 }} />
          </BaseMenuItem>
          <BaseMenuItem style={{ backgroundColor: theme.palette.secondary.main }}>
            <ListItemText primary="登出" primaryTypographyProps={{ textAlign: 'center', fontWeight: 600 }} />
          </BaseMenuItem>
        </section>
      </Menu>
    </section>
  );
}
