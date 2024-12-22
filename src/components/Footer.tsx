'use client'

import React from 'react'
import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300">
      <div className="container mx-auto px-6 py-16">
        {/* Main Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold tracking-wide uppercase text-gray-900 dark:text-white">About Learnix</h3>
            <p className="text-sm leading-relaxed opacity-90">
              Learnix is your gateway to mastering new skills and expanding your knowledge. Explore top-quality courses, taught by industry experts, to grow both personally and professionally.
            </p>
            <div className="flex items-center space-x-5">
              <SocialLink href="https://facebook.com/Learnix" icon={<Facebook className="h-5 w-5" />} label="Facebook" />
              <SocialLink href="https://instagram.com/Learnix" icon={<Instagram className="h-5 w-5" />} label="Instagram" />
              <SocialLink href="https://linkedin.com/company/Learnix" icon={<Linkedin className="h-5 w-5" />} label="LinkedIn" />
              <SocialLink href="https://twitter.com/Learnix" icon={<Twitter className="h-5 w-5" />} label="Twitter" />
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold tracking-wide uppercase text-gray-900 dark:text-white">Quick Links</h3>
            <ul className="space-y-3">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/all-courses">Courses</FooterLink>
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
              <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
              <FooterLink href="/terms-of-service">Terms of Service</FooterLink>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold tracking-wide uppercase text-gray-900 dark:text-white">Contact Learnix</h3>
            <ul className="space-y-4">
              <li className="flex items-center group">
                <Mail className="h-5 w-5 mr-3 text-gray-400 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
                <a href="mailto:support@learnix.com" 
                   className="text-sm hover:text-gray-900 dark:hover:text-white transition-colors">
                  support@learnix.com
                </a>
              </li>
              <li className="flex items-center group">
                <Phone className="h-5 w-5 mr-3 text-gray-400 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start group">
                <MapPin className="h-5 w-5 mr-3 mt-1 text-gray-400 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
                <span className="text-sm">789 Knowledge Avenue, Learning City, Mumbai</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold tracking-wide uppercase text-gray-900 dark:text-white">Stay Updated</h3>
            <p className="text-sm leading-relaxed opacity-90">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 h-11 px-4"
              />
              <Button 
                type="submit" 
                className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 h-11 font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <Separator className="my-10 bg-gray-200 dark:bg-gray-800" />
        
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm opacity-90">&copy; {currentYear} Learnix. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link 
              href="/sitemap" 
              className="text-sm hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Sitemap
            </Link>
            <Link 
              href="/accessibility" 
              className="text-sm hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

const SocialLink: React.FC<{ href: string; icon: React.ReactNode; label: string }> = ({ href, icon, label }) => (
  <a
    href={href}
    className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all transform hover:scale-110"
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
  >
    {icon}
  </a>
)

const FooterLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <li>
    <Link 
      href={href} 
      className="text-sm hover:text-gray-900 dark:hover:text-white transition-colors inline-block"
    >
      {children}
    </Link>
  </li>
)

export default Footer