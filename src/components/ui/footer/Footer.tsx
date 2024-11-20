import { title_font } from "@/config/fonts"
import Image from "next/image";
import Link from "next/link"
import { IoLogoFacebook, IoLogoInstagram, IoLogoTwitter, IoLogoYoutube } from "react-icons/io5";


export const Footer = () => {
    // return (
    //     <div className="flex w-full justify-center text-xs mb-10">
    //         <Link href='/' className="mx-3">
    //             <span className={`${title_font.className} antialiased font-bold `}>Teslo {" "}</span>
    //             <span>| Shop {" "}</span>
    //             <span>{new Date().getFullYear()}</span>
    //         </Link>

    //         <Link href='/' className="mx-3">
    //             Privacidad y legalidad
    //         </Link>
    //         <Link href='/' className="mx-3">
    //             Ubicacion
    //         </Link>
    //     </div>
    // )

    return (
        <footer className=" text-white py-10" style={{ backgroundColor: "#D2108F" }}>
            <div className="container grid grid-cols-1 md:grid-cols-4 gap-8 sm:mx-8"
                style={{
                    marginLeft: 15,
                    marginRight: 15
                } as React.CSSProperties
                }>
                {/* Logo e íconos sociales */}
                <div>
                    {/* <h1 className="text-2xl font-bold mb-4">Qué Leo</h1> */}
                    <Image
                        src="/imgs/queleo4.jpg"
                        alt="Que leo Shop"
                        width={150}
                        height={50}
                        className="cursor-pointer mt-4 mb-4"
                        priority
                    />
                    <div className="flex space-x-4">
                        <a href="#" aria-label="Facebook" className="text-xl">
                            <IoLogoInstagram className="w-6 h-6" />
                        </a>
                        <a href="#" aria-label="Instagram" className="text-xl">
                            <IoLogoFacebook className="w-6 h-6" />
                        </a>
                        <a href="#" aria-label="Twitter" className="text-xl">
                            <IoLogoTwitter className="w-6 h-6" />
                        </a>
                        <a href="#" aria-label="YouTube" className="text-xl">
                            <IoLogoYoutube className="w-6 h-6" />
                        </a>
                    </div>
                </div>

                {/* Enlaces de navegación */}
                <div>
                    <h2 className="text-lg font-semibold mb-4">Qué Leo</h2>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:underline">Quiénes somos</a></li>
                        <li><a href="#" className="hover:underline">Misión</a></li>
                        <li><a href="#" className="hover:underline">Visión</a></li>
                        <li><a href="#" className="hover:underline">Qué Leo Curicó</a></li>
                    </ul>
                </div>

                {/* Atención al cliente */}
                <div>
                    <h2 className="text-lg font-semibold mb-4">Atención al cliente</h2>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:underline">Devoluciones</a></li>
                        <li><a href="#" className="hover:underline">Formas de envío</a></li>
                        <li><a href="#" className="hover:underline">Preguntas frecuentes</a></li>
                        <li><a href="#" className="hover:underline">Contáctanos</a></li>
                    </ul>
                </div>
                {/* Mapa */}
                <div className="mr-8">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509904!2d-122.08424968509375!3d37.42199987982561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDI1JzEwLjIiTiAxMjLCsDA1JzAyLjAiVw!5e0!3m2!1sen!2sus!4v1634616951918!5m2!1sen!2sus"
                        className="w-full h-48 md:w-96"
                        loading="lazy"
                    ></iframe>
                </div>
            </div>

        </footer>
    );
}