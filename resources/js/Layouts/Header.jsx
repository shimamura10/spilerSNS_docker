import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from '@inertiajs/react';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Checkbox from '@mui/material/Checkbox';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios';

const drawerWidth = 240;

export default function Header({auth, header, children}) {
    // アイコンクリックでメニュー表示するやつ
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // カテゴリーごとの表示・非表示の管理
    const [displays, setDisplays] = React.useState(() => {
        const displays = {};
        auth.user.categories.forEach(category => {
            displays[category.id] = category.pivot.display;
        })
        return displays;
    });
    console.log(displays);
    const changeDisplay = (e, category_id) => {
        const chengedDisplay = e.target.checked;  //putした後だとtarget.checkedがdisplaysで上書きされてしまうので、その前に保存しておく
        axios.put(route('category.display'), {
            display: e.target.checked,
            user_id: auth.user.id,
            category_id: category_id,
        }).then((response) => {
            setDisplays({ ...displays, [category_id]: chengedDisplay});
        });
    }

    return (
        <div>
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        { header }
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        <ListItem disablePadding>
                            <Tooltip title="Account settings">
                                <IconButton
                                  onClick={handleClick}
                                  size="small"
                                  sx={{ ml: 2 }}
                                  aria-controls={open ? 'account-menu' : undefined}
                                  aria-haspopup="true"
                                  aria-expanded={open ? 'true' : undefined}
                                >
                                    <Avatar src={ auth.user.icon_url } />
                                </IconButton>
                            </Tooltip>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to={route('home')}>
                                <ListItemIcon>
                                    <HomeIcon/>
                                </ListItemIcon>
                                <ListItemText primary="ホーム" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to={route('mypage', {user: auth.user.id})}>
                                <ListItemIcon>
                                    <PersonIcon/>
                                </ListItemIcon>
                                <ListItemText primary="プロフィール" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to={route('category.create', {user: auth.user.id})}>
                                <ListItemIcon>
                                    <PersonIcon/>
                                </ListItemIcon>
                                <ListItemText primary="カテゴリー追加" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <List>
                                { auth.user.categories.map((category) => (
                                    <ListItem key={category.id}>
                                        <Checkbox 
                                            color='default' 
                                            icon={<VisibilityOffIcon/>} 
                                            checkedIcon={<VisibilityIcon/>} 
                                            onChange={(e) => changeDisplay(e, category.id)}
                                            checked={displays[category.id]}
                                        />
                                        <ListItemText primary={category.name} />
                                    </ListItem>
                                ))}
                            </List>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#bae0e0' }}>
                <Toolbar />
                {children}
            </Box>
        </Box>
        
        <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  left: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          >
            <MenuItem  component={Link} href={route('profile.edit')}>
              <PersonIcon sx={{pr:1}}/> Profile
            </MenuItem>
            <MenuItem component={Link} href={route('logout')} method="post">
              <Logout sx={{pr:1}}/> Log out
            </MenuItem>
        </Menu>
        </div>
    );
}
