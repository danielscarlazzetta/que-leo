"use client";

import { createUpdateProduct, deleteProductImage } from "@/actions";
import { ProductImage } from "@/components";
import { CategoryProduct, Product, ProductImage as ProductWithImage } from "@/interface";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { RiDeleteBin6Line } from "react-icons/ri";

interface Props {
    product: Partial<Product> & { ProductImage?: { id: number; url: string; }[] };
    // product: Partial<Product> & { ProductImage?: ProductWithImage[] };
    categories: CategoryProduct[]
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];


interface FormInputs {
    title: string;
    slug: string;
    description: string;
    price: number;
    inStock: number;
    sizes: string[];
    tags: string;
    gender: "men" | "women" | "kid" | "unisex";
    categoryId: string;

    images?: FileList;
}


export const ProductForm = ({ product, categories }: Props) => {


    const router =  useRouter();

    const {
        handleSubmit,
        register,
        formState: { isValid },
        getValues,
        setValue,
        watch,

    } = useForm<FormInputs>({
        defaultValues: {
            ...product,
            tags: product.tags?.join(", "),
            sizes: product.sizes ?? [],

            images: undefined,

        }
    });

    watch('sizes');


    const onSizeChanged = (size: string) => {
        const sizes = new Set(getValues('sizes'));
        sizes.has(size) ? sizes.delete(size) : sizes.add(size);
        setValue('sizes', Array.from(sizes))
    }

    const onSubmit = async (data: FormInputs) => {
        // console.log({ data })
        const formData = new FormData();

        const { images, ...productToSave } = data;

        if( product.id){
            formData.append('id', product.id ?? '');
        }
        formData.append('title', productToSave.title);
        formData.append('slug', productToSave.slug);
        formData.append('description', productToSave.description);
        formData.append('price', productToSave.price.toString());
        formData.append('inStock', productToSave.inStock.toString());
        formData.append('sizes', productToSave.sizes.toString());
        formData.append('tags', productToSave.tags);
        formData.append('categoryId', productToSave.categoryId);
        formData.append('gender', productToSave.gender);

        console.log(images)

        if(images){
            for(let i = 0 ; i < images.length; i++ ){
                formData.append('images', images[i]);
            }
        }

        const { ok, product: UpdateProduct } = await createUpdateProduct(formData);
        // const { ok } = await createUpdateProduct(formData);
        console.log({ ok })

        if( !ok ){
            alert('Producto no se pudo actualizar');
            return
        }

        router.replace(`/admin/product/${UpdateProduct?.slug}`)

    }




    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3">
            {/* Textos */}
            <div className="w-full">
                <div className="flex flex-col mb-2">
                    <span className="font-bold text-pink-900 mt-4">Título</span>
                    <input type="text" className="p-2 border rounded-md bg-gray-300"
                        {...register('title', { required: true })}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span className="font-bold text-pink-900 mt-4">Slug</span>
                    <input type="text" className="p-2 border rounded-md bg-gray-300"
                        {...register('slug', { required: true })}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span className="font-bold text-pink-900 mt-4">Descripción</span>
                    <textarea
                        rows={5}
                        className="p-2 border rounded-md bg-gray-300"
                        {...register('description', { required: true })}
                    ></textarea>
                </div>

                <div className="flex flex-col mb-2">
                    <span className="font-bold text-pink-900 mt-4">Precio</span>
                    <input type="number" className="p-2 border rounded-md bg-gray-300"
                        {...register('price', { required: true })}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span className="font-bold text-pink-900 mt-4">Tags</span>
                    <input type="text" className="p-2 border rounded-md bg-gray-300"
                        {...register('tags', { required: true, min: 0 })}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span className="font-bold text-pink-900 mt-4">Gender</span>
                    <select className="p-2 border rounded-md bg-gray-300" {...register('gender', { required: true })}>
                        <option value="">[Seleccione]</option>
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                        <option value="kid">Kid</option>
                        <option value="unisex">Unisex</option>
                    </select>
                </div>

                <div className="flex flex-col mb-2">
                    <span className="font-bold text-pink-900 mt-4">Categoria</span>
                    <select className="p-2 border rounded-md bg-gray-300" {...register('categoryId', { required: true })}>
                        <option value="">[Seleccione]</option>
                        {
                            categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))
                        }
                    </select>
                </div>

                <button className="btn-primary w-full">
                    Guardar
                </button>
            </div>

            {/* Selector de tallas y fotos */}
            <div className="w-full">
                <div className="flex flex-col mb-2">
                    <span className="font-bold text-pink-900 mt-4">Inventario/Stock</span>
                    <input type="number" className="p-2 border rounded-md bg-gray-300"
                        {...register('inStock', { required: true, min: 0 })}
                    />
                </div>
                {/* As checkboxes */}
                <div className="flex flex-col">

                    <span className="font-bold text-pink-900 mt-4">Tallas</span>
                    <div className="flex flex-wrap">

                        {
                            sizes.map(size => (
                                // bg-blue-500 text-white <--- si está seleccionado
                                <div
                                    key={size}
                                    onClick={() => onSizeChanged(size)}
                                    className={
                                        clsx(
                                            'flex items-center cursor-pointer justify-center w-10 h-10 mr-2 border rounded-md transition-all',
                                            {
                                                'bg-pink-500 text-white': getValues('sizes').includes(size)
                                            }
                                        )
                                    }>
                                    <span>{size}</span>
                                </div>
                            ))
                        }

                    </div>


                    <div className="flex flex-col mb-2">

                        <span className="font-bold text-pink-900 mt-4">Fotos</span>
                        <div className="md:flex">
                            <div className="w-full p-3">
                                <div className="relative h-48 rounded-lg border-dashed border-2 border-pink-600 bg-gray-300 flex justify-center items-center">

                                    <div className="absolute">

                                        <div className="flex flex-col items-center">
                                            <i className="fa fa-folder-open fa-4x text-blue-700"></i>
                                            <span className="block text-gray-400 font-normal">Arrastra tus fotos</span>
                                        </div>
                                    </div>

                                    <input type="file"
                                    {...register('images')}
                                    className="h-full w-full opacity-0"
                                    multiple
                                    accept="image/png, image/jpeg, image/avif" />

                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {
                            product.ProductImage?.map((image) => (
                                <div key={image.id}>
                                    <ProductImage
                                        alt={product.title ?? ''}
                                        src={image.url}
                                        // src={`/products/${image.url}`}
                                        width={200}
                                        height={300}
                                        className="rounded-t-3xl shadow-md"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => deleteProductImage(Number(image.id), image.url)}
                                        className="btn-danger mb-2 w-full rounded-b-3xl flex items-center justify-center">
                                        Eliminar
                                        <RiDeleteBin6Line className="ml-2" />
                                    </button>
                                </div>
                            ))
                        }
                    </div>


                </div>
            </div>
        </form>
    );
};