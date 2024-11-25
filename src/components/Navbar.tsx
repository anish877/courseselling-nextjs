'use client'

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../components/ui/navbar-menu";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { ShoppingCart, AlertTriangle, Menu as HamburgerIcon, X as CloseIcon } from "lucide-react";
import Cart from "./Cart";
import { cn } from "@/lib/utils";
import { ThemeButton } from "./ThemeButton";

export default function Navbar(){
  const { data: session } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollUp, setScrollUp]= useState(false)
  const [active, setActive] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Handle scroll state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
      setLastScrollY(window.scrollY);
      setScrollUp(window.scrollY > lastScrollY)
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={cn(
        `fixed top-0 left-0 w-full z-50 bg-white shadow-md transition-all ease-in-out duration-700 ${scrollUp && "-translate-y-full"} dark:bg-black`,
        scrolled && "shadow-lg"
      )}
    >
      {/* Navbar */}
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="text-xl font-bold text-rose-500">
          <Link href="/">Learnix</Link>
        </div>

        {/* Hamburger Icon for Small Screens */}
        <div className="lg:hidden">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="focus:outline-none"
          >
            {menuOpen ? <CloseIcon className="w-6 h-6" /> : <HamburgerIcon className="w-6 h-6" />}
          </button>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-4">
          {session ? (
            <Button
              onClick={() => signOut()}
              className="hover:text-rose-500"
              variant="ghost"
            >
              Logout
            </Button>
          ) : (
            <HoveredLink href="/signin"><Button variant="outline">Login</Button></HoveredLink>
          )}
          <Cart icon={<ShoppingCart />} />
          <ThemeButton />
        </div>
      </div>

{/* Center navbar */}
      <motion.div
        initial={{ opacity: 0, translateY: 0 }}
        animate={{
          opacity: scrolled || !scrolled ? 1 : 0,
          translateY: scrollUp ? 99 : 0,
        }}
        transition={{ type: "spring", stiffness: 50 }}
        className="max-w-xl mx-auto hidden sm:block -mt-[70px]"
      >
        <Menu setActive={setActive}>
          <Link href="/">
            <MenuItem setActive={setActive} active={active} item="Home" />
          </Link>

          <MenuItem setActive={setActive} active={active} item="Courses">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/all-courses">All Courses</HoveredLink>
              <HoveredLink href="/channel">Dashboard</HoveredLink>
              {!session && <HoveredLink href="/signin">Login</HoveredLink>}
              {session?.user.isAdmin && (
                <Link
                  href="/admin"
                  className="flex items-center gap-1 justify-center text-red-900"
                >
                  Admin <AlertTriangle className="max-w-[20px]" />
                </Link>
              )}
            </div>
          </MenuItem>

          <MenuItem setActive={setActive} active={active} item="Browse">
            <div className="grid grid-cols-2 gap-10 p-4">
              <ProductItem
                title="Guitar lessons"
                href="/all-courses"
                src="https://images.pexels.com/photos/6670755/pexels-photo-6670755.jpeg?auto=compress&cs=tinysrgb&w=600"
                description="Play guitar like a pro."
              />
              <ProductItem
                title="Kids education"
                href="/all-courses"
                src="https://images.pexels.com/photos/6266990/pexels-photo-6266990.jpeg?auto=compress&cs=tinysrgb&w=600"
                description="Make your kids future ready"
              />
              <ProductItem
                title="Spoken Languages"
                href="/all-courses"
                src="https://images.pexels.com/photos/14814060/pexels-photo-14814060.jpeg?auto=compress&cs=tinysrgb&w=600"
                description="Learn more than 5 languages"
              />
              <ProductItem
                title="How to YouTube"
                href="/all-courses"
                src="https://media.istockphoto.com/id/1319492772/photo/video-marketing-concept-laptop-with-a-playing-icon-on-the-laptop-screen.jpg?b=1&s=612x612&w=0&k=20&c=w-U1Mgp7xqvNdjMAk9uoy8QIGEEdUJOPOdBeVXLTVYI="
                description="Learn 10x faster using AI"
              />
            </div>
          </MenuItem>

          <MenuItem setActive={setActive} active={active} item="Content">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/newsletters">Newsletter</HoveredLink>
              <HoveredLink href="/books/e-books">e-books</HoveredLink>
              <HoveredLink href="/videos">Videos</HoveredLink>
              <HoveredLink href="/blogs">Blogs</HoveredLink>
              <HoveredLink href="/upcoming-courses">Upcoming Courses</HoveredLink>
            </div>
          </MenuItem>
        </Menu>
      </motion.div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={menuOpen ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className="lg:hidden overflow-hidden"
      >
        <div className="flex flex-col items-center space-y-4 py-4">
          <HoveredLink href="/">Home</HoveredLink>
          <HoveredLink href="/all-courses">All Courses</HoveredLink>
          <HoveredLink href="/channel">Dashboard</HoveredLink>
          {!session && <HoveredLink href="/signin">Login</HoveredLink>}
          {session?.user.isAdmin && (
            <Link
              href="/admin"
              className="flex items-center gap-1 justify-center text-red-900"
            >
              Admin <AlertTriangle className="max-w-[20px]" />
            </Link>
          )}
          <HoveredLink href="/newsletters">Newsletter</HoveredLink>
          <HoveredLink href="/books/e-books">E-Books</HoveredLink>
          <HoveredLink href="/videos">Videos</HoveredLink>
          <HoveredLink href="/blogs">Blogs</HoveredLink>
          <HoveredLink href="/upcoming-courses">Upcoming Courses</HoveredLink>
          <ThemeButton />
        </div>
      </motion.div>
    </div>
  );
}
