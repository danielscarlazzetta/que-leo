'use client'

import { useCartStore } from "@/store"
import { currencyFormat } from "@/utils"
import Image from "next/image"
import { useEffect, useState } from "react"


export const ProductInCart = () => {

    const [loaded, setLoaded] = useState(false);
    const productInCart = useCartStore(state => state.cart);


    useEffect(() => {
        setLoaded(true)
    }, [])


    if (!loaded) {
        return '<p> cargando... <p/>'
    }

    return (
        <>
            {
                productInCart.map(p => (
                    <div key={`${p.slug}-${p.size}`} className="flex mt-5">
                        <Image
                            src={`/products/${p.image}`}
                            width={150}
                            height={100}
                            alt={p.title}
                            className="mr-5 rounded">

                        </Image>
                        <div>
                            <span >
                                <p>{p.size} - {p.title} {p.quantity}</p>
                            </span>
                            <p className="font-bold"> { currencyFormat(p.price * p.quantity)}</p>

                        </div>

                    </div>
                ))
            }
        </>
    )
}