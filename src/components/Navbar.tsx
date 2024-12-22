'use client'

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { ShoppingCart, AlertTriangle, Menu as HamburgerIcon, X as CloseIcon } from "lucide-react";
import Cart from "./Cart";
import { cn } from "@/lib/utils";
import { ThemeButton } from "./ThemeButton";

export default function Navbar() {
  const { data: session } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollUp, setScrollUp] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
      setLastScrollY(window.scrollY);
      setScrollUp(window.scrollY > lastScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all ease-in-out duration-700",
        "bg-white/10 dark:bg-black/10 backdrop-blur-lg backdrop-saturate-150",
        "border-b border-white/20 dark:border-gray-800/20",
        scrolled && "shadow-lg shadow-black/5 dark:shadow-white/5",
        scrollUp && "-translate-y-full"
      )}
    >
      {/* Main Navbar */}
      <div className="flex items-center justify-between px-6">
        {/* Logo */}
        <div className="relative">
          <Link 
            href="/" 
            className="text-xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent"
          >
            Learnix
          </Link>
        </div>

        {/* Center Navigation Menu */}
        <div className="hidden sm:block">
          <Menu setActive={setActive}>
            <Link href="/">
              <MenuItem 
                setActive={setActive} 
                active={active} 
                item="Home"
                className="hover:text-rose-500 transition-colors duration-300"
              />
            </Link>

            <MenuItem 
              setActive={setActive} 
              active={active} 
              item="Courses"
              className="hover:text-rose-500 transition-colors duration-300"
            >
              <div className="flex flex-col space-y-4 text-sm p-6 min-w-[200px]">
                <HoveredLink href="/all-courses">All Courses</HoveredLink>
                {session?<HoveredLink href="/channel">Dashboard</HoveredLink>:null }
                {!session && <HoveredLink href="/signin">Login</HoveredLink>}
                {session?.user.isAdmin && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-1 text-red-900 hover:text-red-700 transition-colors duration-300"
                  >
                    Admin <AlertTriangle className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </MenuItem>

            <MenuItem 
              setActive={setActive} 
              active={active} 
              item="Browse"
              className="hover:text-rose-500 transition-colors duration-300"
            >
              <div className="grid grid-cols-2 gap-8 p-6">
                <ProductItem
                  title="Guitar lessons"
                  href="/all-courses"
                  src="https://images.pexels.com/photos/6670755/pexels-photo-6670755.jpeg?auto=compress&cs=tinysrgb&w=600"
                  description="Play guitar like a pro."
                  className="hover:scale-105 transition-transform duration-300"
                />
                <ProductItem
                  title="Kids education"
                  href="/all-courses"
                  src="https://images.pexels.com/photos/6266990/pexels-photo-6266990.jpeg?auto=compress&cs=tinysrgb&w=600"
                  description="Make your kids future ready"
                  className="hover:scale-105 transition-transform duration-300"
                />
                <ProductItem
                  title="Spoken Languages"
                  href="/all-courses"
                  src="https://images.pexels.com/photos/14814060/pexels-photo-14814060.jpeg?auto=compress&cs=tinysrgb&w=600"
                  description="Learn more than 5 languages"
                  className="hover:scale-105 transition-transform duration-300"
                />
                <ProductItem
                  title="How to YouTube"
                  href="/all-courses"
                  src="https://media.istockphoto.com/id/1319492772/photo/video-marketing-concept-laptop-with-a-playing-icon-on-the-laptop-screen.jpg?b=1&s=612x612&w=0&k=20&c=w-U1Mgp7xqvNdjMAk9uoy8QIGEEdUJOPOdBeVXLTVYI="
                  description="Learn 10x faster using AI"
                  className="hover:scale-105 transition-transform duration-300"
                />
              </div>
            </MenuItem>

            <MenuItem 
              setActive={setActive} 
              active={active} 
              item="Content"
              className="hover:text-rose-500 transition-colors duration-300"
            >
              <div className="flex flex-col space-y-4 text-sm p-6 min-w-[200px]">
                <HoveredLink href="/newsletters">Newsletter</HoveredLink>
                <HoveredLink href="/books/e-books">e-books</HoveredLink>
                <HoveredLink href="/videos">Videos</HoveredLink>
                <HoveredLink href="/blogs">Blogs</HoveredLink>
                <HoveredLink href="/upcoming-courses">Upcoming Courses</HoveredLink>
              </div>
            </MenuItem>
          </Menu>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center space-x-4">
          {/* Hamburger Menu for Mobile */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="hover:bg-white/20 dark:hover:bg-black/20"
            >
              {menuOpen ? 
                <CloseIcon className="w-5 h-5" /> : 
                <HamburgerIcon className="w-5 h-5" />
              }
            </Button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
            {session ? (
              <>
                <Button
                  onClick={() => signOut()}
                  variant="outline"
                  className="border-rose-500/50 hover:border-rose-500 hover:bg-rose-500/10 transition-all duration-300"
                >
                  Logout
                </Button>
                <div className="relative hover:scale-105 transition-transform duration-200">
                  <Cart icon={<ShoppingCart className="text-gray-700 dark:text-gray-300" />} />
                </div>
              </>
            ) : (
              <HoveredLink href="/signin">
                <Button 
                  variant="outline"
                  className="border-rose-500/50 hover:border-rose-500 hover:bg-rose-500/10 transition-all duration-300"
                >
                  Login
                </Button>
              </HoveredLink>
            )}
            <div className="hover:scale-105 transition-transform duration-200">
              <ThemeButton />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={menuOpen ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className="lg:hidden overflow-hidden backdrop-blur-lg bg-white/30 dark:bg-white/10"
      >
        <div className="flex flex-col items-center space-y-4 py-4">
          <HoveredLink href="/" onClick={closeMenu}>Home</HoveredLink>
          <HoveredLink href="/all-courses" onClick={closeMenu}>All Courses</HoveredLink>
          <HoveredLink href="/channel" onClick={closeMenu}>Dashboard</HoveredLink>
          {!session && <HoveredLink href="/signin" onClick={closeMenu}>Login</HoveredLink>}
          {session?.user.isAdmin && (
            <Link
              href="/admin"
              className="flex items-center gap-1 text-red-900 hover:text-red-700 transition-colors duration-300"
              onClick={closeMenu}
            >
              Admin <AlertTriangle className="w-4 h-4" />
            </Link>
          )}
          <HoveredLink href="/newsletters" onClick={closeMenu}>Newsletter</HoveredLink>
          <HoveredLink href="/books/e-books" onClick={closeMenu}>E-Books</HoveredLink>
          <HoveredLink href="/videos" onClick={closeMenu}>Videos</HoveredLink>
          <HoveredLink href="/blogs" onClick={closeMenu}>Blogs</HoveredLink>
          <HoveredLink href="/upcoming-courses" onClick={closeMenu}>Upcoming Courses</HoveredLink>
          <ThemeButton />
        </div>
      </motion.div>
    </div>
  );
}