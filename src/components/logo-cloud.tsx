// "use client";

// import { useRef, useEffect } from "react";
// import { motion, useAnimationFrame } from "framer-motion";
// import Image from "next/image";

// const logos = [{
//   src: "https://images.pexels.com/photos/25304390/pexels-photo-25304390/free-photo-of-facade-of-axel-towers-in-copenhagen.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
//   alt: "Axel Towers in Copenhagen",
// },
// {
//     src: "https://images.pexels.com/photos/29463581/pexels-photo-29463581/free-photo-of-serene-autumn-forest-with-misty-atmosphere.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
//     alt: "Axel Towers in Copenhagen",   
// }]

// export function LogoCloud() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const scrollX = useRef(0); // Mutable ref for scroll position

//   useEffect(() => {
//     if (containerRef.current) {
//       const containerWidth = containerRef.current.offsetWidth;
//       const contentWidth = containerRef.current.scrollWidth;

//       if (contentWidth < containerWidth * 2) {
//         const clonesNeeded = Math.ceil((containerWidth * 2 - contentWidth) / contentWidth);
//         for (let i = 0; i < clonesNeeded; i++) {
//           logos.push(...logos);
//         }
//       }
//     }
//   }, []);

//   useAnimationFrame(() => {
//     if (containerRef.current) {
//       const containerWidth = containerRef.current.offsetWidth;
//       const contentWidth = containerRef.current.scrollWidth / 2;

//       scrollX.current -= 1; // Update scroll position
//       if (Math.abs(scrollX.current) >= contentWidth) {
//         scrollX.current = 0; // Reset scroll when content loops
//       }
//     }
//   });

//   return (
//     <div className="w-full overflow-hidden bg-gray-100 py-10 sm:py-12">
//       <div className="relative" ref={containerRef}>
//         <motion.div
//           className="flex space-x-8"
//           style={{ x: scrollX.current }} // Use scrollX.current
//         >
//           {logos.map((logo, index) => (
//             <div key={index} className="flex-shrink-0">
//               <Image
//                 src={logo.src}
//                 alt={logo.alt}
//                 width={150}
//                 height={100}
//                 className="h-20 w-auto object-contain"
//               />
//             </div>
//           ))}
//         </motion.div>
//       </div>
//     </div>
//   );
// }
