import { useState, useEffect, useMemo } from "react";
import { db } from '../../data/db';
import type { Guitar, CartItem } from "../../types/types";

function useCart()  {

    
const initialCart = () : CartItem[] => {

    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []

}



//añadiendo el useState de db.js
const [data] = useState(db);

//añadiendo el useState del carrito de compras
const [cart, setCart] = useState(initialCart);

const MAX_ITEM = 5;

useEffect(() => {
    localStorage.setItem('cart',  JSON.stringify(cart))
}, [cart])

//funcion para añadir al carro
function addToCart(item: Guitar) {


//verificar si un elemento existe o no en un arreglo
const itemExists = cart.findIndex(guitar => guitar.id === item.id)

if (itemExists >= 0){ 
    const updatedCart = [...cart]
    updatedCart[itemExists].quantity++
    setCart(updatedCart);
}else {
    const newItem : CartItem = {...item, quantity : 1 /*agregando la propiedad de cantidad al objeto de item*/}
    setCart([...cart, newItem])    
    }
}

function removeFromCart (id: Guitar['id']) {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
}

//...item permite que al modificar o crear el nuevo arreglo, se siga mostrando el objeto del carro y que unicamente se modifique la cantidad
function increaseQuantity(id: Guitar['id']) {
    const updatedCart = cart.map (item => {
    if (item.id === id && item.quantity < MAX_ITEM) {
    return{
        ...item,
        quantity: item.quantity+1
    }
    }
    return item;
    })
    setCart(updatedCart);
}

function decreaseQuantity (id: Guitar['id']) {
    const updatedCart = cart.map (item => {
    if (item.id === id && item.quantity > 1) {
    return{
        ...item,
        quantity : item.quantity-1
    }
    }
    return item;
    })
setCart(updatedCart);
}


function clearCart () {
    setCart([])
}

 //State derivado -- para mensaje de carrito vacio o si hay algo en el carrito 
    //implementando usememo el cual toma 2 parametros 1, la funcion que se quiere realizar y 2 el arreglo de dependencias
    //se toma como segundo parametro las dependencias que haran que el usememo se ejecute, como quitar o agregar elementos al carro de compras
    const isEmpty = useMemo(() => cart.length === 0, [cart])
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])

    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        isEmpty,
        cartTotal
    }

}

export default useCart;