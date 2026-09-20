import { Instagram, Mail, MessageCircle } from "lucide-react";

export const socialLinks = [
    {
        id: "instagram",
        icon: Instagram,
        label: "Instagram",
        href: "https://www.instagram.com/medalhas.brasil/",
        external: true,
    },
    {
        id: "email",
        icon: Mail,
        label: "E-mail",

        href: "mailto:contato@medalhasbrasil.com.br",
        external: false,
    },
    {
        id: "whatsapp",
        icon: MessageCircle,
        label: "WhatsApp",
        href: "https://api.whatsapp.com/send/?phone=5585986990288&text&type=phone_number&app_absent=0",
        external: true,
    },
];

export default function SocialButton({
    icon: Icon,
    label,
    href,
    external,
}) {
    return (
        <a
            href={href}
            aria-label={label}
            title={label}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="group flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray transition-all duration-300 hover:-translate-y-1 hover:border-yellow/40 hover:bg-yellow hover:text-black"
        >
            <Icon
                size={18}
                strokeWidth={1.8}
                className="transition-transform duration-300 group-hover:scale-105"
            />
        </a>
    );
}