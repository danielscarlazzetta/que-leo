'use client'

import { Product } from "@/interface";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


interface Props {
    product: Product;
}

export const ProductGridItem = ({ product }: Props) => {

    const [displayImage, setDisplayImage] = useState(product.images[0]);

    return (
        <div className="rounded-md overflow-hidden fade-in">
            <Link href={`/product/${product.slug}`}>
                <Image
                    src={`/products/${ displayImage}`}
                    alt={product.title}
                    className="w-full object-cover rounded"
                    width={500}
                    height={500}
                    onMouseEnter={ () => setDisplayImage( product.images[1] )}
                    onMouseLeave={ () => setDisplayImage( product.images[0] )}/>
            </Link>

            <div className="p-4 flex flex-col">
                <Link className="hover:text-pink-600 hover:font-bold transition-all" 
                href={`/product/${product.slug}`}>
                    {product.title}
                </Link>
                <span className="font-bold">{product.price}</span>
            </div>
        </div>


        // Todo esto es expiremental, esta sujeto a cambios! junto con el globalCss

        // <div className="rounded-md overflow-hidden fade-in">
        // <div className="rounded fade-in my-8">
        // <>
        //     <Link href={`/product/${product.slug}`} className="rounded fade-in my-8 book">
        //         {/* <div className="book"> */}
        //             <div className="p-4 flex flex-col">
        //                 <Link className="hover:text-pink-600 hover:font-bold transition-all"
        //                     href={`/product/${product.slug}`}>
        //                     {product.title}
        //                 </Link>
        //                 <span className="font-bold text-center mt-20">{product.price}</span>
        //             </div>

        //             {/* <button className="mb-1" type="button">Agregar al carro</button> */}
        //             <div className="fade transition-all">
        //                 <Image
        //                     src={`/products/${displayImage}`}
        //                     alt={product.title}
        //                     className="w-full object-cover rounded imgBook"
        //                     width={500}
        //                     height={500}
        //                 />
        //             </div>
        //         {/* </div> */}
        //     </Link>
        //     {/* </div> */}
        // </>
    );
}