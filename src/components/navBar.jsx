import React, { useContext, useEffect, useState } from 'react';
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
// import backgroundImage from '../assets/images/5353626.jpg';
import UserContext from '../contexts/users/UserContext';
import LogoutIcon from '@mui/icons-material/Logout';
import { Divider, SvgIcon, Tooltip } from '@mui/material';

const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [auth, setAuth] = useState(false);
    const userCtx = useContext(UserContext);
    const navigate = useNavigate();

    const { logOutUser, verifyingToken, authStatus, user } = userCtx;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
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
    //backgroundImage: `url(${backgroundImage})`,
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{ backgroundColor: 'wheat', backgroundSize: 'cover', backgroundPosition: 'center', height: '15%' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleClick}>
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
                    </Menu>
                    <Typography variant="h6" component={Link}
                        to='/' style={{ flexGrow: 2 }} sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            color: 'green',
                            textDecoration: 'none',
                        }}>
                        La Feria UDD
                    </Typography>
                    {auth && user && (
                        <div>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    width: 200,
                                    height: 40,
                                    backgroundColor: 'none', // Cambia el color según tu preferencia                                
                                }}>

                                <Box>
                                <Tooltip title="Perfil">
                                    <Typography component={Link} to='/perfil' sx={{ padding: '10px', color: 'green', alignItems: 'left', textDecoration: 'none' }}>Hola {user.username}</Typography>
                                </Tooltip>
                                </Box>

                                <Divider orientation="vertical" flexItem sx={{ borderColor: 'none', borderStyle: 'none', padding: "15px" }} />
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
                                    <Tooltip title="Cerrar Sesion">
                                        <IconButton
                                            size="large"
                                            aria-label="logout"
                                            aria-controls="menu-appbar"
                                            aria-haspopup="true"
                                            onClick={handleLogout}
                                            color="inherit"
                                        >
                                            <SvgIcon component={LogoutIcon} style={{ color: 'green' }} />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </Box>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navbar;