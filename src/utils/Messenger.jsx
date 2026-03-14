"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { BiSolidMessageRounded } from "react-icons/bi"
import { IoClose } from "react-icons/io5"

export default function Messenger() {

    const [open, setOpen] = useState(false)

    const contacts = [
        {
            name: "Diana",
            phone: "5585999863324",
            label: "85 99986-3324"
        },
        {
            name: "Eduarda",
            phone: "5585997636536",
            label: "85 99763-6536"
        },
        {
            name: "Marlon",
            phone: "5585986990288",
            label: "85 98699-0288"
        }
    ]

    return (
        <div className="fixed bottom-6 right-6 z-50">

            {/* POPUP */}
            {open && (
                <div className="mb-4 w-72 rounded-2xl bg-darkGray text-white shadow-2xl p-5 border border-gray/20">

                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-lg">
                            Contato para Orçamentos
                        </h3>

                        <button
                            onClick={() => setOpen(false)}
                            className="text-gray hover:text-white"
                        >
                            <IoClose size={22} />
                        </button>
                    </div>

                    <div className="flex flex-col gap-3">

                        {contacts.map((contact, index) => (
                            <Link
                                key={index}
                                href={`https://wa.me/${contact.phone}`}
                                target="_blank"
                                className="bg-black hover:bg-green transition p-3 rounded-lg flex flex-col"
                            >
                                <span className="font-medium">
                                    {contact.name}
                                </span>

                                <span className="text-sm text-gray">
                                    {contact.label}
                                </span>
                            </Link>
                        ))}

                    </div>

                </div>
            )}

            {/* BOTÃO */}
            <button
                onClick={() => setOpen(!open)}
                className="bg-green hover:scale-110 transition text-white p-4 rounded-full shadow-lg"
            >
                <BiSolidMessageRounded size={26} />
            </button>

        </div>
    )
}