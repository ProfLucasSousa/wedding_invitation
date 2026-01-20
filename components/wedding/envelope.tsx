"use client"

import { motion } from "framer-motion"

interface EnvelopeProps {
  isOpen: boolean
  onSealClick: () => void
}

export function Envelope({ isOpen, onSealClick }: EnvelopeProps) {
  return (
    <motion.div
      className="relative w-72 h-52 cursor-pointer"
      animate={isOpen ? { y: -50, opacity: 0, scale: 0.8 } : { y: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Envelope body */}
      <div className="absolute inset-0 bg-white rounded-lg shadow-xl border border-gray-200">
        {/* Envelope flap (back) */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-24 origin-top"
          style={{
            clipPath: "polygon(0 0, 50% 100%, 100% 0)",
            background: "linear-gradient(135deg, #f8f8f8 0%, #e8e8e8 100%)",
          }}
          animate={isOpen ? { rotateX: 180 } : { rotateX: 0 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Inner envelope shadow */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            clipPath: "polygon(0 100%, 50% 20%, 100% 100%)",
            background: "linear-gradient(to bottom, #e0e0e0 0%, #f5f5f5 100%)",
          }}
        />
        
        {/* Envelope front flap */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-36 bg-white border-t border-gray-100"
          style={{
            clipPath: "polygon(0 100%, 50% 30%, 100% 100%)",
          }}
        />
      </div>

      {/* Wax seal */}
      <motion.button
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-20 h-20 rounded-full flex items-center justify-center focus:outline-none"
        style={{
          background: "radial-gradient(circle at 30% 30%, #3d5a4c 0%, #2D4A3E 50%, #1a3028 100%)",
          boxShadow: "0 4px 15px rgba(45, 74, 62, 0.4), inset 0 2px 4px rgba(255,255,255,0.1)",
        }}
        onClick={onSealClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Abrir convite"
      >
        {/* Seal decoration */}
        <div className="absolute inset-2 rounded-full border-2 border-[#4a6b5c]/50" />
        <div className="absolute inset-4 rounded-full border border-[#4a6b5c]/30" />
        
        {/* Seal edges - decorative bumps around the seal */}
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2.5 h-2.5 bg-[#2D4A3E] rounded-full"
            style={{
              top: `${50 + 48 * Math.sin((i * 22.5 * Math.PI) / 180)}%`,
              left: `${50 + 48 * Math.cos((i * 22.5 * Math.PI) / 180)}%`,
              transform: "translate(-50%, -50%)",
              boxShadow: "inset 0 1px 2px rgba(255,255,255,0.2)",
            }}
          />
        ))}
        
        {/* Inner decorative circle with subtle texture */}
        <div className="absolute inset-5 rounded-full bg-[#2D4A3E]/20" />
        <div className="absolute inset-6 rounded-full border border-[#4a6b5c]/40" />
      </motion.button>

      {/* Click indicator */}
      <motion.p
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[#2D4A3E] text-sm font-medium tracking-wider"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        CLIQUE AQUI
      </motion.p>
    </motion.div>
  )
}
