"use client"

import React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Heart, Loader2, CheckCircle2 } from "lucide-react"

interface RsvpModalProps {
  isOpen: boolean
  onClose: () => void
}

export function RsvpModal({ isOpen, onClose }: RsvpModalProps) {
  const [fullName, setFullName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  // Check if current date is past deadline (28/02/2026)
  const deadline = new Date("2026-02-28T23:59:59")
  const isDeadlinePassed = new Date() > deadline

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!fullName.trim()) {
      setError("Por favor, preencha seu nome completo.")
      return
    }

    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: fullName.trim(),
          confirmedAt: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        throw new Error("Erro ao confirmar presença")
      }

      setIsSuccess(true)
      setTimeout(() => {
        onClose()
        setIsSuccess(false)
        setFullName("")
      }, 2500)
    } catch {
      setError("Erro ao confirmar presença. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-sm bg-[#F5F0E8] rounded-2xl shadow-2xl overflow-hidden"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-[#5A7A5A] hover:text-[#2D4A3E] transition-colors z-10"
              aria-label="Fechar"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Content */}
            <div className="p-8">
              {/* Header */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#2D4A3E] flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h2 
                  className="text-3xl text-[#C4A35A] mb-3"
                  style={{ fontFamily: 'var(--font-cursive)' }}
                >
                  Confirme sua presença
                </h2>
                <p className="text-[#5A7A5A] text-sm">
                  Confirmações até <span className="font-semibold text-[#2D4A3E]">28 de fevereiro de 2026</span>
                </p>
                {isDeadlinePassed && (
                  <p className="text-red-600 text-sm mt-2 font-medium">
                    Prazo para confirmação encerrado
                  </p>
                )}
              </div>

              {isSuccess ? (
                <motion.div
                  className="text-center py-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <CheckCircle2 className="w-16 h-16 text-[#2D4A3E] mx-auto mb-4" />
                  <p className="text-[#2D4A3E] text-lg font-medium">
                    Presença confirmada!
                  </p>
                  <p className="text-[#5A7A5A] text-sm mt-2">
                    Obrigado, esperamos você!
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-[#D4B87A] bg-white text-[#2D4A3E] placeholder-[#5A7A5A]/50 focus:outline-none focus:ring-2 focus:ring-[#C4A35A] transition-shadow disabled:opacity-50 disabled:bg-gray-100"
                      placeholder="Nome e Sobrenome"
                      disabled={isSubmitting || isDeadlinePassed}
                    />
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm text-center">{error}</p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isSubmitting || isDeadlinePassed}
                    className="w-full py-3 px-6 bg-[#2D4A3E] text-white rounded-lg font-medium hover:bg-[#3d5a4c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    whileHover={!isDeadlinePassed ? { scale: 1.02 } : {}}
                    whileTap={!isDeadlinePassed ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Confirmando...
                      </>
                    ) : (
                      <>
                        <Heart className="w-5 h-5" />
                        {isDeadlinePassed ? "Prazo Encerrado" : "Confirmar Presença"}
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>

            {/* Decorative border */}
            <div className="h-2 bg-gradient-to-r from-[#2D4A3E] via-[#C4A35A] to-[#2D4A3E]" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
