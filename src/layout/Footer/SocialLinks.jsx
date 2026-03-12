'use client'
import Link from "next/link";
import { FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";

export const socialLinks = [
  { icon: FaInstagram, label: "Instagram", href: "#" },
  { icon: FaEnvelope,  label: "Email",     href: "#" },
  { icon: FaWhatsapp,  label: "WhatsApp",  href: "#" },
];

export default function SocialButton({ icon: Icon, label, href }) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="
        flex flex-col items-center gap-1.5 px-3 py-2 w-[30%] max-w-25
        bg-yellow/5 border border-yellow/20 rounded-xl
        transition-all duration-300 ease-in-out
        hover:bg-yellow/15 hover:border-yellow/60
        hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(250,204,21,0.15)]
        no-underline group
      "
    >
      <Icon className="text-2xl text-yellow transition-transform duration-300" />
      
    </Link>
  );
}