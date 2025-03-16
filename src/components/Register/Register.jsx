import React, { useState, useEffect, useContext } from 'react'
import UserContext from '../../contexts/users/UserContext';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Divider, TextField, Typography } from '@mui/material';

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

        if (errorC) {
            console.log('error userCtx', errorC)
        }

        if (authStatus && user) {
            navigate('/');
        } 
    }, [authStatus]);

    if (authStatus && user) {
        return null;
    } else {
        verifyingToken();
        console.log('user 3', user)
        console.log('authStatus 3', authStatus)
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
                console.log('resp register:', res)
                
            }
        } catch (error1) {
            console.log('resp register:', error1)
        }

    }

    return (
        <>
            <Divider sx={{ borderColor: 'none', borderStyle: 'none', padding: "40px" }} />
            <Box sx={{
                width: 500,
                height: 350,
                display: 'flex',
                justifyContent: 'center',
                margin: 'auto',
                boxShadow: 1,
                backgroundColor: '#FFF9E9',
                borderRadius: '10%',
                '&:hover': {
                    backgroundColor: '#FFF9E9',
                },
            }}>
                <div>
                    <div>
                        <div>
                            <Typography variant="h5" fontWeight={700} sx={{ margin: 2, color: "#ec5636" }}>  </Typography>
                        </div>
                        <form
                            onSubmit={e => {
                                sendData(e);
                            }}
                        >
                            {/* <input type="hidden" name="remember" value="true" /> */}
                            <div>
                                <div>
                                    <TextField
                                        label="Nombre de usuario"
                                        variant="outlined"
                                        name="username"
                                        margin="normal"
                                        // fullWidth
                                        // value={username}
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
                                        fullWidth
                                        // value={username}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <TextField
                                        label="Contraseña"
                                        type="password"
                                        name="password"
                                        margin="normal"
                                        required
                                        // fullWidth
                                        value={password}
                                        onChange={handleChange}
                                        error={error}
                                        helperText={error ? "La contraseña debe tener al menos 8 caracteres" : ""}
                                    />
                                </div>
                            </div>
                            <Divider sx={{ borderColor: 'none', borderStyle: 'none', padding: "10px" }} />
                            <div>
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
                                    Crear Tu Cuenta
                                </Button>
                                { errorC && errorC.response.data.message.code===11000 ? (
                                    <div>
                                    <Typography variant="h8" fontWeight={700} sx={{ margin: 2, color: "#ec5636" }}>
                                            Usuario o Email duplicado
                                    </Typography>
                                    </div> 
                                ) : (<p></p>) }
                            </div>

                        </form>
                    </div>
                </div>
            </Box>
        </>
    )
}

export default Register