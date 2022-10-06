import { ADD_TO_CART, REMOVE_FROM_CART, SAVE_SHIPPING_INFO } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [], shippingInfo: {} } , action) => {
    switch(action.type) {
        case ADD_TO_CART: 
        const item = action.payload;
        const doesItemExists = state.cartItems.find(i => i.product === item.product);
        if(doesItemExists) {
            return {
                ...state,
                cartItems: state.cartItems.map(i => i.product === doesItemExists.product ? item : i)
            }
        } else {
            return {
                ...state,
            cartItems: [...state.cartItems, item]
            }
        }

        case REMOVE_FROM_CART: 
        return {
            ...state,
            cartItems: state.cartItems.filter(item => item.product !== action.payload)
        }

        case SAVE_SHIPPING_INFO: 
        return {
            ...state,
            shippingInfo: action.payload
        }

        default: 
        return state;
    }
}