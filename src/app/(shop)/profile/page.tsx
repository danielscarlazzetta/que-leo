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
        <div className="min-h-screen mb-20 lg:mx-52 grid grid-cols-1 md:grid-cols-3 gap-5">

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
                <div className="w-full h-full items-center justify-center flex uppercase">
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
                    <div className="w-full h-full items-center justify-center flex uppercase">
                        Ordenes
                    </div>
                </div>

            </a >
        </div>

        //             <div>
        //     <pre>
        //         {
        //             JSON.stringify(session.user, null, 2)
        //         }
        //     </pre>


        //     <h3> {session.user.role}</h3>

        // </div>
    )
}



//   // Obtén datos adicionales del usuario desde Prisma
//   const user = await Prisma.user.findUnique({
//     where: { email: session.user.email },
//   });

//   if (!user) {
//     redirect('/');
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <Title title="Perfil" />
//       <div className="bg-white shadow-md rounded-lg p-6">
//         <div className="flex items-center space-x-4">
//           {/* Imagen de perfil (si tienes una URL) */}
//           {user.profileImage ? (
//             <img
//               src={user.profileImage}
//               alt="Profile"
//               className="w-16 h-16 rounded-full object-cover"
//             />
//           ) : (
//             <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
//               <span className="text-gray-500">Sin Foto</span>
//             </div>
//           )}
//           <div>
//             <h2 className="text-xl font-bold text-gray-800">{user.name || "Usuario Anónimo"}</h2>
//             <p className="text-gray-600">{user.email}</p>
//             <p className="text-sm text-gray-500 capitalize">{user.role}</p>
//           </div>
//         </div>
//         {/* Información adicional */}
//         <div className="mt-6">
//           <h3 className="text-lg font-semibold text-gray-800">Información adicional:</h3>
//           <p className="text-gray-600">Fecha de registro: {new Date(user.createdAt).toLocaleDateString()}</p>
//         </div>
//       </div>
//     </div>
//   );
// }