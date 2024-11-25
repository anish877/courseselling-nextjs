'use client'

import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Offer {
  id: number
  text: string
  link: string
}

const offers: Offer[] = [
  { id: 1, text: "⛄🎉 Winter Sale: 30% off all courses!", link: "/all-courses" },
  { id: 2, text: "🚀 New Python Masterclass launched", link: "/all-courses" },
  { id: 3, text: "💡 Free webinar: 'AI in Education' - Register now", link: "/all-courses" },
]

const ThinTopbar = () => {
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentOfferIndex((prevIndex) => (prevIndex + 1) % offers.length)
    }, 5000) // Change offer every 5 seconds

    return () => clearInterval(timer)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-800 dark:to-pink-700 text-white py-1 px-4 text-sm font-medium"
      >
        <div className="container mx-auto flex justify-between items-center">
          <motion.a
            key={currentOfferIndex}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.3 }}
            href={offers[currentOfferIndex].link}
            className="hover:underline"
          >
            {offers[currentOfferIndex].text}
          </motion.a>
          <button 
            onClick={handleClose}
            className="text-white hover:text-white/80 transition-colors duration-200"
            aria-label="Close offer bar"
          >
            <X size={16} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ThinTopbar

