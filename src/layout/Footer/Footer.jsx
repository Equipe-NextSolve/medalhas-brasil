import Image from "next/image"
import NavFooter from "./NavFooter"

export default function Footer() {
    return (
        <footer className="min-h-80 bg-darkGray w-full flex flex-col items-center relative justify-between mt-20"
            style={{ background: "linear-gradient(180deg, #1a1a1a 0%, #141414 50%, #0D0D0D 100%)" }}
        >
            <div className="flex flex-col sm:flex-row items-center justify-around w-full sm:mt-8">
                <Image
                    src="/logo2.png"
                    alt="Logo"
                    width={140}
                    height={140}
                />
                <NavFooter/>
            </div>
            <p className="bg-black h-10 w-full text-gray text-center flex items-center justify-center mt-7 text-sm sm:text-base sm:mt-0">© 2025  Design Acessorios. Todos os direitos reservados.</p>
        </footer>
    )
}
