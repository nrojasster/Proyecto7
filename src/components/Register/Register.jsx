import React, { useState, useEffect, useContext } from 'react'
import UserContext from '../../contexts/users/UserContext';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Divider, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';

const Register = () => {
    const navigate = useNavigate();
    const userCtx = useContext(UserContext)
    const { registerUser, authStatus, verifyingToken, user, errorC } = userCtx;
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const [data, setData] = useState({
        username: "",
        email: "",
        password: ""
    });

    useEffect(() => {
        verifyingToken();

        if (authStatus && user) {
            navigate('/');
        }
    }, [authStatus]);

    if (authStatus && user) {
        navigate('/');
    } else {
        verifyingToken();
    }

    const handleChange = (event) => {
        event.preventDefault();
        const value = event.target.value;
        if (event.target.name === "password") {
            setPassword(value);
            setError(value.length < 8);
        }
        setData({
            ...data,
            [event.target.name]: event.target.value
        })

    }
    const sendData = async (event) => {
        try {
            event.preventDefault();
            if (!error) {
                const res = await registerUser(data)

            }
        } catch (error1) {
            console.log('resp register:', error1)
        }

    }

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <>
            <Divider sx={{ borderColor: 'none', borderStyle: 'none', padding: isSmallScreen ? '60px' : isMediumScreen ? '40px' : '40px' }} />
            <Box sx={{
                width: isSmallScreen ? 250 : isMediumScreen ? 400 : 500,
                height: 350,
                display: 'flex',
                justifyContent: 'center',
                margin: 'auto',
                boxShadow: 1,
                alignItems: 'center',
                backgroundColor: '#FFF9E9',
                borderRadius: '10%',
            }}>
                <div>
                    <div>

                        <form
                            onSubmit={e => {
                                sendData(e);
                            }}
                        >
                            <div>
                                <div>
                                    <TextField
                                        label="Nombre de usuario"
                                        variant="outlined"
                                        name="username"
                                        required
                                        margin="normal"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <TextField
                                        label="Correo"
                                        variant="outlined"
                                        name="email"
                                        required
                                        margin="normal"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <TextField
                                        label="Contraseña"
                                        type="password"
                                        name="password"
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        value={password}
                                        onChange={handleChange}
                                        error={error}
                                        helperText={error ? "La contraseña debe tener al menos 8 caracteres" : ""}
                                    />
                                </div>
                            </div>

                            <Divider sx={{ borderColor: 'none', borderStyle: 'none', padding: "10px" }} />
                            <Button
                                variant="contained"
                                type="submit"
                                sx={{
                                    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                                    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                                    color: 'white',   
                                    width: '225px',                                 
                                    padding: '10px 30px',
                                    borderRadius: '8px',
                                    '&:hover': {
                                        background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
                                    },
                                }}
                            >
                                Crear Tu Cuenta
                            </Button>

                            {errorC && errorC.response.data.message.code === 11000 ? (
                                <div>
                                    <Divider sx={{ borderColor: 'none', borderStyle: 'none', padding: "5px" }} />
                                    <Typography variant="h8" sx={{ margin: 2, color: "#ec5636" }}>
                                        Usuario o Email duplicado
                                    </Typography>
                                </div>
                            ) : (<p></p>)}
                        </form>
                    </div>
                </div>
            </Box>
        </>
    )
}

export default Register