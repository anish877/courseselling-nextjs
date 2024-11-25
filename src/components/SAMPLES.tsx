// 'use client';

// import React, { useState, useEffect, useRef } from 'react';
// import Link from 'next/link';
// import { useSession, signOut } from 'next-auth/react';
// import { Button } from './ui/button';
// import { ChevronDown, Menu, X, ShoppingCart, AlertTriangle } from 'lucide-react';
// import Cart from './Cart';

// const Navbar = () => {
//   const { data: session } = useSession();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
//   const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);
//   const [isVisible, setIsVisible] = useState(true);
//   const lastScrollY = useRef(0);

//   const handleMouseEnter = (menu: string) => {
//     if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
//     setActiveDropdown(menu);
//   };

//   const handleMouseLeave = () => {
//     dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 200);
//   };

//   const handleScroll = () => {
//     const currentScrollY = window.scrollY;
//     if (currentScrollY > lastScrollY.current && currentScrollY > 90) {
//       setIsVisible(false);
//     } else {
//       setIsVisible(true);
//     }
//     lastScrollY.current = currentScrollY;
//   };

//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   return (
//     <nav
//       className={`p-4 shadow-md bg-black text-white fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
//         isVisible ? 'translate-y-0' : '-translate-y-full'
//       }`}
//     >
//       <div className="container mx-auto flex justify-around items-center">
//         {/* Logo */}
//         <Link href="/" className="text-2xl font-bold tracking-tight hover:opacity-90">
//           乂 Learnix
//         </Link>

//         {/* Hamburger Menu for Small Screens */}
//         <div className="md:hidden">
//           <Button
//             variant="ghost"
//             onClick={() => setMenuOpen((prev) => !prev)}
//             className="text-white hover:bg-gray-800"
//           >
//             {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </Button>
//         </div>

//         {/* Navigation Links */}
//         <div
//           className={`${
//             menuOpen ? 'absolute' : 'hidden'
//           } md:relative md:flex top-full left-0 w-full md:w-auto bg-gray-900 md:bg-transparent md:items-center space-y-4 md:space-y-0 md:space-x-8 p-4 md:p-0 z-40`}
//         >
//           {/* Dropdown: Courses */}
//           <div
//             className="relative group"
//             onMouseEnter={() => handleMouseEnter('courses')}
//             onMouseLeave={handleMouseLeave}
//           >
//             <Button variant="default" className="text-white font-bold flex items-center md:bg-black p-0 m-0">
//               <span>Courses</span>
//               <ChevronDown className="w-4 h-4" />
//             </Button>
//             {activeDropdown === 'courses' && (
//               <div className="absolute left-0 mt-2 w-48 bg-gray-900 border p-2 rounded border-gray-800 shadow-sm z-10">
//                 <Link
//                   href="/all-courses"
//                   className="block px-4 py-2 text-sm font-bold text-gray-300 hover:bg-gray-800 hover:text-white"
//                 >
//                   All Courses
//                 </Link>
//                 <Link
//                   href="/channel"
//                   className="block px-4 py-2 text-sm font-bold text-gray-300 hover:bg-gray-800 hover:text-white"
//                 >
//                   Dashboard
//                 </Link>
//                 {!session && (
//                   <Link
//                     href="/signin"
//                     className="block px-4 py-2 text-sm font-bold text-gray-300 hover:bg-gray-800 hover:text-white"
//                   >
//                     Login
//                   </Link>
//                 )}
//                 {session?.user.isAdmin && (
//                   <Button>
//                     <Link
//                       href="/admin"
//                       className="w-full text-rose-900 font-bold flex items-center justify-center gap-1"
//                     >
//                       Admin <AlertTriangle />
//                     </Link>
//                   </Button>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Dropdown: Content Books */}
//           <div
//             className="relative group"
//             onMouseEnter={() => handleMouseEnter('books')}
//             onMouseLeave={handleMouseLeave}
//           >
//             <Button variant="default" className="text-white font-bold flex items-center md:bg-black p-0">
//               <span>Content</span>
//               <ChevronDown className="w-4 h-4" />
//             </Button>
//             {activeDropdown === 'books' && (
//               <div className="absolute left-0 mt-2 w-48 bg-black border border-gray-800 shadow-sm z-10">
//                 <Link
//                   href="/newsletters"
//                   className="block px-4 py-2 text-sm font-bold text-gray-300 hover:bg-gray-800 hover:text-white"
//                 >
//                   Newsletter
//                 </Link>
//                 <Link
//                   href="/books/e-books"
//                   className="block px-4 py-2 text-sm font-bold text-gray-300 hover:bg-gray-800 hover:text-white"
//                 >
//                   e-books
//                 </Link>
//                 <Link
//                   href="/videos"
//                   className="block px-4 py-2 text-sm font-bold text-gray-300 hover:bg-gray-800 hover:text-white"
//                 >
//                   Videos
//                 </Link>
//                 <Link
//                   href="/blogs"
//                   className="block px-4 py-2 text-sm font-bold text-gray-300 hover:bg-gray-800 hover:text-white"
//                 >
//                   Blogs
//                 </Link>
//                 <Link
//                   href="/upcoming-courses"
//                   className="block px-4 py-2 text-sm font-bold text-gray-300 hover:bg-gray-800 hover:text-white"
//                 >
//                   Upcoming courses
//                 </Link>
//               </div>
//             )}
//           </div>

//           {/* About and Contact */}
//           <Link href="/about-us" className="block md:inline-block font-bold hover:text-gray-400">
//             About
//           </Link>
//           <Link href="/contact-us" className="block md:inline-block font-bold hover:text-gray-400">
//             Contact
//           </Link>

//           {/* Cart */}
//           <span className='flex items-center font-bold'><Cart icon={<ShoppingCart />}/>Cart</span>

//           {/* Login/Logout */}
//           {session ? (
//             <div className="flex items-center space-x-4">
//               <Button
//                 onClick={() => signOut()}
//                 className="hover:text-rose-300 font-bold"
//                 variant="ghost"
//               >
//                 Logout
//               </Button>
//             </div>
//           ) : (
//             <Link href="/signin">
//               <Button className="font-bold" variant="ghost">
//                 Login
//               </Button>
//             </Link>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;










// 'use client'

// import { useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { Book, Clock, Award, Star, ChevronDown, ChevronUp, Loader2 } from 'lucide-react'
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Progress } from "@/components/ui/progress"

// interface CourseCardProps {

//   courseId: string;
//   title: string;
//   description: string;
//   price: number;
//   thumbnail: string;
//   onViewClick: () => void;
//   onWatchClick: () => void;
//   onAddToCartClick: () => void;
//   addVideo: () => void; // admin only
//   isAdmin: boolean | undefined;
//   isLoading?: boolean;
//   purchasedCourseId?:string;
  

//   imageUrl?: string
//   duration?: string
//   level?: string
//   rating?: number
//   features?: string[]
// }

// export default function CourseCard({
//   courseId,
//   title = "Advanced Web Development Masterclass",
//   description = "Master the latest web technologies and frameworks in this comprehensive course.",
//   price = 99.99,
//   thumbnail="/placeholder.svg?height=400&width=600",
//   onViewClick,
//   onWatchClick,
//   onAddToCartClick,
//   addVideo, // admin only
//   isAdmin = false,
//   isLoading = true,
//   purchasedCourseId,

//   imageUrl = "/placeholder.svg?height=400&width=600",
//   duration = "10 weeks",
//   level = "Intermediate",
//   rating = 4.8,
//   features = [
//     "24/7 access to course materials",
//     "Live coding sessions",
//     "Personal project reviews",
//     "Job placement assistance"
//   ]
// }: CourseCardProps) {
//   const [isExpanded, setIsExpanded] = useState(false)

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <Loader2 className="animate-spin h-12 w-12 text-blue-500" />
//       </div>
//     );
//   }

//   return (
//     <Card className="w-full max-w-md overflow-hidden">
//       <div className="relative">
//         <img 
//           src={thumbnail} 
//           alt={title} 
//           className="w-full h-48 object-cover"
//         />
//         <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
//           {level}
//         </Badge>
        
//             {/* Admin-only Add Video Button */}
//     {isAdmin && (
//       <Button
//         variant="destructive"
//         className="px-4 py-2 text-sm absolute bottom-40"
//         onClick={addVideo}
//         disabled={isLoading}
//       >
//         {isLoading ? (
//           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//         ) : (
//           "Add Videos"
//         )}
//       </Button>
//     )}

//       </div>
//       <CardHeader>
//         <CardTitle className="text-2xl font-bold">{title}</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <p className="text-muted-foreground mb-4">
//         {description.length > 60 ? `${description.substring(0, 115)}...` : description}
//         </p>
//         <div className="flex justify-between items-center mb-4">
//           <div className="flex items-center">
//             <Clock className="w-4 h-4 mr-1 text-muted-foreground" />
//             <span className="text-sm">{duration}</span>
//           </div>
//           <div className="flex items-center">
//             <Star className="w-4 h-4 mr-1 text-yellow-400" />
//             <span className="text-sm font-semibold">{rating}</span>
//           </div>
//         </div>
//         <Progress value={price/20} className="mb-2" />
//         <p className="text-sm text-muted-foreground mb-4">{(price/20).toFixed()}% of students completed this course</p>
//         <motion.div 
//           initial={false}
//           animate={{ height: isExpanded ? 'auto' : 0 }}
//           transition={{ duration: 0.3 }}
//           className="overflow-hidden"
//         >
//           <h4 className="font-semibold mb-2">Course Features:</h4>
//           <ul className="list-disc list-inside space-y-1 mb-4">
//             {features.map((feature, index) => (
//               <li key={index} className="text-sm text-muted-foreground">{feature}</li>
//             ))}
//           </ul>
//         </motion.div>
//       </CardContent>
//       <CardFooter className="flex flex-col items-stretch">

//         <div className="flex justify-between items-center w-full mb-4">
//          {/* Conditionally render buttons */}
//     {purchasedCourseId === courseId ? (
//       <Button
//       variant="default"
//       className="px-4 py-2 text-sm mx-auto w-full"
//       onClick={onWatchClick} // Redirect to course content or watch page
//       disabled={isLoading}
//       >
//         {isLoading ? (
//           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//         ) : (
//           "Watch Now"
//         )}
//       </Button>
//     ) : (
//       <>
//       <span className="text-2xl font-bold">₹{price}</span>
//         <Button
//           variant="outline"
//           className="px-4 py-2 text-sm"
//           onClick={onAddToCartClick}
//           disabled={isLoading}
//         >
//           {isLoading ? (
//             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//           ) : (
//             "Add to Cart"
//           )}
//         </Button>
//         <Button
//           variant="default"
//           className="px-4 py-2 text-sm"
//           onClick={onViewClick}
//           disabled={isLoading}
//         >
//           {isLoading ? (
//             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//           ) : (
//             "Enroll Now"
//           )}
//         </Button>
//       </>
//     )}
//         </div>
        
//         <Button 
//           variant="ghost" 
//           className="w-full"
//           onClick={() => setIsExpanded(!isExpanded)}
//         >
//           {isExpanded ? (
//             <>
//               <span>Show Less</span>
//               <ChevronUp className="ml-2 h-4 w-4" />
//             </>
//           ) : (
//             <>
//               <span>Show More</span>
//               <ChevronDown className="ml-2 h-4 w-4" />
//             </>
//           )}
//         </Button>
//       </CardFooter>
//     </Card>
//   )
// }

