'use client'

import { QuantitySelector, SizeSelector } from "@/components"
import type { CartProduct, Product, Size } from "@/interface";
import { useCartStore } from "@/store";
import { useState } from "react";
import { IoCartOutline } from "react-icons/io5"


interface Props {
    product: Product;
}



export const AddToCart = ({ product }: Props) => {

    const addProductToCart = useCartStore( state => state.addProductToCart)

    const [size, setSize] = useState<Size | undefined>();
    const [quantity, setQuantity] = useState<number>(1);
    const [posted, setPosted] = useState(false);


    const addToCart = () => {
        setPosted(true);
        if (!size) return;
        console.log({ size, quantity, product })

        const cartProduct: CartProduct = {
            id: product.id,
            slug: product.slug,
            title: product.title,
            price: product.price,
            quantity: quantity,
            size: size,
            image: product.images[0]
        }

        addProductToCart(cartProduct);
        setPosted(false);
        setQuantity(1);
        setSize(undefined);
    }



    return (
        <>
            {/* Mensaje de error, en caso de no seleccionar talla */}
            {
                posted && !size && (
                    <span className="mt-2 text-pink-500 fade-in">Debe seleccionar una talla</span>
                )
            }

            {/* Selector de tallas */}
            <SizeSelector
                selectedSize={size}
                availableSizes={product.sizes}
                onSizeChanged={setSize} />

            {/* Selector de cantidad */}
            <QuantitySelector
                quantity={quantity}
                onQuantityChanged={setQuantity} />

            {/* Selector de Button */}
            {/* <button className="btn-primary my-5">Agregar carrito</button> */}
            <button
                onClick={addToCart}
                className="group relative inline-flex items-center overflow-hidden rounded bg-pink-400 px-8 py-3 text-white focus:outline-none active:bg-pink-600"

            >
                <span className="absolute -end-full transition-all group-hover:end-4">
                    <IoCartOutline />
                </span>

                <span className="text-sm font-medium transition-all group-hover:me-4"> Agregar al carrito </span>
            </button>
        </>
    )
}