"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import { Search, X } from "lucide-react";

const products = [
    {
        id: "trofeu-classico-dourado",
        nome: "Troféu Clássico Dourado",
        preco: 189.90,
        categoria: "Troféus",
        descricao: "Troféu dourado para campeonatos, torneios e premiações.",
    },
    {
        id: "trofeu-personalizado",
        nome: "Troféu Personalizado",
        preco: 249.90,
        categoria: "Troféus",
        descricao: "Troféu personalizado para eventos e competições.",
    },
    {
        id: "medalha-dourada",
        nome: "Medalha Dourada",
        preco: 19.90,
        categoria: "Medalhas",
        descricao: "Medalha dourada para campeonatos, corridas e eventos.",
    },
    {
        id: "medalha-prata",
        nome: "Medalha Prata",
        preco: 17.90,
        categoria: "Medalhas",
        descricao: "Medalha prata para competições e premiações.",
    },
    {
        id: "fita-medalha",
        nome: "Fita para Medalha",
        preco: 8.90,
        categoria: "Fitas",
        descricao: "Fita para medalhas de competições e eventos esportivos.",
    },
    {
        id: "cordao-premiacao",
        nome: "Cordão para Premiação",
        preco: 12.90,
        categoria: "Acessórios",
        descricao: "Cordão para medalhas e premiações esportivas.",
    },
];

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const searchRef = useRef(null);

    const fuse = useMemo(() => {
        return new Fuse(products, {
            keys: ["nome", "categoria", "descricao"],
            threshold: 0.35,
            ignoreLocation: true,
        });
    }, []);

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        const searchResults = fuse.search(query).map((result) => result.item);

        setResults(searchResults);
    }, [query, fuse]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleClear = () => {
        setQuery("");
        setResults([]);
        setIsOpen(false);
    };

    return (
        <div ref={searchRef} className="relative z-50 w-full">
            <form onSubmit={(event) => event.preventDefault()} className="w-full">
                <div className="group relative flex w-full items-center rounded-xl border border-gray/40 bg-white transition-all duration-300 focus-within:border-yellow focus-within:shadow-lg">
                    <div className="pl-4 text-darkGray transition-colors duration-300 group-focus-within:text-yellow">
                        <Search size={19} strokeWidth={2} />
                    </div>

                    <input
                        type="text"
                        value={query}
                        placeholder="Busque por troféus, medalhas, acessórios..."
                        className="w-full bg-transparent px-3 py-3 text-sm font-medium text-black outline-none placeholder:font-normal placeholder:text-gray"
                        onChange={(event) => {
                            setQuery(event.target.value);
                            setIsOpen(true);
                        }}
                        onFocus={() => setIsOpen(true)}
                    />

                    {query && (
                        <button type="button" onClick={handleClear} aria-label="Limpar pesquisa" className="mr-4 cursor-pointer text-darkGray transition-colors duration-200 hover:text-black">
                            <X size={18} strokeWidth={2} />
                        </button>
                    )}
                </div>
            </form>

            {isOpen && query.trim() && (
                <div className="absolute left-0 top-full mt-2 max-h-96 w-full overflow-y-auto rounded-xl border border-gray/30 bg-white p-2 shadow-xl">
                    {results.length > 0 ? (
                        <>
                            <div className="flex items-center justify-between px-3 pb-2 pt-1">
                                <span className="text-xs font-medium text-darkGray">
                                    Produtos encontrados
                                </span>

                                <span className="text-xs font-semibold text-yellow">
                                    {results.length} {results.length === 1 ? "resultado" : "resultados"}
                                </span>
                            </div>

                            <ul>
                                {results.map((produto) => (
                                    <li key={produto.id}>
                                        <Link
                                            href={`/produtos/${produto.id}`}
                                            onClick={() => setIsOpen(false)}
                                            className="group/item flex items-center justify-between gap-4 rounded-lg px-3 py-3 transition-colors duration-200 hover:bg-yellow/10"
                                        >
                                            <div className="flex min-w-0 flex-col gap-1">
                                                <span className="truncate text-sm font-semibold text-black transition-colors duration-200 group-hover/item:text-yellow">
                                                    {produto.nome}
                                                </span>

                                                <span className="text-xs font-medium text-darkGray">
                                                    {produto.categoria}
                                                </span>
                                            </div>

                                            <span className="shrink-0 text-sm font-semibold text-black">
                                                {produto.preco.toLocaleString("pt-BR", {
                                                    style: "currency",
                                                    currency: "BRL",
                                                })}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center px-6 py-8 text-center">
                            <Search size={24} strokeWidth={1.5} className="mb-3 text-gray" />

                            <span className="text-sm font-medium text-darkGray">
                                Nenhum produto encontrado para
                            </span>

                            <span className="mt-1 text-sm font-semibold text-black">
                                &quot;{query}&quot;
                            </span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}