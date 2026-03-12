import { FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";
// import SocialButton, {socialLinks} from "./SocialLinks";
const classNavItems = "text-white cursor-pointer hover:text-yellow transition-all duration-300 hover:translate-x-1";

export default function NavFooter() {
    return (
        <nav className="flex w-[100%] max-w-200 justify-between">
            <div className="flex flex-col gap-2">
                <h2 className="text-yellow text-xl tracking-wider">Institual</h2>
                <p className={classNavItems}>Sobre nós</p>
                <p className={classNavItems}>Política de Privacidade</p>
                <p className={classNavItems}>Orçamentos</p>
            </div>    
            <div className="flex flex-col gap-2">
                <h2 className="text-yellow text-xl tracking-wider">Onde nos Encontrar</h2>
                <p className={classNavItems}>3403 Av. Dr. Silas Munguba</p>
                <p className={classNavItems}>Fortaleza, Ceará</p>
            </div>
            <div className="flex flex-col gap-2">
                <h2 className="text-yellow text-xl tracking-wider">Redes Socias</h2>
                <div className="flex gap-5">
                    <p className={classNavItems}><FaInstagram className="text-2xl"/></p>
                    <p className={classNavItems}><FaEnvelope className="text-2xl"/></p>
                    <p className={classNavItems}><FaWhatsapp className="text-2xl"/></p>
                </div>
            </div>
        </nav>
    )
}
