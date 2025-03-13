import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../contexts/users/UserContext';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Button, Divider, TextField, Typography } from '@mui/material';

const Login = (props) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const navigate = useNavigate();
    const userCtx = useContext(UserContext);
    const { loginUser, verifyingToken, authStatus, user } = userCtx;

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
        setErrorMsg('')
        if (event.target.name === "password"){
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
        console.log('data login', data)
        const resp = await loginUser(data);
        console.log('Respuesta', resp)
        if (!resp) setErrorMsg('Usuario o Contraseña Incorrectos')
    };
    return (
        <>
            <Divider sx={{ borderColor: 'none', borderStyle: 'none', padding: "40px" }} />
            <Box sx={{
                width: 500,
                height: 300,
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
                            <input type="hidden" name="remember" value="true" />
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
                                        label="Contraseña"
                                        type="password"
                                        name="password"
                                        margin="normal"
                                        // fullWidth
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
                            <div>
                                <Divider sx={{ borderColor: 'none', borderStyle: 'none', padding: "10px" }} />
                                <Typography variant="h8" sx={{ margin: 4, color: "red" }}>{errorMsg}</Typography>
                            </div>
                        </form>
                    </div>
                </div>
            </Box>
        </>
    );
};

export default Login;