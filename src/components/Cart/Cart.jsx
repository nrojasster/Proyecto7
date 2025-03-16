import { Box, Button, CircularProgress, Divider, IconButton, List, ListItem, ListItemText, MenuItem, styled, TextField, Typography } from '@mui/material'
import React, { useState, useEffect, useContext } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import UserContext from '../../contexts/users/UserContext';
import numeral from 'numeral';
import { Link } from 'react-router-dom';
import { green } from '@mui/material/colors';

const Cart = () => {
    const userCtx = useContext(UserContext)
    const { verifyingToken, user, seeCart, cart, getCheckoutSession, sessionURL, deleteCart, editCart2 } = userCtx;

    const upCart = async () => {
        await seeCart(user.cart)
    }

    useEffect(() => {
        // verifyingToken();
        console.log('useEffect, userCart: ', user.cart)
    }, []);

    useEffect(() => {
        upCart()
    }, [user, cart])

    //Remover producto del carro
    const handleRemoveItem = async (e, id) => {
        e.preventDefault();
        const prodToDelete = cart.filter((item) => item._id === id)
        // const prodToDelete2 = cart.filter((item) => item._id !== id)
        console.log('id producto a remover', prodToDelete[0])
        const resp = await deleteCart(prodToDelete[0], user._id);

        console.log('resp delete cart', resp);
    };

    //Pagar Pedido
    const handleSubmit = async (e) => {
        e.preventDefault();
        const total = cart.reduce((total, item) => total + (item.price * item.quantity), 0)
        if (total > 0) await getCheckoutSession(user._id);
    };

    useEffect(() => {
        if (sessionURL) window.location.href = sessionURL;
    }, [sessionURL]);

    function NumberFormatter({ number }) {
        return (<>{numeral(number).format('$0,0')}</>);
    }


    //usuario modifica cantidad de producto
    const handleCardClick = (e, key, valueOpt) => {
        const newValue = valueOpt;

        const filteredData = cart.findIndex((element) => {
            return element._id === key;
        });

        if (filteredData >= 0) {
            sendProductcart(filteredData, newValue)
        }
    };

    const sendProductcart = async (index, eValue) => {
        console.log('indice product', index);
        console.log('cart[index].quantity', cart[index].quantity);
        const newCart = [...cart];
        newCart[index] = { ...newCart[index], quantity: eValue };
        console.log('newCart[index] (58)', newCart[index]);
        const resp = await editCart2(newCart[index], user._id);
        // await seeCart(user.cart)
        console.log('resp cart', resp);
    }

    const quantityOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    if (!cart) {
        console.log('Carrito bad:', cart);
        return (
            <div
                style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", zIndex: 100 }}
            >
                <CircularProgress size={48} color="success" />
            </div>
        )
    }
    return (
        <>
            <Divider sx={{ borderColor: 'none', borderStyle: 'none', paddingTop: "80px" }} />
            <Box sx={{ width: 500, margin: '0 auto', padding: 2, border: '1px solid #ccc', borderRadius: 2 }}>

                <Box
                    display="flex"
                    justifyContent="center">
                    <Typography variant="h6" gutterBottom>
                        Tu Pedido
                    </Typography>
                </Box>
                {cart.length > 0 ? (
                    <List>
                        {cart.map(item => (
                            <ListItem key={item._id} secondaryAction={
                                <IconButton edge="end" aria-label="delete" onClick={(e) => handleRemoveItem(e, item._id)}>
                                    <DeleteIcon />
                                </IconButton>
                            }>
                                <ListItemText primary={item.name} secondary={<NumberFormatter number={item.price} />} />

                                <TextField
                                    required
                                    id="quantity"
                                    sx={{ width: 100 }}
                                    select
                                    value={item.quantity}
                                    slotProps={{
                                        inputLabel: {
                                            shrink: true,
                                        },
                                    }}
                                >
                                    {quantityOptions.map((valOpt) => (
                                        <MenuItem key={valOpt} value={valOpt}
                                            selected={valOpt === item.quantity}
                                            onClick={(event) => handleCardClick(event, item._id, valOpt)}>
                                            {valOpt}
                                        </MenuItem>
                                    ))}
                                </TextField>

                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <Box
                        display="flex"
                        justifyContent="center">
                        <Typography variant="h3">
                            Tu Carro esta vacio
                        </Typography>
                    </Box>
                )}
                {cart.length > 0 ? (
                    <>
                        <Typography variant="subtitle1">
                            Total: <NumberFormatter number={cart.reduce((total, item) => total + (item.price * item.quantity), 0)} />
                        </Typography>
                        <Divider sx={{ borderColor: 'none', borderStyle: 'none', paddingTop: "20px" }} />
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <div>
                                <Button size="medium" component={Link} to="/" sx={{
                                    color: green[800],
                                    '&:hover': {
                                        backgroundColor: green[50],
                                    },
                                }}>Seguir Comprando</Button>
                            </div>
                            <Button size="medium" sx={{
                                color: green[800],
                                '&:hover': {
                                    backgroundColor: green[50],
                                },
                            }} onClick={(e) => {
                                handleSubmit(e);
                            }}>ir a Pagar</Button>


                        </Box>
                    </>
                ) : (
                    <div>
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <Divider sx={{ borderColor: 'none', borderStyle: 'none', paddingTop: "80px" }} />
                            <Button size="medium" component={Link} to="/" sx={{
                                color: green[800],
                                '&:hover': {
                                    backgroundColor: green[50],
                                },
                            }}>Seguir Comprando</Button></Box>
                    </div>

                )}
            </Box>
        </>
    )
}

export default Cart