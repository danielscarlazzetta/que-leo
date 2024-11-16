import { title_font } from "@/config/fonts"
import Link from "next/link"


export const Footer = () => {
    return (
        <div className="flex w-full justify-center text-xs mb-10">
            <Link href='/' className="mx-3">
                <span className={`${title_font.className} antialiased font-bold `}>Teslo {" "}</span>
                <span>| Shop {" "}</span>
                <span>{new Date().getFullYear()}</span>
            </Link>

            <Link href='/' className="mx-3">
                Privacidad y legalidad
            </Link>
            <Link href='/' className="mx-3">
                Ubicacion
            </Link>
        </div>
    )
}