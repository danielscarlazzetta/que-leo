'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const getOrderByUser = async () => {

    const session = await auth();

    if( !session?.user ){
        return{
            ok: false,
            messagge: 'El usuario debe estar autenticado',
        }
    }

    const orders = await prisma.order.findMany({
        where: {
            userId: session.user.id,
        },
        include: {
            OrderAddress: {
                select:{
                    firstName: true,
                    lastName: true,

                    address: true,
                    comuna: true,
                    region: true,
                }
            }
        },
    });


    return {
        ok: true,
        orders: orders,
    }


    
}