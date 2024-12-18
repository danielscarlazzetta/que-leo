'use server'

import prisma from "@/lib/prisma";

export const getProductBySlug = async(slug : string) => {

    try {

        const product = await prisma.product.findFirst({
            include: {
                // ProductImage: true,
                ProductImage: {
                    select: {
                        url: true,
                        id: true,
                    }
                }
            },
            where: {
                slug: slug,
            }
        })

        if(!product) return null;

        return {
            ...product,
            ProductImage: product.ProductImage.map(image => ({
                id: Number(image.id), // Asegúrate de que sea el tipo correcto
                url: image.url,
            })),
            images: product.ProductImage.map(image => image.url),
        };

        // return{
        //     ...product,
        //     images: product.ProductImage.map(image => image.url)
        // }
        
    } catch (error) {
        console.log(error);
        throw new Error('Error al buscar producto por SLUG')
    }

}