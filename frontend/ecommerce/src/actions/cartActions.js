import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_CLEAR_ITEMS } from "../constants/cartConstants";

export const addToCart = (id, qty)=> async (dispatch, getState) => {
    const {data} = await axios.get(`/api/product/${id}`)

    dispatch({
        type: CART_ADD_ITEM, 
        payload: {
            product: data._id, 
            productName: data.productName, 
            image: data.image, 
            price: data.price, 
            stockCount: data.stockCount, 
            qty
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM, 
        payload: id,
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const clearCart = () => (dispatch, getState) => {
    dispatch({
        type: CART_CLEAR_ITEMS
    })
    localStorage.removeItem('cartItems')
}