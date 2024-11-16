'use client'

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useEffect, useState } from "react";

export const OrderSumary = () => {

    const [loaded, setLoaded] = useState(false);

    const { itemsInCart, subsTotal, tax, total } = useCartStore( state => state.getSumaryInformation());
    // const { itemsInCart, subTotal, tax, total } = useCartStore( state => state.getSumaryInformation);

    useEffect( () => {
        setLoaded(true)
    }, [])

    if (!loaded) {
        return 'cargando... '
    }

    return (
        <div className="grid grid-cols-2">
            <span>No Producto</span>
            <span className="text-right">{ itemsInCart === 1 ? '1 Articulo ' : `${ itemsInCart} Articulos`}</span>

            <span>Sub Total</span>
            <span className="text-right"> {currencyFormat(subsTotal)}</span>

            <span>+IVA</span>
            <span className="text-right">{currencyFormat(tax)}</span>

            <span className="mt-5 text-2xl">Total</span>
            <span className="mt-5 text-2xl text-right">{currencyFormat(total)}</span>
        </div>
    )
}