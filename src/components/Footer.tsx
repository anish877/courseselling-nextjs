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
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Learnix Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">About Learnix</h3>
            <p className="text-sm mb-4">
              Learnix is your gateway to mastering new skills and expanding your knowledge. Explore top-quality courses, taught by industry experts, to grow both personally and professionally.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="https://facebook.com/Learnix" icon={<Facebook className="h-5 w-5" />} label="Facebook" />
              <SocialLink href="https://instagram.com/Learnix" icon={<Instagram className="h-5 w-5" />} label="Instagram" />
              <SocialLink href="https://linkedin.com/company/Learnix" icon={<Linkedin className="h-5 w-5" />} label="LinkedIn" />
              <SocialLink href="https://twitter.com/Learnix" icon={<Twitter className="h-5 w-5" />} label="Twitter" />
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/all-courses">Courses</FooterLink>
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
              <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
              <FooterLink href="/terms-of-service">Terms of Service</FooterLink>
            </ul>
          </div>

          {/* Contact Learnix Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Contact Learnix</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <a href="mailto:support@learnix.com" className="hover:text-white transition-colors">support@learnix.com</a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>789 Knowledge Avenue, Learning City, Mumbai</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Stay Updated</h3>
            <p className="text-sm mb-4">Subscribe to our newsletter for the latest updates and offers.</p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
              <Button type="submit" className="w-full bg-white text-black">Subscribe</Button>
            </form>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; {currentYear} Learnix. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/sitemap" className="text-sm hover:text-white transition-colors">Sitemap</Link>
            <Link href="/accessibility" className="text-sm hover:text-white transition-colors">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

const SocialLink: React.FC<{ href: string; icon: React.ReactNode; label: string }> = ({ href, icon, label }) => (
  <a
    href={href}
    className="text-gray-400 hover:text-white transition-colors"
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
  >
    {icon}
  </a>
)

const FooterLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <li>
    <Link href={href} className="hover:text-white transition-colors">
      {children}
    </Link>
  </li>
)

export default Footer

