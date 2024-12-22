'use client'
import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Offer {
  id: number;
  text: string;
  link: string;
  icon?: string;
}

const offers: Offer[] = [
  { 
    id: 1, 
    text: "Winter Sale: 30% off all courses!", 
    link: "/all-courses",
    icon: "⛄"
  },
  { 
    id: 2, 
    text: "New Python Masterclass launched", 
    link: "/all-courses",
    icon: "🚀"
  },
  { 
    id: 3, 
    text: "Free webinar: 'AI in Education' - Register now", 
    link: "/all-courses",
    icon: "💡"
  },
];

const AdvancedTopbar = () => {
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentOfferIndex((prevIndex) => (prevIndex + 1) % offers.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrevious = () => {
    setCurrentOfferIndex((prevIndex) => 
      prevIndex === 0 ? offers.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentOfferIndex((prevIndex) => 
      (prevIndex + 1) % offers.length
    );
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500 dark:from-violet-800 dark:via-purple-800 dark:to-pink-700 relative overflow-hidden z-10"
      >
        <div 
          className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"
          style={{ 
            backgroundSize: '20px 20px',
            backgroundRepeat: 'repeat'
          }}
        />
        
        <div 
          className="container mx-auto py-2 px-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="flex justify-between items-center gap-4">
            <div className="flex items-center gap-2 flex-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-white/90 hover:text-white hover:bg-white/10"
                      onClick={handlePrevious}
                    >
                      <ChevronLeft size={18} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Previous offer</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <div className="flex-1 min-w-0">
                <motion.a
                  key={currentOfferIndex}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  href={offers[currentOfferIndex].link}
                  className="flex items-center justify-center gap-2 text-white/90 hover:text-white group transition-colors duration-200"
                >
                  <span className="text-lg">{offers[currentOfferIndex].icon}</span>
                  <span className="text-sm font-medium truncate">
                    {offers[currentOfferIndex].text}
                  </span>
                  <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              </div>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-white/90 hover:text-white hover:bg-white/10"
                      onClick={handleNext}
                    >
                      <ChevronRight size={18} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Next offer</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {offers.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 w-6 rounded-full transition-colors duration-300 ${
                      index === currentOfferIndex 
                        ? 'bg-white' 
                        : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white/90 hover:text-white hover:bg-white/10"
                      onClick={handleClose}
                    >
                      <X size={18} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Close offers</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AdvancedTopbar;