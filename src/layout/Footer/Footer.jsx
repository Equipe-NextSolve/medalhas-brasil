import Image from "next/image"
import NavFooter from "./NavFooter"

export default function Footer() {
    return (

        <footer className="h-80 bg-darkGray w-full flex flex-col items-center relative mt-30">
            <div className="flex items-center justify-around w-full mt-8">
                <Image
                    src="/logo.png"
                    alt="Logo"
                    width={100}
                    height={100}
                />
                <NavFooter/>
            </div>
            <p className="bg-black h-10 w-full text-gray absolute bottom-0 text-center flex items-center justify-center ">
                © 2025  Design Acessorios. Todos os direitos reservados.
            </p>
        </footer>
    )
}
