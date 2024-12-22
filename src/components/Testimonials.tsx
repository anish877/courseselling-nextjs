'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote, Calendar, Award, Sparkles, Pause, Play } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { testimonials, Testimonial } from '@/testimonial-data/testimonials'

const cardVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.95,
  }),
};

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex flex-col md:flex-row h-full">
      <div className="w-full md:w-2/5 bg-gradient-to-br from-primary to-primary-foreground p-8 flex flex-col justify-center items-center text-primary-foreground">
        <div className="relative">
          <Avatar className="w-28 h-28 border-4 border-background shadow-xl">
            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-2 -right-2">
            <Badge className="bg-background text-foreground">
              <Award className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          </div>
        </div>

        <div className="mt-6 text-center space-y-2">
          <h3 className="text-xl font-semibold">{testimonial.name}</h3>
          <p className="text-sm opacity-90">{testimonial.role}</p>
          <p className="text-sm font-medium">{testimonial.company}</p>
          
          <div className="flex items-center justify-center mt-4 space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 transition-all duration-300 ${
                  i < testimonial.rating 
                    ? 'fill-yellow-400 text-yellow-400' 
                    : 'text-background/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="w-full md:w-3/5 p-8 flex flex-col justify-between bg-gradient-to-br from-background to-background/50">
        <div className="space-y-6">
          <Quote className="w-10 h-10 text-primary opacity-20" />
          <blockquote className="text-lg italic relative">
            {testimonial.testimonial}
          </blockquote>
        </div>
      </div>
    </div>
  );
}

function NavigationDot({ index, currentIndex, onClick, name }: { 
  index: number;
  currentIndex: number;
  onClick: () => void;
  name: string;
}) {
  return (
    <button
      onClick={onClick}
      className="group relative"
    >
      <div
        className={`h-3 w-3 rounded-full transition-all duration-300 ${
          index === currentIndex 
            ? 'bg-primary scale-125' 
            : 'bg-primary/20 hover:bg-primary/40'
        }`}
      />
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Badge variant="outline" className="whitespace-nowrap">
          {name}
        </Badge>
      </div>
    </button>
  );
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAutoPlaying) {
      timer = setInterval(nextTestimonial, 8000);
    }
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  return (
    <div className="w-full bg-gradient-to-b from-background to-secondary/10">
      <div className="max-w-4xl mx-auto px-8 py-16">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="px-4 py-1">
            <Sparkles className="w-4 h-4 mr-2 inline-block" />
            Student Success Stories
          </Badge>
          <h2 className="text-4xl font-bold">What Our Learners Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied students who have transformed their careers with Learnix
          </p>
        </div>

        <div className="relative">
          <Card className="shadow-xl overflow-hidden backdrop-blur-sm bg-card/50">
            <CardContent className="p-0">
              <div className="relative h-[450px]">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={cardVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                      scale: { duration: 0.3 },
                    }}
                    className="absolute w-full h-full"
                  >
                    <TestimonialCard testimonial={testimonials[currentIndex]} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>

          <Button
            size="icon"
            variant="outline"
            className="absolute -left-4 top-1/2 -translate-y-1/2 rounded-full shadow-lg backdrop-blur-sm bg-background/50 hover:bg-background/80 transition-all duration-300"
            onClick={prevTestimonial}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            size="icon"
            variant="outline"
            className="absolute -right-4 top-1/2 -translate-y-1/2 rounded-full shadow-lg backdrop-blur-sm bg-background/50 hover:bg-background/80 transition-all duration-300"
            onClick={nextTestimonial}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-8 flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-2">
            {testimonials.map((testimonial, index) => (
              <NavigationDot
                key={testimonial.id}
                index={index}
                currentIndex={currentIndex}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                }}
                name={testimonial.name}
              />
            ))}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="text-xs gap-2"
          >
            {isAutoPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            {isAutoPlaying ? 'Pause' : 'Play'} Autoplay
          </Button>
        </div>
      </div>
    </div>
  );
}