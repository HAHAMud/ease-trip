import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton';
import { MenuItem as BaseMenuItem } from '@mui/base/MenuItem';
import SettingsIcon from '@mui/icons-material/Settings';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import {
  Avatar,
  Grid,
  List,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  ListSubheader,
  useTheme,
} from '@ease-trip/easy-ui';

export function AvatarDropdownMenu() {
  const theme = useTheme();

  return (
    <Dropdown>
      <BaseMenuButton className="ml-auto">
        <Avatar src="/assets/images/male-user-avatar.webp" alt="user avatar" sx={{ width: 36, height: 36 }} />
      </BaseMenuButton>
      <Menu
        className="rounded-md overflow-hidden shadow-md"
        style={{ backgroundColor: theme.palette.grey[100], paddingBottom: 0, width: 200, left: -20, top: 20 }}
      >
        <BaseMenuItem>
          <Grid
            container
            direction="column"
            className="py-2 px-4"
            gap={1}
            style={{ backgroundColor: theme.palette.secondary.main, color: theme.palette.info.main }}
          >
            <Grid container direction="row" gap={2}>
              <Avatar src="/assets/images/male-user-avatar.webp" alt="user avatar" sx={{ width: 36, height: 36 }} />
              <div className="text-2xl font-bold leading-10">派大星</div>
            </Grid>

            <i className="text-sm not-italic">
              <span>一般會員</span>
              <address>Johnson@gmail.com</address>
            </i>
          </Grid>
        </BaseMenuItem>
        <BaseMenuItem>
          <List
            sx={{
              width: '100%',
              bgcolor: 'background.paper',
              color: theme.palette.info.main,
              paddingBottom: '0px',
            }}
            component="nav"
            subheader={
              <ListSubheader component="div" className="text-md">
                選項
              </ListSubheader>
            }
          >
            <ListItemButton>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="設定" primaryTypographyProps={{ fontWeight: 600 }} />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <TextSnippetOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="服務條款" primaryTypographyProps={{ fontWeight: 600 }} />
            </ListItemButton>
            <ListItemButton style={{ backgroundColor: theme.palette.secondary.main }}>
              <ListItemText primary="登出" primaryTypographyProps={{ textAlign: 'center', fontWeight: 600 }} />
            </ListItemButton>
          </List>
        </BaseMenuItem>
      </Menu>
    </Dropdown>
  );
}
