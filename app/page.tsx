"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Envelope } from "@/components/wedding/envelope"
import { InvitationContent } from "@/components/wedding/invitation-content"
import { RsvpModal } from "@/components/wedding/rsvp-modal"
import { Heart } from "lucide-react"
import Image from "next/image"

export default function WeddingInvitation() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [isRsvpModalOpen, setIsRsvpModalOpen] = useState(false)

  const handleSealClick = () => {
    setIsEnvelopeOpen(true)
    setTimeout(() => {
      setShowContent(true)
    }, 600)
  }

  return (
    <main className="min-h-screen bg-[#F5F0E8] relative overflow-hidden">
      {/* Gold border effect */}
      <div className="absolute inset-0 border-8 border-[#D4B87A]/20 pointer-events-none z-10" />
      
      {/* Floral decoration image - only on envelope screen */}
      <AnimatePresence>
        {!showContent && (
          <motion.div
            className="absolute inset-0 w-full h-screen z-0 pointer-events-none"
            initial={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/images/floral-decoration.png"
              alt="Decoração floral"
              fill
              className="object-cover object-center"
              style={{ objectFit: 'cover', transform: 'scaleY(1.3)' }}
              priority
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floral corner decorations - only on invitation content screen */}
      <AnimatePresence>
        {showContent && (
          <>
            {/* Top left corner - rotated left twice (-180deg) */}
            <motion.div
              className="absolute top-0 left-3 w-32 h-44 md:w-40 md:h-56 pointer-events-none z-0 -scale-y-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/images/floral-corner.png"
                alt=""
                fill
                className="object-contain object-left-top"
              />
            </motion.div>
            
            {/* Top right corner - rotated right twice (180deg) */}
            <motion.div
              className="absolute top-0 right-0 w-32 h-44 md:w-40 md:h-56 pointer-events-none z-0 rotate-180"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/images/floral-corner.png"
                alt=""
                fill
                className="object-contain object-right-top"
              />
            </motion.div>
            
            {/* Bottom left corner - rotated left twice (-180deg) */}
            <motion.div
              className="absolute bottom-0 left-3 w-32 h-44 md:w-40 md:h-56 pointer-events-none z-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/images/floral-corner.png"
                alt=""
                fill
                className="object-contain object-left-bottom"
              />
            </motion.div>
            
            {/* Bottom right corner - rotated right twice (180deg) */}
            <motion.div
              className="absolute bottom-0 right-0 w-32 h-44 md:w-40 md:h-56 pointer-events-none z-0 -scale-x-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/images/floral-corner.png"
                alt=""
                fill
                className="object-contain object-right-bottom"
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main content container */}
      <div className="relative z-5 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        {/* Closed envelope view */}
        <AnimatePresence>
          {!showContent && (
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header with names */}
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 
                  className="text-4xl md:text-5xl text-[#2D4A3E] flex items-center justify-center gap-2"
                  style={{ fontFamily: 'var(--font-cursive)' }}
                >
                  Altamir Júnior
                  <Heart className="w-6 h-6 text-[#C4A35A] fill-[#C4A35A]" />
                  Gleise Ribeiro
                </h1>
              </motion.div>

              {/* Envelope */}
              <Envelope isOpen={isEnvelopeOpen} onSealClick={handleSealClick} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Open invitation view */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              className="w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <InvitationContent 
                isVisible={showContent} 
                onRsvpClick={() => setIsRsvpModalOpen(true)} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* RSVP Modal */}
      <RsvpModal 
        isOpen={isRsvpModalOpen} 
        onClose={() => setIsRsvpModalOpen(false)} 
      />
    </main>
  )
}
