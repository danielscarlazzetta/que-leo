'use client'

import clsx from "clsx";
import Link from "next/link"
import { SubmitHandler, useForm } from "react-hook-form";
import { login, registerUser } from "@/actions";
import { useState } from "react";

import { FaUserInjured } from "react-icons/fa";
import { MdOutlineMailLock } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";


type FormInputs = {
    name: string;
    email: string;
    password: string;
}


export const RegisterForm = () => {

    const [errorMenssage, setErrorMessage] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        setErrorMessage('')
        const { name, email, password } = data;

        // server action
        const resp = await registerUser(name, email, password);

        if (!resp.ok) {
            setErrorMessage(resp.message);
            return;
        }

        await login(email.toLowerCase(), password);
        window.location.replace('/')
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">

            {
                errors.name?.type === 'required' && (
                    <span className="text-red-500 inline-flex items-center"><FaUserInjured size={20} /> Nombre obligatorio</span>
                )
            }

            <label htmlFor="email">Nombre Completo</label>
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5",
                        {
                            "border-red-500": errors.name
                        }
                    )
                }
                type="text"
                autoFocus
                {...register('name', { required: true })} />


            {
                errors.email?.type === 'required' && (
                    <span className="text-red-500 inline-flex items-center"><MdOutlineMailLock /> Correo Obligatorio</span>
                )
            }

            <label htmlFor="email">Correo electrónico</label>
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5",
                        {
                            "border-red-500": errors.email
                        }
                    )
                }
                type="email"
                { ...register('email', { required: true, pattern: /^\S+@\S+$/i }) } />

            {
                errors.password?.type === 'required' && (
                    <span className="text-red-500 inline-flex items-center"><RiLockPasswordLine />Correo Obligatorio</span>
                )
            }
            <label htmlFor="email">Contraseña</label>
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5",
                        {
                            "border-red-500": errors.password
                        }
                    )
                }
                type="password"
                {...register('password', { required: true, minLength: 5 })} />

           <span className="text-red-500 mb-6">{ errorMenssage }</span>

            <button
                className="btn-primary">
                Crear cuenta
            </button>


            {/* divisor l ine */}
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-600">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link
                href="/auth/login"
                className="btn-secondary text-center">
                ingresar
            </Link>

        </form>
    )
}