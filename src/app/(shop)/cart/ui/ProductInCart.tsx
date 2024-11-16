'use client'

import { ProductImage, QuantitySelector } from "@/components"
import { useCartStore } from "@/store"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { IoTrashOutline } from "react-icons/io5"


export const ProductInCart = () => {

    const [loaded, setLoaded] = useState(false);
    const productInCart = useCartStore(state => state.cart);
    const updateProductQuantity = useCartStore( state => state.updateProductQuantity )
    const removeProduct = useCartStore( state => state.removeProduct )


    useEffect(() => {
        setLoaded(true)
    }, [])


    if (!loaded) {
        return '<p> cargando... cacas <p/>'
    }

    return (
        <>
            {
                productInCart.map(p => (
                    <div key={`${p.slug}-${p.size}`} className="flex mt-5">
                        <ProductImage
                            src={p.image}
                            width={150}
                            height={100}
                            alt={p.title}
                            className="mr-5 rounded" />

                        {/* </Image> */}
                        <div>
                            <Link className="cursor-pointer" href={`/product/${p.slug}`}>
                                <p>{p.size} - {p.title}</p>
                            </Link>
                            <p>$ {p.price}</p>
                            <QuantitySelector
                                quantity={ p.quantity }
                                onQuantityChanged={ quantity => updateProductQuantity(p, quantity)} />

                            <button
                                onClick={ () => removeProduct(p) }
                                className="group relative inline-flex items-center overflow-hidden rounded bg-red-500 px-8 py-3 text-white focus:outline-none active:bg-red-500"

                            >
                                <span className="absolute -end-full transition-all group-hover:end-4">
                                    <IoTrashOutline />
                                </span>

                                <span className="text-sm font-medium transition-all group-hover:me-4"> Remover </span>
                            </button>
                        </div>

                    </div>
                ))
            }
        </>
    )
}