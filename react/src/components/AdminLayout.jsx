import { Navigate, Outlet } from "react-router-dom";
import { userStateContext } from "../contexts/ContextProvider";
import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Logo from '../assets/img/icon.png';
import NewspaperRoundedIcon from '@mui/icons-material/NewspaperRounded';
import LayersRoundedIcon from '@mui/icons-material/LayersRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import GroupIcon from '@mui/icons-material/Group';
import axiosClient from '../axios';

const drawerWidth = 240;



export default function AdminLayout(props) {
    const { currentUser, userToken, setCurrentUser, setUserToken, setLoad } = userStateContext();
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    if (!userToken) {
        return <Navigate to='/login'></Navigate>
    };

    const logout = (ev) => {
        ev.preventDefault();
        setLoad(true);
        axiosClient.post('/logout')
            .then(res => {
                setCurrentUser({});
                setUserToken(null);
            });
    }

    const drawer = (
        <div>

            <Box display={'flex'} justifyContent={'center'} padding={"35px"}>
                <img width={100} src={Logo}></img>
            </Box>

            <Divider />
            <List sx={{ bgcolor: 'primary' }}>
                <ListItem disablePadding>
                    <ListItemButton to={'/admin/news'}>
                        <ListItemIcon>
                            <NewspaperRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary='Новини' />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding to={'/admin/pubhouses'}>
                    <ListItemButton>
                        <ListItemIcon>
                            <LayersRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary='Видання' />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton to={'/admin/resources'}>
                        <ListItemIcon>
                            <MenuBookRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary='Ресурси бібліотеки' />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton to={'/admin/users'}>
                        <ListItemIcon>
                            <GroupIcon />
                        </ListItemIcon>
                        <ListItemText primary='Користувачі' />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton to={'/admin/authors'}>
                        <ListItemIcon>
                            <GroupIcon />
                        </ListItemIcon>
                        <ListItemText primary='Автори' />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <ListItem onClick={(ev) => logout(ev)} disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary='Вихід' />
                </ListItemButton>
            </ListItem>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;


    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />

                <Outlet></Outlet>
            </Box>
        </Box>
    );
}


AdminLayout.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};