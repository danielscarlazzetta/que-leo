export const revalidate = 60;

// import { notFound } from "next/navigation";

import { getPaginationProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { initialData } from "@/seed/seed";
import { Gender } from "@prisma/client";
import { redirect } from "next/navigation";

// const seedProducts = initialData.products;


interface Props {
    params: {
        gender: string;
    },
    searchParams: {
        page?: string;
    }
}



export default async function GenderByPage({ params, searchParams }: Props) {

    const { gender } = params;

    const page = await (searchParams.page ? parseInt( searchParams.page) : 1);

    const { products, currentPage, totalPages } = await getPaginationProductsWithImages({
        page,
        gender: gender as Gender,
     });

    // console.log({ currentPage })
    // console.log({ totalPages })

    if (products.length === 0) {
        redirect(`/gender/${gender}`);
    }

    //Este filtro funciona si esta en la semilla
    // const products = seedProducts.filter(p => p.gender === id);

    const label: Record<string, string> = {
        'men': 'Hombres',
        'women': 'muejres',
        'kid': 'ninos',
        'unisex': 'Articvulos para Todos'
    }

    // if ( id === 'kids'){
    //     notFound();
    // }

    return (
        <>
            <Title
                title={`Articulos de ${(label as any)[gender]}`}
                subtitle="Todos los productos"
                className="mb-2" />

            <ProductGrid
                products={products} />

            <Pagination
            totalPages={totalPages} />


        </>
    );
}