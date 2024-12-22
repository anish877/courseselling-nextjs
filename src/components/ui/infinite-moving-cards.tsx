"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { Star, ThumbsUp, Calendar } from 'lucide-react';

interface TestimonialItem {
  quote: string;
  name: string;
  title: string;
  avatar?: string;
  rating: number;
  helpfulVotes: number;
  date: string;
}

interface InfiniteMovingCardsProps {
  items: TestimonialItem[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            "w-4 h-4",
            star <= rating
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300 dark:text-gray-600"
          )}
        />
      ))}
    </div>
  );
};

export const InfiniteMovingCards: React.FC<InfiniteMovingCardsProps> = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);
  const controls = useAnimation();
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  useEffect(() => {
    addAnimation();
    window.addEventListener("resize", addAnimation);
    return () => {
      window.removeEventListener("resize", addAnimation);
    };
  }, []);

  const addAnimation = () => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  };

  const getDirection = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-duration",
        speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s"
      );
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 },
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-6 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <motion.li
            key={`${item.name}-${idx}`}
            className="w-[350px] max-w-full relative rounded-2xl border border-slate-200 dark:border-slate-800 px-8 py-6 md:w-[450px] backdrop-blur-sm bg-white/30 dark:bg-slate-800/30 shadow-xl transition-all duration-300 hover:shadow-2xl"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <blockquote className="relative">
              <div className="flex justify-between items-center mb-4">
                <StarRating rating={item.rating} />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Verified Purchase
                </span>
              </div>
              <p className="text-sm leading-[1.6] text-gray-900 dark:text-gray-100 font-normal mb-4">
                {item.quote}
              </p>
              <footer className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {item.avatar && (
                    <img
                      src={item.avatar}
                      alt={`Avatar of ${item.name}`}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-white dark:ring-gray-800"
                    />
                  )}
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {item.name}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {item.title}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center">
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    {item.helpfulVotes}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {item.date}
                  </span>
                </div>
              </footer>
            </blockquote>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

