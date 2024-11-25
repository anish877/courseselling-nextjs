'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { testimonials, Testimonial } from '@/testimonial-data/testimonials'

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const nextTestimonial = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 8000) // Auto-advance every 8 seconds
    return () => clearInterval(timer)
  }, [])

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-8 py-16">
      <h2 className="text-4xl font-bold text-center mb-12">What Our Learners Say</h2>
      <div className="relative">
        <Card className=" shadow-xl overflow-hidden">
          <CardContent className="p-0">
            <div className="relative h-[400px]">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="absolute w-full h-full"
                >
                  <TestimonialItem testimonial={testimonials[currentIndex]} />
                </motion.div>
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
        <Button
        //   variant="outline"
          size="icon"
          className="absolute top-1/2 -left-6 transform -translate-y-1/2 bg-white rounded-full shadow-lg z-10 hover:bg-gray-100"
          onClick={prevTestimonial}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
        //   variant="outline"
          size="icon"
          className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-white rounded-full shadow-lg z-10 hover:bg-gray-100"
          onClick={nextTestimonial}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex justify-center mt-4">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 w-3 rounded-full mx-1 transition-all duration-300 ${
              index === currentIndex ? 'bg-primary scale-125' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

function TestimonialItem({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex flex-col md:flex-row h-full">
      <div className="w-full md:w-1/3 bg-gradient-to-br from-primary to-primary-foreground p-6 flex flex-col justify-center items-center text-white">
        <Avatar className="w-24 h-24 border-4 border-white shadow-lg mb-4">
          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <h3 className="text-xl font-semibold">{testimonial.name}</h3>
        <p className="text-sm opacity-75">{testimonial.role}</p>
        <p className="text-sm font-bold mt-1">{testimonial.company}</p>
        <div className="flex mt-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < testimonial.rating ? 'fill-current' : 'stroke-current opacity-50'}`}
            />
          ))}
        </div>
      </div>
      <div className="w-full md:w-2/3 p-6 flex flex-col justify-center">
      <blockquote className="text-lg italic mb-4">&quot;{testimonial.testimonial}&quot;</blockquote>
        <div className="mt-auto">
          <p className="text-sm text-gray-500">Learnix Student</p>
        </div>
      </div>
    </div>
  )
}

export default Testimonials

