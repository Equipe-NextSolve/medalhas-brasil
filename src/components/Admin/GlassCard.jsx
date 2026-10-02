'use client'
import { motion } from 'framer-motion'

export default function GlassCard({ index = 0, className = '', children }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.06, ease: 'easeOut' }}
            className={`rounded-3xl border border-white/15 bg-white/6 p-5 text-white backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.18)] ${className}`}
        >
            {children}
        </motion.div>
    )
}