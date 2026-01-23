"use client"

import { motion, Easing } from "framer-motion"
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
      transition: { duration: 0.6, ease: [0.0, 0.0, 0.2, 1] },
    },
  }

  return (
    <motion.div
      className="w-full max-w-md mx-auto px-4 pt-4 pb-4 text-center relative z-10"
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      {/* Centered icon between top florals - Wedding rings */}
      <motion.div 
        variants={itemVariants}
        className="flex justify-center mb-1"
      >
        <img 
          src="/images/wedding-ring.png" 
          alt="Alianças de casamento"
          className="w-32 h-32 object-contain"
        />
      </motion.div>

      {/* Biblical quote */}
      <motion.div variants={itemVariants} className="mb-8">
        <p className="text-[#5A7A5A] text-md italic leading-relaxed">
          De um passo de dança para a vida inteira.
          Nossa jornada começou há 15 anos, entre passos de dança e sorrisos que o tempo só fez fortalecer. Há 11 anos, Deus nos concedeu a graça de construir um lar repleto de amor, cumplicidade e aprendizado.
          Hoje, com o coração transbordando gratidão, sentimos que é tempo de dar um novo passo. Decidimos consagrar nossa união e pedir a bênção do Senhor sobre nossa família.
          Você está convidado para celebrar conosco esse dia especial de fé, gratidão e alegria.
        </p>
      </motion.div>

      {/* Names */}
      <motion.div variants={itemVariants} className="mb-6">
        <h1 
          className="text-5xl text-[#C4A35A] mb-6"
          style={{ fontFamily: 'var(--font-cursive)' }}
        >
          Gleise Ribeiro <br/>
          and <br/>
          Altamir Júnior
        </h1>
        <p 
          className="text-[#C4A35A] text-xl italic"
          style={{ fontFamily: 'var(--font-cursive)' }}
        >
          Convidam para seu casamento
        </p>
      </motion.div>

      {/* Date */}
      <motion.div variants={itemVariants} className="mb-6">
        <p className="text-4xl font-semibold text-[#2D4A3E] tracking-wider">
          21 março 2026
        </p>
        <p className="text-[#5A7A5A] mt-2 tracking-widest text-sm">
          Sábado às 18h00
        </p>
        <p className="text-[#5A7A5A] text-sm mt-1">
          Local: Paróquia Nossa Senhora de Lourdes
        </p>
      </motion.div>

      {/* Action icons */}
      <motion.div variants={itemVariants} className="flex justify-center gap-6 my-4">
        {/* Ceremony location */}
        <motion.a
          href="https://maps.app.goo.gl/gvyvmwM1VUyFVwVL9"
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
          href="https://maps.app.goo.gl/aZDPaZbxSvNPac169"
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
