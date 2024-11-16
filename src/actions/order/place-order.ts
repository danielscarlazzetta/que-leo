'use server'

import { auth } from "@/auth.config";
import type { Address, Size } from "@/interface";
import prisma from "@/lib/prisma";


interface ProductToOrder {
    productId: string;
    quantity: number;
    size: Size;
}

export const placeOrder = async (productIds: ProductToOrder[], address: Address) => {

    const session = await auth();
    const userID = session?.user.id;


    // verificar sesion de usuario
    if (!userID) {
        return {
            ok: false,
            message: 'No hay session de usuario'
        }
    }

    // obtener informacion de los productos
    // NOTA: podemos llevar dos productos con el mismo ID
    const products = await prisma.product.findMany({
        where: {
            id: {
                in: productIds.map(p => p.productId)
            }
        }
    });

    // Calcular los montos
    const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0)
    console.log(itemsInOrder)


    const { subTotal, tax, total } = productIds.reduce((totals, item) => {

        const productQuantity = item.quantity;
        const product = products.find(p => p.id === item.productId);

        if (!product) throw new Error(`${item.productId} no existe - 500`);

        const subTotal = product.price * productQuantity;

        totals.subTotal += subTotal;
        totals.tax += subTotal * 0.19;
        totals.total += subTotal * 1.19;



        return totals;

    }, { subTotal: 0, tax: 0, total: 0 })

    // tomar los totales
    //tax, subtotal, total



    try {
        const prismaTx = await prisma.$transaction(async (tx) => {
            // 1. actualizar el stock de los productos

            const updatedProductsPromises = products.map((product) => {

                // Acumular valores
                const productQuantity = productIds.filter(
                    p => p.productId === product.id
                ).reduce((acc, item) => item.quantity + acc, 0)

                if (productQuantity === 0) {
                    throw new Error(`${product.id}, no tiene cantidad definida`)
                }

                return tx.product.update({
                    where: { id: product.id },
                    data: {
                        // no hacer, ya que se usaria la cantidad sin la orden
                        // inStock: product.inStock - productQuantity
                        inStock: {
                            decrement: productQuantity
                        }
                    }
                })
            });

            const updatedProducts = await Promise.all(updatedProductsPromises);

            // verificar valores negativos = no hay stock
            updatedProducts.forEach((product) => {
                if (product.inStock < 0) {
                    throw new Error(`${product.title} no tiene inventario suficiente`);
                }
            });


            // 2. Crear la orden(encabezado-detalle)


            const order = await tx.order.create({
                data: {
                    userId: userID,
                    itemsInOrder: itemsInOrder,
                    subTotal: subTotal,
                    tax: tax,
                    total: total,

                    OrderItem: {
                        createMany: {
                            data:
                                productIds.map((p) => ({
                                    quantity: p.quantity,
                                    size: p.size,
                                    productId: p.productId,
                                    price:
                                        products.find((product) => product.id === p.productId)
                                            ?.price ?? 0,
                                })),
                        },
                    },
                },
            });



            // validar si el precio es 0 lanzar exepcion

            // 3. Dirrecion de orden

            const { country, ...restAddress } = address;
            // const orderAddress = await tx.orderAddress.create({
            //     data: {
            //         ...restAddress,
            //         countryId: country,
            //         orderId: order.id,
            //     },
            // });
            const orderAddress = await tx.orderAddress.create({
                data: {
                    firstName: restAddress.firstName,
                    lastName: restAddress.lastName,
                    address: restAddress.address,
                    address2: restAddress.address2,
                    postalCode: restAddress.postalCode,
                    city: restAddress.city,
                    phone: restAddress.phone,
                    region: restAddress.region,
                    comuna: restAddress.comuna,

                    countryId: country,
                    orderId: order.id,
                },
            });





            console.log({ order })
            console.log(order)

            return {
                updatedProducts: updatedProducts,
                orden: order,
                orderAddress: orderAddress,
            }
        });

        return {
            ok: true,
            order: prismaTx.orden,
            prismaTx: prismaTx,
        }


    } catch (error: any) {
        console.log(error)
        return {
            ok: false,
            message: error.message,
        }
    }



    // Crear lka transaccion de la base de datos




}