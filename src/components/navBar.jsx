import React, { useContext, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import { Link, useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import backgroundImage from '../assets/images/5353626.jpg';
import UserContext from '../contexts/users/UserContext';
import LogoutIcon from '@mui/icons-material/Logout';
import { SvgIcon } from '@mui/material';

const Navbar = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [auth, setAuth] = React.useState(false);
    const userCtx = useContext(UserContext);
    const navigate = useNavigate();

    const { logOutUser, verifyingToken, authStatus, user } = userCtx;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseLogOut = () => {
        setAnchorEl(null);
        logOutUser()
    };
    const handleLogout = () => {
        logOutUser()
        navigate('/')
        setAuth(false)
    };

    useEffect(() => {
        verifyingToken();

        if (authStatus) {
            setAuth(true);
        }
    }, [authStatus]);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '15%' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleClick}>
                        {/* <MenuIcon /> */}
                        <AccountCircleIcon style={{ color: 'green', fontSize: 30 }} />
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose} component={Link} to="/">Inicio</MenuItem>
                        <MenuItem onClick={handleClose} component={Link} to="/iniciar-sesion">Iniciar Sesion</MenuItem>
                        <MenuItem onClick={handleClose} component={Link} to="/registro">Registrarse</MenuItem>
                        {/* <MenuItem onClick={handleCloseLogOut} component={Link} to="/">Cerrar Sesion</MenuItem> */}
                    </Menu>
                    <Typography variant="h6" component={Link}
                        to='/' style={{ flexGrow: 2 }} sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            color: 'black',
                            textDecoration: 'none',
                        }}>
                        La Feria UDD
                    </Typography>
                    {auth && user && (
                        <div>
                            <Box
                                sx={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 40,
                                    height: 40,
                                    backgroundColor: 'white', // Cambia el color según tu preferencia
                                    borderRadius: '50%',  //Para hacer el fondo redondo
                                }}
                            >
                                {/* <Typography variant="body1" ml={1}>
                                    Perfil
                                </Typography> */}
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleLogout}
                                    color="inherit"
                                >
                                    <SvgIcon component={LogoutIcon} style={{ color: 'green' }} />
                                </IconButton>
                            </Box>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navbar;