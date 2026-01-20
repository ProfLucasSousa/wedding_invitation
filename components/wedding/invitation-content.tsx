"use client"

import { motion } from "framer-motion"
import { MapPin, Users, Heart } from "lucide-react"

interface InvitationContentProps {
  isVisible: boolean
  onRsvpClick: () => void
}

export function InvitationContent({ isVisible, onRsvpClick }: InvitationContentProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <motion.div
      className="w-full max-w-md mx-auto px-6 pt-16 pb-8 text-center"
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      {/* Centered icon between top florals */}
      <motion.div 
        variants={itemVariants}
        className="flex justify-center mb-6"
      >
        <div className="w-16 h-16 rounded-full bg-[#2D4A3E] flex items-center justify-center shadow-lg">
          <svg 
            viewBox="0 0 24 24" 
            className="w-8 h-8 text-[#C4A35A]"
            fill="currentColor"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
      </motion.div>

      {/* Biblical quote */}
      <motion.div variants={itemVariants} className="mb-8">
        <p className="text-[#5A7A5A] text-sm italic leading-relaxed">
          De um passo de dança para a vida inteira
          Nossa jornada começou há 15 anos, entre passos de dança e sorrisos que o tempo só fez fortalecer. Há 11 anos, Deus nos concedeu a graça de construir um lar repleto de amor, cumplicidade e aprendizado.
          Hoje, com o coração transbordando gratidão, sentimos que é tempo de dar um novo passo. Decidimos consagrar nossa união e pedir a bênção do Senhor sobre nossa família.
          Você está convidado para celebrar conosco esse dia especial de fé, gratidão e alegria.
        </p>
      </motion.div>

      {/* Names */}
      <motion.div variants={itemVariants} className="mb-6">
        <h1 
          className="text-5xl text-[#C4A35A] mb-2"
          style={{ fontFamily: 'var(--font-cursive)' }}
        >
          Altamir Júnior <br/>
          e <br/>
          Gleise Ribeiro
        </h1>
        <p 
          className="text-[#C4A35A] text-lg italic"
          style={{ fontFamily: 'var(--font-cursive)' }}
        >
          Convidam para seu casamento
        </p>
      </motion.div>

      {/* Date */}
      <motion.div variants={itemVariants} className="mb-6">
        <p className="text-4xl font-semibold text-[#2D4A3E] tracking-wider">
          21.03.2026
        </p>
        <p className="text-[#5A7A5A] mt-2 uppercase tracking-widest text-sm">
          Sábado às 18h00
        </p>
        <p className="text-[#5A7A5A] text-sm mt-1">
          Local: Igreja São José
        </p>
      </motion.div>

      {/* Action icons */}
      <motion.div variants={itemVariants} className="flex justify-center gap-6 my-8">
        {/* Ceremony location */}
        <motion.a
          href="https://maps.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-16 h-16 rounded-full bg-[#2D4A3E] flex items-center justify-center shadow-lg hover:bg-[#3d5a4c] transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Localização da cerimônia"
        >
          <MapPin className="w-7 h-7 text-white" />
        </motion.a>

        {/* Reception location */}
        <motion.a
          href="https://maps.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-16 h-16 rounded-full bg-[#2D4A3E] flex items-center justify-center shadow-lg hover:bg-[#3d5a4c] transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Localização da recepção"
        >
          <Users className="w-7 h-7 text-white" />
        </motion.a>

        {/* RSVP */}
        <motion.button
          onClick={onRsvpClick}
          className="w-16 h-16 rounded-full bg-[#2D4A3E] flex items-center justify-center shadow-lg hover:bg-[#3d5a4c] transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Confirmar presença"
        >
          <Heart className="w-7 h-7 text-white" />
        </motion.button>
      </motion.div>

      {/* Icon labels */}
      <motion.div variants={itemVariants} className="flex justify-center gap-6 mb-8">
        <span className="w-16 text-[#5A7A5A] text-xs text-center">Cerimônia</span>
        <span className="w-16 text-[#5A7A5A] text-xs text-center">Recepção</span>
        <span className="w-16 text-[#5A7A5A] text-xs text-center">Confirmar</span>
      </motion.div>

      {/* Footer message */}
      <motion.p 
        variants={itemVariants}
        className="text-2xl text-[#C4A35A]"
        style={{ fontFamily: 'var(--font-cursive)' }}
      >
        Esperamos por você!
      </motion.p>
    </motion.div>
  )
}
