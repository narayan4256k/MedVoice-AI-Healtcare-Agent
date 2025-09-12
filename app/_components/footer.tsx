"use client";

import Link from "next/link";
import { Instagram, Twitter, Youtube, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-slate-950 text-gray-700 dark:text-gray-400 pt-12 pb-4 px-6 border-t border-gray-300 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
        
        {/* Brand / Logo */}
        <div>
          <h2 className="text-gray-900 dark:text-white text-2xl font-bold tracking-wide">
            MediVoice AI
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            Your AI-powered healthcare companion. Get instant symptom checks,
            voice-based interactions, and safe medicine guidance — anytime,
            anywhere.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-gray-900 dark:text-white text-sm font-semibold mb-4 uppercase tracking-wide">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <Link href="#features" className="hover:text-blue-600 dark:hover:text-blue-500">
                Features
              </Link>
            </li>
            <li>
              <Link href="#pricing" className="hover:text-blue-600 dark:hover:text-blue-500">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="#contact" className="hover:text-blue-600 dark:hover:text-blue-500">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-gray-900 dark:text-white text-sm font-semibold mb-4 uppercase tracking-wide">
            Resources
          </h3>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-500">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-blue-600 dark:hover:text-blue-500">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/support" className="hover:text-blue-600 dark:hover:text-blue-500">
                Support
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-gray-900 dark:text-white text-sm font-semibold mb-4 uppercase tracking-wide">
            Connect With Us
          </h3>
          <div className="flex space-x-5">
            <Link
              href="https://twitter.com"
              target="_blank"
              className="hover:text-sky-500 transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              className="hover:text-pink-500 transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </Link>
            <Link
              href="https://youtube.com"
              target="_blank"
              className="hover:text-red-500 transition-colors"
            >
              <Youtube className="w-5 h-5" />
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              className="hover:text-blue-700 dark:hover:text-blue-500 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-300 dark:border-gray-800 pt-4 text-center text-sm text-gray-600 dark:text-gray-500 transition-colors">
        © {new Date().getFullYear()} MediVoice AI. All rights reserved. |
        <span className="ml-1"> Built with ❤️ for better healthcare</span>
      </div>
    </footer>
  );
}
