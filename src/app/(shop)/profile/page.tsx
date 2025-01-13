import { auth } from "@/auth.config";
import { Title } from "@/components";
import { title_font } from "@/config/fonts";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";

interface Props {
    users: User;
}

export default async function ProfilePage({ users }: Props) {

    const session = await auth();

    if (!session?.user) {
        // redirect('auth/login?return=/perfil');
        redirect('/');
    }


    return (
        // <div className="min-h-screen mb-30 flex flex-wrap items-center justify-center gap-10 lg:mx-52">
        <div className="mt-10 mb-80 flex flex-wrap items-center justify-center gap-5 lg:mx-52">
            <div
                className="h-80 relative overflow-hidden w-60 rounded-3xl cursor-pointer text-2xl font-bold bg-pink-500"
            >
                <div className="z-10 absolute w-full h-full peer"></div>
                <div
                    className="absolute peer-hover:-top-20 peer-hover:-left-16 peer-hover:w-[140%] peer-hover:h-[140%] -top-32 -left-16 w-32 h-44 rounded-full bg-pink-300 transition-all duration-500"
                ></div>
                <div
                    className="absolute flex text-xl text-center items-end justify-end peer-hover:right-0 peer-hover:rounded-b-none peer-hover:bottom-0 peer-hover:items-center peer-hover:justify-center peer-hover:w-full peer-hover:h-full -bottom-32 -right-16 w-36 h-44 rounded-full bg-pink-300 transition-all duration-500"
                >
                    <p className={`${title_font.className} antialiased font-bold`}>
                        Nombre: {session.user.name}<br />
                        Email: {session.user.email}<br />
                        Rol: {session.user.role}
                    </p>
                </div>
                <div className={`${title_font.className} antialiased font-bold w-full h-full items-center justify-center flex uppercase`}>
                    {session.user.name}
                </div>
            </div>

            <a href="http://localhost:3000/orders">
                <div
                    className="h-80 relative overflow-hidden w-60 rounded-3xl cursor-pointer text-2xl font-bold bg-purple-500"
                >
                    <div className="z-10 absolute w-full h-full peer"></div>
                    <div
                        className="absolute peer-hover:-top-20 peer-hover:-left-16 peer-hover:w-[140%] peer-hover:h-[140%] -top-32 -left-16 w-32 h-44 rounded-full bg-purple-300 transition-all duration-500"
                    ></div>
                    <div
                        className="absolute flex text-xl text-center items-end justify-end peer-hover:right-0 peer-hover:rounded-b-none peer-hover:bottom-0 peer-hover:items-center peer-hover:justify-center peer-hover:w-full peer-hover:h-full -bottom-32 -right-16 w-36 h-44 rounded-full bg-purple-300 transition-all duration-500"
                    >
                        <p className={`${title_font.className} antialiased font-bold`}>
                            Ordenes
                        </p>
                    </div>
                    <div className={`${title_font.className} antialiased font-bold w-full h-full items-center justify-center flex uppercase`}>
                        Ordenes
                    </div>
                </div>
            </a>
        </div>


    )
}
