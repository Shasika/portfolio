'use client';

import { motion } from 'framer-motion';
import { Heart, Linkedin, Mail } from 'lucide-react';
import { usePersonal, useNavigation } from '@/hooks/useJsonData';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { data: personal } = usePersonal();
  const { data: navigation } = useNavigation();

  return (
    <footer className="py-12 px-6 border-t border-[rgb(var(--border))]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 justify-center md:justify-start">
                <div className="w-8 h-8 rounded-lg bg-[rgb(var(--primary))] flex items-center justify-center text-white font-bold">
                  SM
                </div>
                <span className="font-semibold">{personal?.name}</span>
              </div>
              <p className="text-[rgb(var(--fg))]/70 text-sm leading-relaxed">
                Senior Software Engineer crafting exceptional web experiences with clean code and innovative solutions.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="font-semibold">Quick Links</h3>
              <div className="space-y-2">
                {navigation?.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block text-sm text-[rgb(var(--fg))]/70 hover:text-[rgb(var(--primary))] transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="font-semibold">Get In Touch</h3>
              <div className="space-y-3">
                <a
                  href={`mailto:${personal?.email}`}
                  className="flex items-center space-x-2 text-sm text-[rgb(var(--fg))]/70 hover:text-[rgb(var(--primary))] transition-colors duration-200 justify-center md:justify-start"
                >
                  <Mail className="w-4 h-4" />
                  <span>{personal?.email}</span>
                </a>
                <a
                  href={personal?.linkedin || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-sm text-[rgb(var(--fg))]/70 hover:text-[rgb(var(--primary))] transition-colors duration-200 justify-center md:justify-start"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn Profile</span>
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-[rgb(var(--border))] pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              {/* Copyright */}
              <div className="flex items-center space-x-2 text-sm text-[rgb(var(--fg))]/70">
                <span>© {currentYear} {personal?.name}. Made with</span>
                <Heart className="w-4 h-4 text-red-500" />
                <span>using Next.js & Tailwind CSS</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}