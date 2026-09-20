"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Eye, EyeOff, LockKeyhole, Mail, UserRound, X } from "lucide-react";

export default function AuthModal({ isOpen, onClose }) {
    const [mode, setMode] = useState("login");
    const [showPassword, setShowPassword] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!isOpen) return;

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, onClose]);

    if (!mounted || !isOpen) {
        return null;
    }

    const isLogin = mode === "login";

    const handleGoogleLogin = () => {
        // FUTURAMENTE:
        // Firebase Authentication + Google
        console.log("Login com Google");
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // FUTURAMENTE:
        // Firebase Authentication
        if (isLogin) {
            console.log("Login com e-mail e senha");
        } else {
            console.log("Cadastro com nome, e-mail e senha");
        }
    };

    return createPortal(
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">

            <button
                type="button"
                aria-label="Fechar modal"
                onClick={onClose}
                className="absolute inset-0 h-full w-full cursor-default bg-black/50 backdrop-blur-sm"
            />

            <div className="relative z-10 max-h-[calc(100dvh-32px)] w-full max-w-md overflow-y-auto rounded-2xl border border-gray/30 bg-white shadow-2xl">

                <div className="sticky top-0 z-20 h-1 w-full bg-yellow" />

                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Fechar"
                    className="absolute right-4 top-5 z-30 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-darkGray transition-colors duration-200 hover:bg-gray/20 hover:text-black"
                >
                    <X size={19} strokeWidth={1.8} />
                </button>

                <div className="p-6 sm:p-8">

                    <div className="mb-7 pr-10">
                        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-yellow/10 text-yellow">
                            <UserRound size={21} strokeWidth={1.8} />
                        </div>

                        <h2 className="text-2xl font-semibold tracking-tight text-black">
                            {isLogin ? "Bem-vindo de volta" : "Crie sua conta"}
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-darkGray">
                            {isLogin
                                ? "Entre para acompanhar seus pedidos e continuar suas compras."
                                : "Cadastre-se para acompanhar pedidos e ter uma experiência mais rápida."}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-gray/40 bg-white px-4 py-3 text-sm font-semibold text-black transition-all duration-200 hover:border-gray hover:bg-gray/10"
                    >
                        <GoogleIcon />

                        Continuar com Google
                    </button>

                    <div className="my-6 flex items-center gap-4">
                        <span className="h-px flex-1 bg-gray/40" />

                        <span className="text-[11px] font-medium uppercase tracking-wider text-darkGray">
                            ou continue com e-mail
                        </span>

                        <span className="h-px flex-1 bg-gray/40" />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        {!isLogin && (
                            <div>
                                <label htmlFor="name" className="mb-2 block text-xs font-semibold text-black">
                                    Nome completo
                                </label>

                                <div className="relative">
                                    <UserRound
                                        size={17}
                                        strokeWidth={1.8}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-darkGray"
                                    />

                                    <input
                                        id="name"
                                        type="text"
                                        placeholder="Digite seu nome"
                                        required
                                        className="w-full rounded-xl border border-gray/40 bg-white py-3 pl-11 pr-4 text-sm text-black outline-none transition-all duration-200 placeholder:text-darkGray/70 focus:border-yellow focus:ring-2 focus:ring-yellow/10"
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label htmlFor="email" className="mb-2 block text-xs font-semibold text-black">
                                E-mail
                            </label>

                            <div className="relative">
                                <Mail
                                    size={17}
                                    strokeWidth={1.8}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-darkGray"
                                />

                                <input
                                    id="email"
                                    type="email"
                                    placeholder="seuemail@exemplo.com"
                                    required
                                    className="w-full rounded-xl border border-gray/40 bg-white py-3 pl-11 pr-4 text-sm text-black outline-none transition-all duration-200 placeholder:text-darkGray/70 focus:border-yellow focus:ring-2 focus:ring-yellow/10"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="mb-2 flex items-center justify-between">
                                <label htmlFor="password" className="text-xs font-semibold text-black">
                                    Senha
                                </label>

                                {isLogin && (
                                    <button
                                        type="button"
                                        className="cursor-pointer text-xs font-medium text-darkGray transition-colors duration-200 hover:text-yellow"
                                    >
                                        Esqueci minha senha
                                    </button>
                                )}
                            </div>

                            <div className="relative">
                                <LockKeyhole
                                    size={17}
                                    strokeWidth={1.8}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-darkGray"
                                />

                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder={isLogin ? "Digite sua senha" : "Crie uma senha"}
                                    required
                                    minLength={6}
                                    className="w-full rounded-xl border border-gray/40 bg-white py-3 pl-11 pr-12 text-sm text-black outline-none transition-all duration-200 placeholder:text-darkGray/70 focus:border-yellow focus:ring-2 focus:ring-yellow/10"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword((current) => !current)}
                                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-darkGray transition-colors duration-200 hover:text-black"
                                >
                                    {showPassword ? (
                                        <EyeOff size={17} strokeWidth={1.8} />
                                    ) : (
                                        <Eye size={17} strokeWidth={1.8} />
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="mt-2 w-full cursor-pointer rounded-xl bg-black px-5 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-yellow hover:text-black"
                        >
                            {isLogin ? "Entrar na minha conta" : "Criar minha conta"}
                        </button>
                    </form>

                    <div className="mt-7 border-t border-gray/30 pt-6 text-center">
                        <span className="text-sm text-darkGray">
                            {isLogin
                                ? "Ainda não possui uma conta?"
                                : "Já possui uma conta?"}
                        </span>

                        <button
                            type="button"
                            onClick={() => {
                                setMode(isLogin ? "register" : "login");
                                setShowPassword(false);
                            }}
                            className="ml-1.5 cursor-pointer text-sm font-semibold text-black transition-colors duration-200 hover:text-yellow"
                        >
                            {isLogin ? "Cadastre-se" : "Entrar"}
                        </button>
                    </div>

                </div>
            </div>
        </div>,
        document.body
    );
}

function GoogleIcon() {
    return (
        <svg width="19" height="19" viewBox="0 0 24 24" aria-hidden="true">
            <path
                fill="#4285F4"
                d="M21.6 12.23c0-.71-.06-1.4-.18-2.07H12v3.92h5.38a4.6 4.6 0 0 1-2 3.02v2.54h3.24c1.9-1.75 2.98-4.33 2.98-7.41Z"
            />
            <path
                fill="#34A853"
                d="M12 22c2.7 0 4.97-.9 6.63-2.43l-3.24-2.54c-.9.6-2.05.96-3.39.96-2.61 0-4.82-1.76-5.61-4.13H3.04v2.62A10 10 0 0 0 12 22Z"
            />
            <path
                fill="#FBBC05"
                d="M6.39 13.86A6 6 0 0 1 6.08 12c0-.65.11-1.28.31-1.86V7.52H3.04A10 10 0 0 0 2 12c0 1.61.38 3.14 1.04 4.48l3.35-2.62Z"
            />
            <path
                fill="#EA4335"
                d="M12 6.01c1.47 0 2.79.51 3.83 1.5l2.87-2.87A9.63 9.63 0 0 0 12 2a10 10 0 0 0-8.96 5.52l3.35 2.62C7.18 7.77 9.39 6.01 12 6.01Z"
            />
        </svg>
    );
}