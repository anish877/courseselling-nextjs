"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 150, damping: 30, bounce: 0 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [0, 800]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [0, -800]),
    springConfig
  );
  
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.15], [20, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.15], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.15], [15, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.15], [-400, 0]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="h-[150vh] xs:h-[200vh] sm:h-[250vh] overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="sticky top-0 pt-16 sm:pt-20 md:pt-32"
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-4 sm:space-x-8 md:space-x-20 mb-8 sm:mb-12 md:mb-20 overflow-x-hidden">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-8 sm:mb-12 md:mb-20 space-x-4 sm:space-x-8 md:space-x-20 overflow-x-hidden">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-4 sm:space-x-8 md:space-x-20 overflow-x-hidden">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-10 sm:py-20 md:py-40 px-4 w-full left-0 top-0">
      <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold dark:text-white">
        <span className="bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
          Learnix
        </span>
        , <br />Ultimate learning platform
      </h1>
      <p className="max-w-2xl text-sm sm:text-base md:text-xl mt-4 sm:mt-6 md:mt-8 dark:text-neutral-200">
        Learnix provides best in class courses from top instructors all around the world.
        We are a team of passionate instructors and collaborators that love to teach.
      </p>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
        transition: { duration: 0.2 }
      }}
      key={product.title}
      className="group/product h-48 w-60 sm:h-72 sm:w-[20rem] md:h-96 md:w-[30rem] relative flex-shrink-0"
    >
      <Link
        href={product.link}
        className="block group-hover/product:shadow-2xl transition-shadow duration-200"
      >
        <Image
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={product.title}
        />
      </Link>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-60 bg-black pointer-events-none transition-opacity duration-200"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white transition-opacity duration-200 text-sm sm:text-base md:text-lg">
        {product.title}
      </h2>
    </motion.div>
  );
};