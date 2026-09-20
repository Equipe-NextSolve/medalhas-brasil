import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import NavFooter from "./NavFooter";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-darkGray text-white">

            <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 md:py-16 lg:px-8 lg:py-20">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.6fr] lg:gap-16">

                    <div className="max-w-sm">
                        <Link href="/" className="inline-block">
                            <Image
                                src="/logo2.png"
                                alt="Medalhas Brasil"
                                width={150}
                                height={150}
                                className="h-auto w-32 object-contain sm:w-36"
                            />
                        </Link>

                        <p className="mt-5 text-sm font-medium leading-7 text-gray">
                            Transformando conquistas em lembranças através de medalhas, troféus e premiações feitas para momentos especiais.
                        </p>

                        <div className="mt-7 flex flex-col gap-3">

                            <a
                                href="tel:+5585986990288"
                                className="group flex w-fit items-center gap-3 text-sm text-gray transition-colors duration-300 hover:text-white"
                            >
                                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-yellow transition-colors duration-300 group-hover:bg-yellow group-hover:text-black">
                                    <Phone size={15} strokeWidth={1.8} />
                                </span>

                                (85) 98699-0288
                            </a>

                            <a
                                href="mailto:contato@medalhasbrasil.com.br"
                                className="group flex w-fit items-center gap-3 text-sm text-gray transition-colors duration-300 hover:text-white"
                            >
                                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-yellow transition-colors duration-300 group-hover:bg-yellow group-hover:text-black">
                                    <Mail size={15} strokeWidth={1.8} />
                                </span>

                                contato@medalhasbrasil.com.br
                            </a>

                            <div className="flex items-start gap-3 text-sm text-gray">
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-yellow">
                                    <MapPin size={15} strokeWidth={1.8} />
                                </span>

                                <span className="pt-1.5">
                                    Av. Dr. Silas Munguba, 3403
                                    <br />
                                    Fortaleza, Ceará
                                </span>
                            </div>

                        </div>
                    </div>

                    {/* Navegação */}
                    <NavFooter />

                </div>
            </div>

            {/* Linha inferior */}
            <div className="border-t border-white/10">
                <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-5 text-xs text-gray sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">

                    <p>
                        © {currentYear} Medalhas Brasil. Todos os direitos reservados.
                    </p>

                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                        <Link
                            href="/politica-de-privacidade"
                            className="transition-colors duration-300 hover:text-white"
                        >
                            Privacidade
                        </Link>

                        <Link
                            href="/termos"
                            className="transition-colors duration-300 hover:text-white"
                        >
                            Termos de uso
                        </Link>

                        <span>
                            Desenvolvido por{" "}
                            <span className="font-semibold text-white">
                                NextSolve
                            </span>
                        </span>
                    </div>

                </div>
            </div>

        </footer>
    );
}