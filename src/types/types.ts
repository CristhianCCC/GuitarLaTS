
export type Guitar = {
    id: number;
    name: string;
    image: string;
    description: string;
    price: number;
}


//aplicando herencia para poder añadirle el atributo de cantidad al elemento de guitarra en el carrito de compras
export interface CartItem extends Guitar {
quantity: number
}



//otra forma es export type CartItem = Pick<Guitar, 'id' | 'name'> & {quantity: number}