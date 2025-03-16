import React from "react"

const UserReducer = (globalState, action) => {

    switch (action.type) {
        case "LOGIN_EXITOSO":
        case "REGISTRO_EXITOSO":
            localStorage.setItem("token", action.payload)

            return {
                ...globalState,
                errorC: null,
                authStatus: true,
            }
        case "REGISTRO_FALLO":
            return {
                ...globalState,
                authStatus: false,
                user: null,
                loading: false,
                errorC: action.payload
            }
        case "OBTENER_USUARIO":
            return {
                ...globalState,
                authStatus: true,
                errorC: null,
                user: action.payload
            }
        case "MOD_USUARIO":
            return {
                ...globalState,
                authStatus: true,
                errorC: null,
                user: action.payload
            }
        case "CERRAR_SESION":
            localStorage.removeItem('token')
            return {
                ...globalState,
                user: null,
                errorC: null,
                authStatus: null,
                loading: false
            }
        case "GET_CART":
        case "SEE_CART":
            return {
                ...globalState,
                errorC: null,
                cart: action.payload,
            };
        case "GET_CHECKOUT_SESSION":
            return {
                ...globalState,
                errorC: null,
                sessionURL: action.payload,
            };
        default:
            return globalState
    }

}

export default UserReducer
