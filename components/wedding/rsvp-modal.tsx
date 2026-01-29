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
  const [selectedNames, setSelectedNames] = useState<string[]>([])
  const [confirmedNames, setConfirmedNames] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  // Check if current date is past deadline (28/02/2026)
  const deadline = new Date("2026-02-28T23:59:59")
  const isDeadlinePassed = new Date() > deadline

  // Fetch confirmed names when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchConfirmedNames()
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

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Handle input change and filter suggestions
  const handleInputChange = (value: string) => {
    setInputValue(value)

    if (value.trim().length === 0) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    // Filter suggestions - exclude already selected names
    const filtered = convidadosData.convidados.filter((nome) =>
      nome.toLowerCase().includes(value.toLowerCase()) &&
      !selectedNames.includes(nome)
    )
    
    setSuggestions(filtered)
    setShowSuggestions(filtered.length > 0)
  }

  // Handle suggestion selection
  const handleSelectSuggestion = (nome: string) => {
    // Don't allow selecting confirmed names
    if (confirmedNames.includes(nome)) {
      return
    }
    
    if (!selectedNames.includes(nome)) {
      setSelectedNames([...selectedNames, nome])
    }
    setInputValue("")
    setShowSuggestions(false)
    setSuggestions([])
    setError("")
    inputRef.current?.focus()
  }

  // Handle removing a selected name
  const handleRemoveName = (nome: string) => {
    setSelectedNames(selectedNames.filter((n) => n !== nome))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (selectedNames.length === 0) {
      setError("Por favor, selecione pelo menos um nome da lista.")
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
          names: selectedNames,
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
        setSelectedNames([])
        setInputValue("")
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
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Selected names chips */}
                  {selectedNames.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selectedNames.map((nome, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center gap-2 bg-[#2D4A3E] text-white px-3 py-1.5 rounded-full text-sm"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        >
                          <span>{nome}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveName(nome)}
                            className="hover:bg-[#3d5a4c] rounded-full p-0.5 transition-colors"
                            disabled={isSubmitting}
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  <div className="relative">
                    <input
                      ref={inputRef}
                      type="text"
                      id="fullName"
                      value={inputValue}
                      onChange={(e) => handleInputChange(e.target.value)}
                      onFocus={() => {
                        if (suggestions.length > 0) {
                          setShowSuggestions(true)
                        }
                      }}
                      className="w-full px-4 py-3 rounded-lg border border-[#D4B87A] bg-white text-[#2D4A3E] placeholder-[#5A7A5A]/50 focus:outline-none focus:ring-2 focus:ring-[#C4A35A] transition-shadow disabled:opacity-50 disabled:bg-gray-100"
                      placeholder="Digite para buscar convidados..."
                      disabled={isSubmitting || isDeadlinePassed}
                      autoComplete="off"
                    />

                    {/* Suggestions dropdown */}
                    <AnimatePresence>
                      {showSuggestions && suggestions.length > 0 && (
                        <motion.div
                          ref={suggestionsRef}
                          className="absolute z-50 w-full mt-1 bg-white border border-[#D4B87A] rounded-lg shadow-lg max-h-60 overflow-y-auto"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          {suggestions.map((nome, index) => {
                            const isConfirmed = confirmedNames.includes(nome)
                            return (
                              <button
                                key={index}
                                type="button"
                                onClick={() => handleSelectSuggestion(nome)}
                                disabled={isConfirmed}
                                className={`w-full px-4 py-3 text-left transition-colors border-b border-[#D4B87A]/20 last:border-b-0 ${
                                  isConfirmed
                                    ? 'text-gray-400 bg-gray-50 cursor-not-allowed line-through'
                                    : 'text-[#2D4A3E] hover:bg-[#F5F0E8] cursor-pointer'
                                }`}
                              >
                                {nome}
                                {isConfirmed && (
                                  <span className="ml-2 text-xs text-gray-500">(confirmado)</span>
                                )}
                              </button>
                            )
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm text-center">{error}</p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isSubmitting || isDeadlinePassed || selectedNames.length === 0}
                    className="w-full py-3 px-6 bg-[#2D4A3E] text-white rounded-lg font-medium hover:bg-[#3d5a4c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    whileHover={!isDeadlinePassed && selectedNames.length > 0 ? { scale: 1.02 } : {}}
                    whileTap={!isDeadlinePassed && selectedNames.length > 0 ? { scale: 0.98 } : {}}
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
