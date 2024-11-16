import { Title } from "@/components";
import Link from "next/link";
import { ProductInCart } from "./ui/ProductInCart";
import { PlaceOrder } from "./ui/PlaceOrder";



export default function CheckoutPage() {
    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">

            <div className="flex flex-col w-[1000px]">
                <Title title="Verificar orden" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    {/* Cart */}

                    <div className="flex flex-col mt-5">
                        <span className="text-xl ">
                            Ajustar elementos {' '}
                            <Link href='/cart' className="text-pink-500 mb-5">
                                 Editar carrito
                            </Link>
                        </span>
                    {/* Items */}

                    <ProductInCart />

                    </div>

                    {/* Checkout - resumen orden */}

                    <PlaceOrder />


                </div>
            </div>
        </div>
    );
}