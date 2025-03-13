import React, { useReducer } from 'react'
import ProductsContext from './ProductsContext'
import ProductsReducer from './ProductsReducer'
import axiosClient from '../../config/axios'

const ProductsState = (props) => {
    // 1. ESTADO INICIAL
    const initialState = {
        product: {
            name: null,
            price: null,
            image: null
        },
        loading: true
    }
    // 2. DISPATCHING Y REDUCERS
    const [globalState, dispatch] = useReducer(ProductsReducer, initialState)
    // 3. FUNCIONES 
    // NOS VAN A AYUDAR A CAPTURAR LOS EVENTOS DE LOS COMPONENTES
    const readAllProducts = async () =>{
        try {
            const res = await axiosClient.get("/product/readall")
            console.log('ProductState?:', res.data.product)
            
            dispatch({
                type: "INICIO",
                payload: res.data.product
            })
        } catch (error) {
            console.log('Error readAllProducts ', error)
        }
    }

    
    // 4. RETORNO DE ESTADO GLOBAL
    return (
        <ProductsContext.Provider value={{
            product: globalState.product,
            loading: globalState.loading,
            readAllProducts,
        }}>

            {props.children}

        </ProductsContext.Provider>
    )
}
export default ProductsState