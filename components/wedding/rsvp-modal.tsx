"use client"

import React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Heart, Loader2, CheckCircle2 } from "lucide-react"
import convidadosData from "@/app/convidados.json"

interface RsvpModalProps {
  isOpen: boolean
  onClose: () => void
}

export function RsvpModal({ isOpen, onClose }: RsvpModalProps) {
  const [inputValue, setInputValue] = useState("")
  const [confirmedNames, setConfirmedNames] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [error, setError] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  // Check if current date is past deadline (28/02/2026)
  const deadline = new Date("2026-02-28T23:59:59")
  const isDeadlinePassed = new Date() > deadline

  // Fetch confirmed names when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchConfirmedNames()
      // Reset states when modal opens
      setIsSuccess(false)
      setSuccessMessage("")
      setInputValue("")
      setError("")
    }
  }, [isOpen])

  const fetchConfirmedNames = async () => {
    try {
      const response = await fetch('/api/rsvp?type=confirmed-names')
      if (response.ok) {
        const data = await response.json()
        setConfirmedNames(data.confirmedNames || [])
      }
    } catch (error) {
      console.error('Erro ao buscar nomes confirmados:', error)
    }
  }

  // Normalize string for comparison (lowercase, remove extra spaces)
  const normalizeString = (str: string): string => {
    return str.toLowerCase().trim().replace(/\s+/g, ' ')
  }

  // Validate a single name against the guest list
  const validateName = (name: string): { valid: boolean; matchedName?: string; suggestion?: string; isConfirmed?: boolean } => {
    const normalizedInput = normalizeString(name)
    
    // Check if already confirmed first
    const confirmedMatch = confirmedNames.find(
      (confirmedName) => normalizeString(confirmedName) === normalizedInput
    )
    
    if (confirmedMatch) {
      return { valid: false, suggestion: `${confirmedMatch} já teve presença confirmada anteriormente`, isConfirmed: true }
    }
    
    // Exact match (case-insensitive)
    const exactMatch = convidadosData.convidados.find(
      (convidado) => normalizeString(convidado) === normalizedInput
    )
    
    if (exactMatch) {
      return { valid: true, matchedName: exactMatch }
    }
    
    // Try to find similar name (fuzzy match)
    const similarName = convidadosData.convidados.find(
      (convidado) => normalizeString(convidado).includes(normalizedInput) ||
                     normalizedInput.includes(normalizeString(convidado))
    )
    
    if (similarName) {
      // Check if the similar name is already confirmed
      const isSimilarConfirmed = confirmedNames.some(
        (confirmedName) => normalizeString(confirmedName) === normalizeString(similarName)
      )
      
      if (isSimilarConfirmed) {
        return { valid: false, suggestion: `"${similarName}" já teve presença confirmada anteriormente` }
      }
    }
    
    return { valid: false }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!inputValue.trim()) {
      setError("Por favor, digite pelo menos um nome.")
      return
    }

    setIsSubmitting(true)
    setError("")

    // Split by comma or semicolon and clean up
    const inputNames = inputValue
      .split(/[,;]+/)
      .map(name => name.trim())
      .filter(name => name.length > 0)
    
    if (inputNames.length === 0) {
      setError("Por favor, digite pelo menos um nome válido.")
      setIsSubmitting(false)
      return
    }

    // Validate all names
    const validatedNames: string[] = []
    const invalidNames: string[] = []
    const confirmedAgainNames: string[] = []
    const suggestions: string[] = []

    for (const name of inputNames) {
      const validation = validateName(name)
      
      if (validation.valid && validation.matchedName) {
        // Avoid duplicates
        if (!validatedNames.includes(validation.matchedName)) {
          validatedNames.push(validation.matchedName)
        }
      } else {
        if (validation.isConfirmed) {
          confirmedAgainNames.push(name)
        } else {
          invalidNames.push(name)
        }
        
        if (validation.suggestion) {
          suggestions.push(validation.suggestion)
        }
      }
    }

    // If no valid names to confirm at all, show error
    if (validatedNames.length === 0) {
      let errorMessage = ""
      
      if (invalidNames.length > 0) {
        errorMessage = `Nome(s) não encontrado(s)\n${invalidNames.join(", ")}`
        if (suggestions.length > 0) {
          errorMessage += `\n\n${suggestions.join("\n")}`
        }
      }
      
      if (confirmedAgainNames.length > 0) {
        if (errorMessage) errorMessage += "\n\n"
        errorMessage += `✓ Presença já confirmada anteriormente:\n${confirmedAgainNames.join(", ")}`
      }
      
      setError(errorMessage || "Nenhum nome válido para confirmar.")
      setIsSubmitting(false)
      return
    }

    // If there are valid names to submit, proceed and inform about issues
    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          names: validatedNames,
          confirmedAt: new Date().toISOString(),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erro ao confirmar presença")
      }

      // Show success message with info about issues if any
      setIsSuccess(true)
      
      // Build message about problems that occurred
      let infoMessage = ""
      
      if (confirmedAgainNames.length > 0) {
        infoMessage += `ℹ️ ${confirmedAgainNames.join(", ")} já tinha(m) presença confirmada anteriormente.`
      }
      
      if (invalidNames.length > 0) {
        if (infoMessage) infoMessage += "\n\n"
        infoMessage += `⚠️ ${invalidNames.join(", ")} não foi(ram) encontrado(s).`
        if (suggestions.length > 0) {
          infoMessage += `\n${suggestions.join("\n")}`
        }
      }
      
      if (infoMessage) {
        setSuccessMessage(infoMessage)
      }
      
      // Don't auto-close the modal - let user close it manually
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao confirmar presença. Tente novamente.")
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
                  className="text-4xl text-[#C4A35A] mb-3"
                  style={{ fontFamily: 'var(--font-cursive)' }}
                >
                  Confirmação de presença
                </h2>
                <p className="text-[#5A7A5A] text-xl">
                  Confirmações até <span className="font-semibold text-[#2D4A3E]">28 de fevereiro de 2026</span>
                </p>
                {isDeadlinePassed && (
                  <p className="text-red-600 text-xl mt-2 font-medium">
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
                  <p className="text-[#5A7A5A] text-lg mt-2">
                    Obrigado, esperamos você!
                  </p>
                  {successMessage && (
                    <p className="text-[#5A7A5A] text-lg mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200 whitespace-pre-line text-left">
                      {successMessage}
                    </p>
                  )}
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label 
                      htmlFor="fullName" 
                      className="block text-lg font-semibold font-medium text-[#2D4A3E]"
                    >
                      Digite seu(s) nome(s) e sobrenome(s)
                    </label>
                    <input
                      ref={inputRef}
                      type="text"
                      id="fullName"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-[#D4B87A] bg-white text-[#2D4A3E] placeholder-[#5A7A5A]/50 focus:outline-none focus:ring-2 focus:ring-[#C4A35A] transition-shadow disabled:opacity-50 disabled:bg-gray-100"
                      placeholder="Ex: João Silva, Maria Santos"
                      disabled={isSubmitting || isDeadlinePassed}
                      autoComplete="off"
                    />
                    <p className="text-lg font-semibold text-[#5A7A5A]/70">
                      Caso deseje confirmar mais de um nome, separe por vírgula
                    </p>
                  </div>

                  {error && (
                    <div className="text-red-500 text-lg text-center whitespace-pre-line bg-red-50 p-3 rounded-lg border border-red-200">
                      {error}
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isSubmitting || isDeadlinePassed || !inputValue.trim()}
                    className="w-full py-3 px-6 bg-[#2D4A3E] text-white rounded-lg font-medium hover:bg-[#3d5a4c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    whileHover={!isDeadlinePassed && inputValue.trim() ? { scale: 1.02 } : {}}
                    whileTap={!isDeadlinePassed && inputValue.trim() ? { scale: 0.98 } : {}}
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
