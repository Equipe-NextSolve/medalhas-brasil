import Link from "next/link";

import SocialButton, { socialLinks } from "./SocialLinks";

const storeLinks = [
    {
        id: "produtos",
        label: "Todos os produtos",
        href: "/produtos",
    },
    {
        id: "trofeus",
        label: "Troféus",
        href: "/produtos/trofeus",
    },
    {
        id: "medalhas",
        label: "Medalhas",
        href: "/produtos/medalhas",
    },
    {
        id: "personalizados",
        label: "Personalizados",
        href: "/produtos/personalizados",
    },
];

const institutionalLinks = [
    {
        id: "sobre",
        label: "Sobre nós",
        href: "/About",
    },
    {
        id: "eventos",
        label: "Eventos",
        href: "/eventos",
    },
    {
        id: "orcamento",
        label: "Orçamentos",
        href: "/budget",
    },
    {
        id: "contato",
        label: "Fale conosco",
        href: "/contato",
    },
];

const linkClass =
    "w-fit text-sm font-medium text-gray transition-all duration-300 hover:translate-x-1 hover:text-yellow";

export default function NavFooter() {
    return (
        <nav className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">

            <div>
                <div className="mb-5 flex items-center gap-2">
                    <span className="h-4 w-0.5 rounded-full bg-yellow" />

                    <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-white">
                        Loja
                    </h3>
                </div>

                <div className="flex flex-col gap-3">
                    {storeLinks.map((link) => (
                        <Link
                            key={link.id}
                            href={link.href}
                            className={linkClass}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>

            <div>
                <div className="mb-5 flex items-center gap-2">
                    <span className="h-4 w-0.5 rounded-full bg-yellow" />

                    <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-white">
                        Institucional
                    </h3>
                </div>

                <div className="flex flex-col gap-3">
                    {institutionalLinks.map((link) => (
                        <Link
                            key={link.id}
                            href={link.href}
                            className={linkClass}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>

            <div className="col-span-2 sm:col-span-1">
                <div className="mb-5 flex items-center gap-2">
                    <span className="h-4 w-0.5 rounded-full bg-yellow" />

                    <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-white">
                        Acompanhe
                    </h3>
                </div>

                <p className="mb-5 max-w-48 text-sm font-medium leading-6 text-gray">
                    Acompanhe novidades, produtos e nossos últimos trabalhos.
                </p>

                <div className="flex items-center gap-2">
                    {socialLinks.map((social) => (
                        <SocialButton
                            key={social.id}
                            {...social}
                        />
                    ))}
                </div>
            </div>

        </nav>
    );
}