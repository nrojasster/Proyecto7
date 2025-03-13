import React from "react"

const ProductsReducer = (globalState, action) => {

    switch(action.type){        
        case "INICIO":
            return {
            ...globalState,
            product: action.payload
            }        
        default:
            return globalState
    }
}
export default ProductsReducer