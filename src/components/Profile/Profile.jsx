import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import React, { useContext, useState, useEffect } from 'react'
import UserContext from '../../contexts/users/UserContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
    const userCtx = useContext(UserContext)
    const { updateUser, authStatus, verifyingToken, user } = userCtx;
    const [password1, setPassword1] = useState('');
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const username = "";
    const email = "";
    const password = "";

    const [data, setData] = useState({
        username: "",
        email: "",
        password: ""
    });

    useEffect(() => {
        verifyingToken();

    }, [authStatus]);

    useEffect(() => {
        verifyingToken();
        const updateData = () => {
            return setData({
                ...user,
                username,
                email,
                password
            });
        };

        updateData();
    }, []);

    const handleChange = (event) => {
        event.preventDefault();
        setErrorMsg('')
        const value = event.target.value;
        if (event.target.name === "password") {
            setPassword1(value);
            setError(value.length < 8);
        }
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }
    const sendData = async (event) => {
        event.preventDefault();
        if (!error && user) {            
            const resp = await updateUser(data, user._id)
            if (user) navigate('/')
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
                            <div>
                                <div>
                                    <TextField
                                        label="Nombre de usuario"
                                        variant="outlined"
                                        name="username"
                                        required
                                        disabled
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                          }}
                                        defaultValue={user && user.username}
                                        // onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <TextField
                                        label="Correo"
                                        variant="outlined"
                                        name="email"
                                        margin="normal"
                                        required
                                        disabled
                                        InputLabelProps={{
                                            shrink: true,
                                          }}
                                        defaultValue={user && user.email}
                                        // onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <TextField
                                        label="Contraseña"
                                        type="password"
                                        name="password"
                                        margin="normal"
                                        required
                                        InputLabelProps={{
                                            shrink: true,
                                          }}
                                        value={password1}
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
                                    Guardar Cambios
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
    )
}

export default Profile