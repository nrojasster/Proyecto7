import { Box, Button, CircularProgress, Divider, IconButton, List, ListItem, ListItemText, TextField, Typography } from '@mui/material'
import React, { useState, useEffect, useContext } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import UserContext from '../../contexts/users/UserContext';
import numeral from 'numeral';
import { Link } from 'react-router-dom';

const Cart = () => {
    const userCtx = useContext(UserContext)
    const { verifyingToken, user, seeCart, cart, getCheckoutSession, sessionURL, deleteCart, editCart2 } = userCtx;

    const upCart = async () => {
        await seeCart(user.cart)
    }

    useEffect(() => {
        verifyingToken();
        console.log('useEffect, userCart: ', user.cart)                
    }, []);

    useEffect(() => {
        upCart()
    },[user, cart])

    //Remover producto del carro
    const handleRemoveItem = async (e, id) => {
        e.preventDefault();
        const prodToDelete = cart.filter((item) => item._id === id)
        // const prodToDelete2 = cart.filter((item) => item._id !== id)
        console.log('id producto a remover', prodToDelete[0])
        const resp = await deleteCart(prodToDelete[0], user._id);
        // dispatchEvent({  })
        console.log('resp delete cart', resp);
    };

    //Pagar Pedido
    const handleSubmit = async (e) => {
        e.preventDefault();
        await getCheckoutSession(user._id);
    };

    useEffect(() => {
        if (sessionURL) window.location.href = sessionURL;
    }, [sessionURL]);


    function NumberFormatter({ number }) {
        return (<>{numeral(number).format('$0,0')}</>);
    }

    //usuario modifica cantidad de producto
    const handleCardClick = (e, key) => {
        // console.log(`Card clickeada: ${key}`);
        const filteredData = cart.findIndex((element) => {
            return element._id === key;
        });
        console.log('card resultado', cart[filteredData]);
        console.log('e.target.value', e.target.value)
        if (filteredData >= 0) {
            sendProductcart(filteredData, e.target.value)  
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

                <Typography variant="h6" gutterBottom>
                    Tu Pedido
                </Typography>
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
                                    label="Cantidad"
                                    defaultValue={item.quantity}
                                    sx={{ width: 100 }}
                                    onChange={(e) => handleCardClick(e, item._id)}
                                />
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <Typography variant="h8" gutterBottom>
                        Tu Carro esta Vacio
                    </Typography>
                )}
                {cart.length > 0 ? (
                    <>
                        <Typography variant="subtitle1">
                            Total: <NumberFormatter number={cart.reduce((total, item) => total + (item.price * item.quantity), 0)} />
                        </Typography>
                        <Button size="medium" onClick={(e) => {
                            handleSubmit(e);
                        }}>ir a Pagar</Button>
                    </>
                ) : (
                    <div>
                        <Button size="medium" component={Link} to="/">Seguir Comprando</Button>
                    </div>

                )}
            </Box>
        </>
    )
}

export default Cart