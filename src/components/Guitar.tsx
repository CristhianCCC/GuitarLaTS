import type {Guitar} from "../types/types"; //importando el archivo de types.ts
import { ActionDispatch } from "react";
import type { CartActions } from "../reducers/Cart-reducer";

//tipando los props de guitar y addtocart y asignandolo en los props de la funcion para evitar el tipo de dato any
type GuitarProps = {
    guitar : Guitar, 
    dispatch: ActionDispatch<[action: CartActions]>
}


export default function Guitar({guitar,  dispatch} : GuitarProps ){
    

    return (
        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
        <div className="col-4">
            <img className="img-fluid" src={`/img/${guitar.image}.jpg`} alt="imagen guitarra" />
        </div>
        <div className="col-8">
            <h3 className="text-black fs-4 fw-bold text-uppercase">{guitar.name}</h3>
            <p>{guitar.description}</p>
            <p className="fw-black text-primary fs-3">$ {guitar.price}</p>
            <button 
                type="button"
                className="btn btn-dark w-100"
                onClick={() => dispatch({type: 'add-to-cart', payload: {item:guitar}})}
            >Agregar al Carrito</button>
        </div>
    </div>

    );
}