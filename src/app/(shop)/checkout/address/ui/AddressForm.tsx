'use client'

import type { Address, Country } from "@/interface";
import clsx from "clsx";
import { useForm } from "react-hook-form"
import { IoWalletOutline } from "react-icons/io5"

import regionesData from './comunas-regiones.json';
import { useEffect, useState } from "react";
import { useAddressStore } from "@/store";
import { deleteUserAddress, setUserAddress } from "@/actions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type FormInputs = {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    postalCode: string;
    city: string;
    country: string;
    phone: string;
    rememberAddress?: boolean;
    // Funcion realizada solo para chile
    region?: string;
    comuna?: string;
}

interface Props {
    countries: Country[];
    userStoredAddress?: Partial<Address>;
}


export const AddressForm = ({ countries, userStoredAddress = {} }: Props) => {

    const router = useRouter ()

    const { handleSubmit, register, formState: { isValid }, reset } = useForm<FormInputs>({
        defaultValues: {
            //Todo: leer de la base de datos
            ...(userStoredAddress as any),
            rememberAddress: false,
        }
    });

    const { data: session } = useSession({
        required: true,
    }); 

    //guardarlo en localstorage
    const setAddress = useAddressStore( state => state.setAddress);
    const address = useAddressStore( state => state.address);

    useEffect(() => {
        if( address.firstName){
            reset(address)
        }
    }, [address, reset])

    const onSubmit = async (data: FormInputs) => {
        console.log({ data })
        
        const {rememberAddress, ...restAddress} = data;
        setAddress(restAddress);

        if( rememberAddress ){
            await setUserAddress( restAddress, session!.user.id )
        }else{
            await deleteUserAddress( session!.user.id )
        }

        router.push('/checkout');
    }

    // Regiones y demas
    const [selectedRegion, setSelectedRegion] = useState('');
    const [comunas, setComunas] = useState<string[]>([]);

    const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const region = e.target.value;
        setSelectedRegion(region);

        // Busca las comunas de la región seleccionada
        const foundRegion = regionesData.regiones.find(r => r.region === region);
        setComunas(foundRegion ? foundRegion.comunas : []);
    };


    return (

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2">
            <div className="flex flex-col mb-2">
                <span>Nombres</span>
                <input
                    type="text"
                    className="p-2 border rounded-md bg-gray-200"
                    {...register('firstName', { required: true })}
                />
            </div>

            <div className="flex flex-col mb-2">
                <span>Apellidos</span>
                <input
                    type="text"
                    className="p-2 border rounded-md bg-gray-200"
                    {...register('lastName', { required: true })}
                />
            </div>

            <div className="flex flex-col mb-2">
                <span>Dirección</span>
                <input
                    type="text"
                    className="p-2 border rounded-md bg-gray-200"
                    {...register('address', { required: true })}
                />
            </div>

            <div className="flex flex-col mb-2">
                <span>Dirección 2 (opcional)</span>
                <input
                    type="text"
                    className="p-2 border rounded-md bg-gray-200"
                    {...register('address2')}
                />
            </div>


            <div className="flex flex-col mb-2">
                <span>Código postal</span>
                <input
                    type="text"
                    className="p-2 border rounded-md bg-gray-200"
                    {...register('postalCode', { required: true })}
                />
            </div>

            <div className="flex flex-col mb-2">
                <span>Ciudad</span>
                <input
                    type="text"
                    className="p-2 border rounded-md bg-gray-200"
                    {...register('city', { required: true })}
                />
            </div>

            <div className="flex flex-col mb-2">
                <span>País</span>
                <select
                    className="p-2 border rounded-md bg-gray-200"
                    {...register('country', { required: true })}
                >
                    <option value="">[ Seleccione ]</option>
                    {
                        countries.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))
                    }
                </select>
            </div>


            <div className="flex flex-col mb-2">
                <span>Teléfono</span>
                <input
                    type="text"
                    className="p-2 border rounded-md bg-gray-200"
                    {...register('phone', { required: true })}
                />
            </div>



            <div className="flex flex-col mb-2">
                <span>Region</span>
                <select
                    id="region"
                    value={selectedRegion}
                    className="p-2 border rounded-md bg-gray-200"
                    {...register('region', {
                        onChange: (e) => {
                          handleRegionChange(e);
                        }
                      })}
                >
                    <option value="">[ Seleccione ]</option>

                    {regionesData.regiones.map((region) => (
                        <option key={region.region} value={region.region}>
                            {region.region}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col mb-2">
                <span>Comuna</span>
                <select
                    id="comuna"
                    disabled={!selectedRegion}
                    className="p-2 border rounded-md bg-gray-200"
                    {...register('comuna', { required: true })}
                >
                    <option value="">[ Seleccione ]</option>

                    {comunas.map((comuna) => (
                        <option key={comuna} value={comuna}>
                            {comuna}
                        </option>
                    ))}
                </select>
            </div>





            

            <div className="flex flex-col mb-2 sm:mt-1">

                <div className="inline-flex items-center sm:mb-10">
                    <label
                        className="transition-all relative flex cursor-pointer items-center rounded-full p-3"
                        htmlFor="checkbox"
                    >
                        <input
                            type="checkbox"
                            className="border-pink-700 before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:bg-pink-500 checked:before:bg-pink-500 hover:before:opacity-10"
                            id="checkbox"
                            {...register('rememberAddress')}
                        />
                        <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3.5 w-3.5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                stroke="currentColor"
                                strokeWidth="1"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </div>
                    </label>
                    <span>¿Recordar dirección?</span>
                </div>

                <button
                    // href='/checkout'
                    disabled={!isValid}
                    type="submit"
                    className={clsx({
                        "group relative inline-flex items-center overflow-hidden rounded  bg-pink-400 px-8 py-3 text-white focus:outline-none active:bg-pink-600": isValid,
                        "btn-disabled ": !isValid
                    })
                    }
                >
                    <span className="absolute -end-full transition-all group-hover:end-4">
                        <IoWalletOutline />
                    </span>

                    Siguiente
                </button>
            </div>


        </form >
    )
}