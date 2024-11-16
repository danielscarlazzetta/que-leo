import { getOrderById } from "@/actions";
import { OrderStatus, PayPalButton, Title } from "@/components";
import { currencyFormat } from "@/utils";
import Image from "next/image";

import { redirect } from "next/navigation";






interface Props {
    params: {
        id: string;
    },
    // orderId: string;
    // amount: number;
}

export default async function OrdersByIdPage({ params }: Props) {

    const { id } = params;

    //todo llamar server action

    const { ok, order } = await getOrderById(id);

    // console.log(JSON.stringify(order));
    // console.log(order);
    if (!ok) {
        redirect('/')
    }


    const address = order!.OrderAddress;

    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">

            <div className="flex flex-col w-[1000px] bg-gray-200 p-5 rounded-xl">
                <Title title={` Orden #${id.split('-').at(-1)}`} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    {/* Cart */}

                    <div className="flex flex-col mt-5">

                        <OrderStatus isPaid={order?.isPaid ?? false} />

                        {/* Items */}

                        {
                            order!.OrderItem.map(item => (

                                <div key={item.product.slug + ' - ' + item.size} className="flex mt-5">
                                    <Image
                                        src={`/products/${item.product.ProductImage[0].url}`}
                                        width={150}
                                        height={100}
                                        alt={item.product.title}
                                        className="mr-5 rounded">

                                    </Image>
                                    <div>
                                        <p>{item.product.title}</p>
                                        <p>${item.price} x {item.quantity}</p>
                                        <p className="font-bold">Subtotal: {currencyFormat(item.price * item.quantity)}</p>

                                    </div>

                                </div>
                            ))
                        }

                    </div>

                    {/* Checkout - resumen orden */}

                    <div className="bg-white rounded-xl shadow-xl p-7">

                        <h2 className="text-2xl mb-2">Direccion entrega</h2>
                        <div className="mb-10">
                            <p className="text-xl">
                                {address!.firstName} {address!.lastName}
                            </p>
                            <p>{address!.address}</p>
                            <p>{address!.address2}</p>
                            <p>{address!.postalCode}</p>
                            <p>
                                {address!.city}, {address!.countryId}
                            </p>
                            <p>{address!.region} - {address!.comuna}</p>
                            <p>{address!.phone}</p>
                        </div>
                        {/* Divider */}

                        <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

                        <h2 className="text-2xl mb-2">Resumen compra</h2>

                        <div className="grid grid-cols-2">
                            <span>No Producto</span>
                            <span className="text-right">{order?.itemsInOrder === 1 ? '1 Articulo ' : `${order?.itemsInOrder} Articulos`}</span>

                            <span>Sub Total</span>
                            <span className="text-right"> {currencyFormat(order!.subTotal)}</span>

                            <span>+IVA</span>
                            <span className="text-right">{currencyFormat(order!.tax)}</span>

                            <span className="mt-5 text-2xl">Total</span>
                            <span className="mt-5 text-2xl text-right">{currencyFormat(order!.total)}</span>
                        </div>

                        <div className="mt-4 w-full">



                            {
                                order?.isPaid
                                    ? (
                                        <OrderStatus isPaid={order?.isPaid ?? false} />
                                    ) : (
                                        <PayPalButton
                                            amount={order!.total}
                                            orderId={order!.id} />
                                    )
                            }



                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
}