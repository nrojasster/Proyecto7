import React, { useReducer } from 'react'
import UserContext from './UserContext'
import UserReducer from './UserReducer'
import axiosClient from '../../config/axios'
import getToken from '../../config/token'

const UserState = (props) => {
    // 1. ESTADO INICIAL
    const initialState = {
        user: {
            username: null,
            email: null,
        },
        cart: [],
        authStatus: false,
        loading: true,
        errorC: null
    }
    // 2. DISPATCHING Y REDUCERS
    const [globalState, dispatch] = useReducer(UserReducer, initialState)
    // 3. FUNCIONES 
    // NOS VAN A AYUDAR A CAPTURAR LOS EVENTOS DE LOS COMPONENTES
    const registerUser = async (formData) => {
        const form = {
            username: formData.username,
            email: formData.email,
            password: formData.password
        }
        try {
            const res = await axiosClient.post("/user/register", form)
            const token = res.data.token

            dispatch({
                type: "REGISTRO_EXITOSO",
                payload: token
            })
        } catch (error) {
            console.log(error)
            dispatch({
                type: "REGISTRO_FALLO",
                payload: error
            })
        }
    }

    const loginUser = async (formData) => {
        try {
            const res = await axiosClient.post('/user/login', formData)
            const token = res.data.token

            dispatch({
                type: "LOGIN_EXITOSO",
                payload: token
            })
        } catch (error) {
            console.log(error)
        }
    }

    const logOutUser = async () => {
        try {
            dispatch({
                type: "CERRAR_SESION"
            })
        } catch (error) {
            console.log(error)
        }
    }

    const verifyingToken = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            axiosClient.defaults.headers.common['Authorization'] = 'Bearer ' + token
        } else {
            delete axiosClient.defaults.headers.common['Authorization']
        }
        try {
            const res = await axiosClient.get('user/verifyToken')

            dispatch({
                type: "OBTENER_USUARIO",
                payload: res.data.user,
            });
        } catch (error) {
            console.log(error)
        }
    }

    const updateUser = async (dataform, id) => {
        getToken();
        try {
            const res = await axiosClient.put(`user/update/${id}`, dataform);
            console.log('res updateUser', res)
            dispatch({
                type: "MOD_USUARIO",
                payload: res.data,
            });
        } catch (error) {
            console.log(error)
        }

    };

    const editCart = async (data, idUser) => {
        getToken();

        try {
            const res = await axiosClient.put(`/cart/edit-cart/${idUser}`, {
                products: data,
            });
            await getCart();

            return res.data.msg;
        } catch (error) {
            console.log('error EditCart', error)
            return;
        }
    };

    //modifica cantidad de producto existente en carro
    const editCart2 = async (data, idUser) => {
        getToken();

        try {
            const res = await axiosClient.put(`/cart/edit-cart2/${idUser}`, {
                products: data,
            });
            // await getCart();

            return res.data.msg;
        } catch (error) {
            console.log('error EditCart 2', error)
            return;
        }
    };

    //elimina un producto del carro segun data, de usuario idUser
    const deleteCart = async (Prod, idUser) => {
        getToken();
        console.log('(117) data deleteCart', Prod)
        try {
            const res = await axiosClient.delete(`/cart/delete-cart/${idUser}`, {
                data: Prod,
            });
            // await getCart();

            return res.data.msg;
        } catch (error) {
            console.log('error deleteCart', error)
            return;
        }
    };

    const getCart = async () => {
        getToken();

        try {
            const res = await axiosClient.get("/cart/get-cart");
            console.log(res.data.cart)
            dispatch({
                type: "GET_CART",
                payload: res.data.cart,  //??
            });
        } catch (error) {
            console.log('Error GetCart', error)
            return;
        }
    };

    const seeCart = async (idCart) => {
        getToken();

        try {
            if (idCart) {
                const res = await axiosClient.get(`/cart/cart/${idCart}`);
                console.log('(153) carro user', res.data.cart)
                dispatch({
                    type: "SEE_CART",
                    payload: res.data.cart,  //??
                });
            }

        } catch (error) {
            console.log('Error seeCart', error)
            return;
        }
    };

    //getCheckoutSession
    const getCheckoutSession = async (idUser) => {
        getToken();

        try {
            const res = await axiosClient.get(`cart/create-checkout-session/${idUser}`);

            dispatch({
                type: "GET_CHECKOUT_SESSION",
                payload: res.data.session_url,
            });
        } catch (error) {
            console.log('Error getCheckoutSession', error)
        }

    };

    // 4. RETORNO DE ESTADO GLOBAL
    return (
        <UserContext.Provider value={{
            user: globalState.user,
            cart: globalState.cart,
            errorC: globalState.errorC,
            authStatus: globalState.authStatus,
            loading: globalState.loading,
            sessionURL: globalState.sessionURL,
            registerUser,
            loginUser,
            verifyingToken,
            logOutUser,
            updateUser,
            getCart,
            editCart,
            seeCart,
            getCheckoutSession,
            deleteCart,
            editCart2
        }}>

            {props.children}

        </UserContext.Provider>
    )
}
export default UserState