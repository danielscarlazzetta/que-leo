'use server'

import prisma from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';
cloudinary.config(process.env.CLOUDINARY_URL ?? '');


export const deleteProductImage = async(imageId: number, imageUrl: string) => {

    if( !imageUrl.startsWith('http')){
        return{
            ok: false,
            error: 'No se pueden borrar imagenes del FileSystem'
        }
    }

    const imageName = imageUrl
        .split('/')
        .pop()
        ?.split('.')[0] ?? '';
        
            

        try {
            await cloudinary.uploader.destroy( imageName );
            const deleteImage = await prisma.productImage.delete({
                where: {
                    id: imageId,
                },
                select: {
                    product:{
                        select:{
                            slug: true
                        }
                    }
                }
            })

            revalidatePath(`/admin/product/`)
            revalidatePath(`/admin/product/${ deleteImage.product.slug}`)
            revalidatePath(`/product/${ deleteImage.product.slug}`)


        } catch (error) {
            console.log(error)
            return {
                ok: false,
                message: 'No se pudo eliominar la imagen'
            }
            
        }

        console.log({imageName})
}