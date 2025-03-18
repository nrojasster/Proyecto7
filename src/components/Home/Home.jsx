import React, { useEffect, useState, useContext } from 'react';
import ProductsContext from '../../contexts/products/ProductsContext';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Badge, Button, CardActions, CardMedia, CircularProgress, Divider, Grid2, IconButton, styled } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import numeral from 'numeral';
import UserContext from '../../contexts/users/UserContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { green } from '@mui/material/colors';
import Fade from '../Slider/Slider';

const Home = () => {
  const navigate = useNavigate();
  const productCtx = useContext(ProductsContext)
  const { readAllProducts, product } = productCtx;

  const userCtx = useContext(UserContext)
  const { authStatus, verifyingToken, editCart, user, cart, seeCart } = userCtx;

  //productos en carro --

  useEffect(() => {
    verifyingToken();
    readAllProducts();
  }, []);

  useEffect(() => {
    if (user) {
      seeCart(user.cart)
    }
  }, [])

  function NumberFormatter({ number }) {
    return (<>{numeral(number).format('$0,0')}</>);
  }

  const getQuantityProd = (idProd) => {
    if (cart.products) {
      const filterProd = cart.products.filter((i) => i.idProd == idProd)
      if (filterProd.length > 0) {
        return filterProd[0].quantity
      } else {
        return 0
      }
    }
    if (cart) {
      const filterProd = cart.filter((i) => i.idProd == idProd)
      if (filterProd.length > 0) {
        return filterProd[0].quantity
      } else {
        return 0
      }
    }
  }

  const CustomBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#A7574E',
      color: '#FFF9E9',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    },
  }));

  const handleCardClick = (key) => {
    const filteredData = product.findIndex((element) => {
      return element._id === key;
    });

    if (filteredData >= 0) {
      sendProductcart(filteredData)  //añadir al carro el producto
    }

  };

  const ColorButton = styled(Button)(() => ({
    color: green[800],
    '&:hover': {
      backgroundColor: green[50],
    },
  }));

  const sendProductcart = async (index) => {
    const resp = await editCart(product[index], user._id);
  }

  const sendData = async (event) => {
    event.preventDefault();
    if (!authStatus || !user) {

      navigate('/iniciar-sesion');
    } else {
      navigate('/carrito');
    }
  };

  if (!product || product.length < 1) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", zIndex: 100 }}
      >
        <CircularProgress size={48} color="success" />
      </div>
    )
  }
  else {
    if (!product[0]) {
      return (
        <div
          style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", zIndex: 100 }}
        >
          <CircularProgress size={48} color="warning" />
        </div>
      )
    }
  }

  return (
    <>
      <Divider sx={{ borderColor: 'none', borderStyle: 'none', paddingTop: "80px" }} />
      <Fade />
      <Grid2 container spacing={2} justifyContent="center">
        {product.map((item) => {
          return (
            <Grid2 item xs={2} sm={1} md={2} key={item._id}>
              <form
                onSubmit={e => {
                  sendData(e);
                }}
              >
                <Card card-key={item._id} style={{ marginBottom: '16px' }} sx={{ height: 250, width: 240 }}>
                  <CardMedia
                    component="img"
                    sx={{ height: 120 }}
                    image={item.image}
                    title="Fruta"
                  />
                  <CardContent>
                    <Typography variant="h5" component="div" sx={{ userSelect: 'none' }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ userSelect: 'none' }}>
                      {item.price ? <NumberFormatter number={item.price} /> : "-"}
                    </Typography>
                  </CardContent>
                  {authStatus && user ? (
                    <CardActions>
                      <ColorButton size="small" onClick={() => handleCardClick(item._id)}>Añadir al Carro</ColorButton>
                      <Link to={{ pathname: "/carrito" }}>
                        <IconButton type="submit" aria-label="ver carrito">
                          {getQuantityProd(item.idProd) > 0? 
                          (<CustomBadge badgeContent={getQuantityProd(item.idProd)}>
                            <ShoppingCartIcon />
                          </CustomBadge>) : (<ShoppingCartIcon />)}
                        </IconButton>
                      </Link>
                    </CardActions>) :
                    (
                      <CardActions>
                        <Link to={{ pathname: "/iniciar-sesion" }}>
                          <ColorButton size="small">Añadir al Carro</ColorButton>
                        </Link>
                      </CardActions>)}
                </Card>
              </form>
            </Grid2>
          )
        })}
      </Grid2>
    </>
  )
}

export default Home

