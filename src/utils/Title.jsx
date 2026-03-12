'use client'
import { motion } from "framer-motion"

export default function Title({label}) {
    return (
       <motion.div
            className="w-[90%] max-w-80 flex flex-col items-center mt-8"
            initial={{ opacity: 0, y: 20 }}        // começa transparente e 20px abaixo
            animate={{ opacity: 1, y: 0 }}         // termina visível na posição
            transition={{ duration: 0.6, ease: 'easeOut' }}
       >
            <div className="inline-block text-center">
                <h1 className="text-black mt-10 text-3xl tracking-wide font-600">{label}</h1>
                <span className="h-0.5 mt-1 bg-yellow w-full block rounded-lg" style={{ boxShadow: '0 3px 5px rgba(0, 0, 0, 0.3)' }}></span>
            </div>
        </motion.div>
    )
}
