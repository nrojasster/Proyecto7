import React from "react"

const UserReducer = (globalState, action) => {

    switch (action.type) {
        case "LOGIN_EXITOSO":
        case "REGISTRO_EXITOSO":
            localStorage.setItem("token", action.payload)

            return {
                ...globalState,
                authStatus: true,
            }
        case "OBTENER_USUARIO":
            return {
                ...globalState,
                authStatus: true,
                user: action.payload
            }
        case "MOD_USUARIO":
            return {
                ...globalState,
                authStatus: true,
                user: action.payload
            }
        case "CERRAR_SESION":
            localStorage.removeItem('token')
            return {
                ...globalState,
                user: null,
                authStatus: null,
                loading: false
            }
        case "GET_CART":
        case "SEE_CART":
            return {
                ...globalState,
                cart: action.payload,
            };
        case "GET_CHECKOUT_SESSION":
            return {
                ...globalState,
                sessionURL: action.payload,
            };
        default:
            return globalState
    }

}

export default UserReducer
