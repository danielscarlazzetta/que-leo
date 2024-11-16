import { Title } from "@/components";
import Link from "next/link";
import { ProductInCart } from "./ui/ProductInCart";
import { OrderSumary } from "./ui/orderSumary";



export default function CartPage() {


    //si el carrito esta vacio usar el redirect
    //redirect('/empty/');


    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">

            <div className="flex flex-col w-[1000px] bg-gray-200 p-5 rounded-xl">
                <Title title="Carrito" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    {/* Cart */}

                    <div className="flex flex-col mt-5">
                        <span className="text-xl ">
                            Agregar mas Items {' '}
                            <Link href='/' className="underline mb-5">
                                 Continua comprando
                            </Link>
                        </span>
                    {/* Items */}

                   <ProductInCart
                    />

                    </div>

                    {/* Checkout - resumen orden */}

                    <div className="bg-white rounded-xl shadow-xl p-7 h-[280px]">
                        <h2 className="text-2xl mb-2">Resumen compra</h2>

                        <OrderSumary />

                        <div className="mt-10 w-full">
                            <Link 
                            className="flex justify-center rounded bg-pink-400 hover:bg-pink-500  transition-all text-white text-lg"
                            href='/checkout/address'>
                            CheckOut
                            </Link>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
}