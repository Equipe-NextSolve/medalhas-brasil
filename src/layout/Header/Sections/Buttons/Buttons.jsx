"use client";

import Link from "next/link";
import { Headphones, ShoppingBag, UserRound } from "lucide-react";

export default function Buttons() {
    const cartItems = 0;

    return (
        <div className="flex items-center gap-2">

            <Link href="/contato" className="group hidden items-center gap-2.5 rounded-lg px-3 py-2 transition-all duration-200 hover:bg-gray/20 lg:flex">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow/10 text-yellow transition-all duration-200 group-hover:bg-yellow group-hover:text-black">
                    <Headphones size={18} strokeWidth={1.8} />
                </div>

                <div className="flex flex-col">
                    <span className="text-[11px] font-medium leading-none text-darkGray">
                        Precisa de ajuda?
                    </span>

                    <span className="mt-1 text-sm font-semibold leading-none text-black">
                        Atendimento
                    </span>
                </div>
            </Link>

            <div className="mx-1 hidden h-8 w-px bg-gray/40 lg:block" />

            <Link href="/conta" aria-label="Minha conta" className="group flex items-center gap-2 rounded-lg p-2.5 transition-all duration-200 hover:bg-gray/20">
                <UserRound size={21} strokeWidth={1.8} className="text-black transition-transform duration-200 group-hover:scale-105" />

                <div className="hidden flex-col xl:flex">
                    <span className="text-[11px] font-medium leading-none text-darkGray">
                        Bem-vindo
                    </span>

                    <span className="mt-1 text-sm font-semibold leading-none text-black">
                        Minha conta
                    </span>
                </div>
            </Link>

            <button type="button" aria-label="Abrir carrinho" className="group flex cursor-pointer items-center gap-2 rounded-lg p-2.5 transition-all duration-200 hover:bg-gray/20">
                <div className="relative">
                    <ShoppingBag size={22} strokeWidth={1.8} className="text-black transition-transform duration-200 group-hover:scale-105" />

                    {cartItems > 0 && (
                        <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-yellow px-1 text-[9px] font-bold text-black">
                            {cartItems > 99 ? "99+" : cartItems}
                        </span>
                    )}
                </div>

                <div className="hidden flex-col xl:flex">
                    <span className="text-[11px] font-medium leading-none text-darkGray">
                        Seu carrinho
                    </span>

                    <span className="mt-1 text-sm font-semibold leading-none text-black">
                        {cartItems === 0 ? "Vazio" : `${cartItems} ${cartItems === 1 ? "item" : "itens"}`}
                    </span>
                </div>
            </button>
        </div>
    );
}