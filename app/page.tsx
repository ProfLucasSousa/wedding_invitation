"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Envelope } from "@/components/wedding/envelope"
import { InvitationContent } from "@/components/wedding/invitation-content"
import { RsvpModal } from "@/components/wedding/rsvp-modal"
import { FloralDecoration } from "@/components/wedding/floral-decoration"
import { Heart } from "lucide-react"

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
      
      {/* Floral decorations - more detailed when envelope is closed */}
      <FloralDecoration position="top-left" variant={showContent ? "simple" : "detailed"} />
      <FloralDecoration position="top-right" variant={showContent ? "simple" : "detailed"} />
      <FloralDecoration position="bottom-left" variant={showContent ? "simple" : "detailed"} />
      <FloralDecoration position="bottom-right" variant={showContent ? "simple" : "detailed"} />

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
