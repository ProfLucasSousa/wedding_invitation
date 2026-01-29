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
      style={{
        filter: 'drop-shadow(0 10px 25px rgba(0, 0, 0, 0.15))',
      }}
    >
      {/* Envelope body */}
      <div className="absolute inset-0 rounded-sm" style={{
        background: 'linear-gradient(180deg, #fdfcfa 0%, #f8f6f3 100%)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08), inset 0 1px 2px rgba(255, 255, 255, 0.8)',
      }}>
        {/* Subtle paper texture overlay */}
        <div className="absolute inset-0 rounded-sm opacity-5" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\' opacity=\'0.4\' /%3E%3C/svg%3E")',
        }} />
        
        {/* Envelope flap (back) */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-24 origin-top"
          style={{
            clipPath: "polygon(0 0, 50% 100%, 100% 0)",
            background: "linear-gradient(135deg, #f5f3f0 0%, #e8e5e1 50%, #dbd8d4 100%)",
            boxShadow: 'inset 0 -2px 4px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.05)',
          }}
          animate={isOpen ? { rotateX: 180 } : { rotateX: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Flap crease line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50" />
        </motion.div>
        
        {/* Side edges for depth */}
        <div className="absolute left-0 top-6 bottom-0 w-1" style={{
          background: 'linear-gradient(90deg, rgba(0,0,0,0.08) 0%, transparent 100%)',
        }} />
        <div className="absolute right-0 top-6 bottom-0 w-1" style={{
          background: 'linear-gradient(-90deg, rgba(0,0,0,0.08) 0%, transparent 100%)',
        }} />
        
        {/* Inner envelope shadow */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            clipPath: "polygon(0 100%, 50% 20%, 100% 100%)",
            background: "linear-gradient(to bottom, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.04) 30%, rgba(0,0,0,0.02) 60%, transparent 100%)",
          }}
        />
        
        {/* Envelope front flap */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-36"
          style={{
            clipPath: "polygon(0 100%, 50% 30%, 100% 100%)",
            background: "linear-gradient(to bottom, #fdfcfa 0%, #f8f6f3 100%)",
            boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.8)',
          }}
        >
          {/* Front flap edges highlight */}
          <div className="absolute inset-0" style={{
            clipPath: "polygon(0 100%, 50% 30%, 100% 100%)",
            background: "linear-gradient(to bottom, transparent 0%, transparent 50%, rgba(0,0,0,0.03) 100%)",
          }} />
        </div>
        
        {/* Center crease shadows */}
        <div className="absolute left-1/2 -translate-x-1/2 top-6 bottom-6 w-px bg-gradient-to-b from-transparent via-gray-200/40 to-transparent" />
      </div>

      {/* Wax seal */}
      <motion.button
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-28 h-28 rounded-full flex items-center justify-center focus:outline-none"
        onClick={onSealClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Abrir convite"
      >
        <img 
          src="/images/signet.png" 
          alt="Selo de cera"
          className="w-full h-full object-contain"
        />
      </motion.button>

      {/* Click indicator */}
      <motion.p
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[#2D4A3E] text-xl font-semibold font-medium tracking-wider"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Clique na Carta
      </motion.p>
    </motion.div>
  )
}
