import { db } from "../data/db"
import { CartItem, Guitar } from "../types/types"


export type CartActions = 
    //definiendo las acciones y los parametros que toman
    {type: 'add-to-cart', payload: {item: Guitar} } |
    {type: 'remove-from-cart', payload: {id: Guitar['id']}} |
    {type: 'decrease-quantity', payload: {id: Guitar['id']}} |
    {type: 'increase-quantity', payload: {id: Guitar['id']}} |
    {type: 'clear-cart'}

//definiendo los states
export type CartState = {
    data: Guitar[],
    cart: CartItem[]
}

//local storage
const initialCart = () : CartItem[] => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
}

//creando el state inicial, como va a iniciar el state previamente definido
export const initialState : CartState = {
    //db es la base de datos
    data: db,
    cart: initialCart()
}

const MAX_ITEM = 5;
const MIN_ITEM = 1;

//definiendo el reducer y su logica, toma como parametros el state junto con el state inicial y las acciones
export const cartReducer = (state: CartState = initialState, action: CartActions) => {

    //definiendo la logica del reducer
    //añadir al carrito ------------------------------------------------------------------------------------
    if (action.type === 'add-to-cart'){
        

//verificar si un elemento existe o no en un arreglo
const itemExists = state.cart.find(guitar => guitar.id === action.payload.item.id);

let updatedCart: CartItem[] = [];

if (itemExists) {
    updatedCart = state.cart.map(item => {
        if (item.id === action.payload.item.id) {
            // Si ya alcanzó la cantidad máxima, no se incrementa
            if (item.quantity < MAX_ITEM) {
                return { ...item, quantity: item.quantity + 1 };
            }
        }
        return item;
    });
} else {
    // Agregamos el nuevo item con cantidad 1
    const newItem: CartItem = {
        ...action.payload.item,
        quantity: 1
    };
    updatedCart = [...state.cart, newItem];
}

return {
    ...state,
    cart: updatedCart
};
    }
    //reducir la cantidad de elementos del carrito ---------------------------------------------------------
    if(action.type === 'decrease-quantity'){
        const updatedCart = state.cart.map (item => {
            if (item.id === action.payload.id && item.quantity > MIN_ITEM) {
            return{
                ...item,
                quantity : item.quantity-1
            }
            }
            return item;
            })
        return {
            ...state,
            cart: updatedCart
        }
    }

    //aumentar la cantidad de elementos del carrito ---------------------------------------------------------
    if(action.type === 'increase-quantity'){

        const updatedCart = state.cart.map (item => {
            if (item.id === action.payload.id && item.quantity < MAX_ITEM) {
            return{
                ...item,
                quantity: item.quantity+1
            }
            }
            return item;
            })
        return {
            ...state,
            cart: updatedCart
        }
    }

    //eliminar del carrito ----------------------------------------------------------------------------------
    if(action.type === 'remove-from-cart'){
        const cart = state.cart.filter( item => item.id !== action.payload.id)
        return {
            ...state,
            cart
        }
    }

    //limpiar carrito ----------------------------------------------------------------------------------------
    if(action.type === 'clear-cart'){
        return {
            ...state,
            cart: []
        }
    }

    return state

}