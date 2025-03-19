import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../contexts/users/UserContext';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Button, Divider, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';

const Login = (props) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const navigate = useNavigate();
    const userCtx = useContext(UserContext);
    const { loginUser, verifyingToken, authStatus, user, errorC } = userCtx;

    const [data, setData] = useState({
        username: '',
        password: '',
    });

    useEffect(() => {
        verifyingToken();

        if (authStatus && user) {
            navigate('/');
        }
    }, [authStatus]);

    if (authStatus && user) navigate('/');;

    const handleChange = (event) => {
        const value = event.target.value;
        if (event.target.name === "password") {
            setPassword(value);
            setError(value.length < 8);
        }
        setData({
            ...data,
            [event.target.name]: event.target.value,
        });
    };

    const sendData = async (event) => {
        event.preventDefault();
        const resp = await loginUser(data);
    };

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <>
            <Divider sx={{
                borderColor: 'none', borderStyle: 'none',
                padding: isSmallScreen ? '60px' : isMediumScreen ? '40px' : '40px'
            }} />
            <Box sx={{
                width: isSmallScreen ? 250 : isMediumScreen ? 500 : 500,
                height: 300,
                display: 'flex',
                justifyContent: 'center',
                margin: 'auto',
                boxShadow: 1,
                backgroundColor: '#FFF9E9',
                borderRadius: '10%',
            }}>
                <div>
                    <div>
                        <div>
                            <Typography variant="h5" sx={{ margin: 2, color: "#ec5636" }}>  </Typography>
                        </div>
                        <form
                            onSubmit={e => {
                                sendData(e);
                            }}
                        >
                            <input type="hidden" name="remember" value="true" />
                            <div>
                                <div>
                                    <TextField
                                        label="Nombre de usuario"
                                        variant="outlined"
                                        name="username"
                                        margin="normal"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <TextField
                                        label="Contraseña"
                                        type="password"
                                        name="password"
                                        margin="normal"
                                        value={password}
                                        onChange={handleChange}
                                        error={error}
                                        helperText={error ? "La contraseña debe tener al menos 8 caracteres" : ""}
                                    />
                                </div>
                            </div>

                            <div>
                                <Divider sx={{ borderColor: 'none', borderStyle: 'none', padding: "10px" }} />
                                <Button
                                    variant="contained"
                                    type="submit"
                                    sx={{
                                        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                                        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                                        color: 'white',
                                        padding: '10px 30px',
                                        borderRadius: '8px',
                                        '&:hover': {
                                            background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
                                        },
                                    }}
                                >
                                    Acceder a tu Cuenta
                                </Button>
                            </div>
                            {errorC && errorC.response.data.message.length >0 ? (
                                <Box display={'flex'}>
                                    <Divider sx={{ borderColor: 'none', borderStyle: 'none', padding: "5px" }} />
                                    <Typography variant="h8" sx={{ margin: 2, color: "#ec5636", textAlign: "center" }}>
                                        {errorC.response.data.message}
                                    </Typography>
                                </Box>
                            ) : (<p></p>)}
                        </form>
                    </div>
                </div>
            </Box>
        </>
    );
};

export default Login;