'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';


export const changeOrderSend = async( orderId: string, despacho: boolean ) => {

  const session = await auth();

  if (session?.user.role !== 'admin') {
    return {
        ok: false,
        message: 'Debe de estar autenticado'
    }
}

  try {

    const change = await prisma.order.update({
      where: {
        id: orderId
      },
      data: {
        despacho: despacho
      }
    })

    revalidatePath('/admin/orders');

    // return change;
    return {
      ok: true
    }
    
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'No se pudo realizar el envio, revisar logs'
    }
  }
}