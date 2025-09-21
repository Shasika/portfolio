'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, User, Code, Briefcase, Mail } from 'lucide-react';
import Image from 'next/image';
import { ThemeToggle } from './ThemeToggle';
import { usePersonal, useNavigation } from '@/hooks/useJsonData';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

  const { data: personal, loading: personalLoading } = usePersonal();
  const { data: navigation, loading: navigationLoading } = useNavigation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      setIsScrolled(scrollTop > 20);
      setScrollProgress(Math.min(scrollPercent, 100));

      // Update active section based on scroll position
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
      const scrollPosition = scrollTop + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const navigationIcons = {
    Home: Home,
    About: User,
    Skills: Code,
    Experience: Briefcase,
    Projects: Code,
    Contact: Mail
  };

  const handleNavClick = (href: string) => {
    closeMobileMenu();
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  if (personalLoading || navigationLoading) {
    return (
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-[rgb(var(--bg))]/85 backdrop-blur-md"
      >
        <nav className="container">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            <div className="animate-pulse w-32 h-8 bg-[rgb(var(--surface))] rounded-md"></div>
            <div className="animate-pulse w-8 h-8 bg-[rgb(var(--surface))] rounded-md"></div>
          </div>
        </nav>
      </motion.header>
    );
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass'
            : 'bg-[rgb(var(--bg))]/85 backdrop-blur-md'
        }`}
      >
        {/* Scroll Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--accent))] origin-left"
          style={{ scaleX: scrollProgress / 100 }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: scrollProgress / 100 }}
          transition={{ duration: 0.1 }}
        />
        <nav className="container">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            {/* Logo */}
            <motion.a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300 ring-2 ring-[rgb(var(--primary))]/20">
                  <Image
                    src="/shasika.jpeg"
                    alt="Shasika Madhushan"
                    width={48}
                    height={48}
                    className="object-cover object-[center_20%] w-full h-full"
                    priority
                  />
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[rgb(var(--primary))] to-[rgb(var(--accent))] opacity-20 blur-md -z-10 group-hover:opacity-40 transition-opacity duration-300" />
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-xl gradient-text block leading-none drop-shadow-sm">
                  {personal?.name.split(' ')[0]}
                </span>
                <span className="text-xs text-[rgb(var(--fg))]/70 font-medium">
                  Portfolio
                </span>
              </div>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              {navigation?.map((item, index) => {
                const IconComponent = navigationIcons[item.name as keyof typeof navigationIcons];
                const isActive = activeSection === item.name.toLowerCase();

                return (
                  <motion.button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`group relative px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 flex items-center space-x-2 ${
                      isActive
                        ? 'bg-[rgb(var(--primary))]/15 text-[rgb(var(--primary))] border border-[rgb(var(--primary))]/30 shadow-sm'
                        : 'text-[rgb(var(--fg))]/80 hover:text-[rgb(var(--primary))] hover:bg-[rgb(var(--surface))]/80 hover:shadow-sm'
                    }`}
                  >
                    {IconComponent && <IconComponent className="w-4 h-4" />}
                    <span>{item.name}</span>

                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-[rgb(var(--primary))]/5 to-[rgb(var(--accent))]/5 rounded-xl border border-[rgb(var(--primary))]/10"
                        initial={false}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}

                    {/* Hover indicator */}
                    <span className={`absolute -bottom-1 left-1/2 h-0.5 bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--accent))] transition-all duration-300 rounded-full ${
                      isActive ? 'w-6 -translate-x-1/2' : 'w-0 group-hover:w-6 group-hover:-translate-x-1/2'
                    }`} />
                  </motion.button>
                );
              })}
            </div>

            {/* Theme Toggle & Mobile Menu */}
            <div className="flex items-center space-x-3">
              <ThemeToggle />

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="lg:hidden relative w-10 h-10 rounded-lg bg-[rgb(var(--surface))]/70 hover:bg-[rgb(var(--surface))] border border-[rgb(var(--border))]/50 flex items-center justify-center transition-all duration-200"
                aria-label="Toggle mobile menu"
              >
                <motion.div
                  animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </motion.div>
              </motion.button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={closeMobileMenu}
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 max-w-[80vw] glass shadow-2xl z-50 lg:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-[rgb(var(--border))]">
                  <span className="font-bold text-lg gradient-text">Menu</span>
                  <button
                    onClick={closeMobileMenu}
                    className="btn-ghost p-2"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 px-6 py-8">
                  <nav className="space-y-3">
                    {navigation?.map((item, index) => {
                      const IconComponent = navigationIcons[item.name as keyof typeof navigationIcons];
                      const isActive = activeSection === item.name.toLowerCase();

                      return (
                        <motion.button
                          key={item.name}
                          onClick={() => handleNavClick(item.href)}
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`w-full flex items-center space-x-4 px-4 py-4 text-lg font-medium transition-all duration-300 rounded-xl group ${
                            isActive
                              ? 'bg-[rgb(var(--primary))]/15 text-[rgb(var(--primary))] border border-[rgb(var(--primary))]/30 shadow-sm'
                              : 'text-[rgb(var(--fg))]/80 hover:text-[rgb(var(--primary))] hover:bg-[rgb(var(--surface))]/80'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                            isActive
                              ? 'bg-[rgb(var(--primary))]/20 text-[rgb(var(--primary))]'
                              : 'bg-[rgb(var(--surface))]/50 group-hover:bg-[rgb(var(--primary))]/10 group-hover:text-[rgb(var(--primary))]'
                          }`}>
                            {IconComponent && <IconComponent className="w-5 h-5" />}
                          </div>
                          <span className="flex-1 text-left relative">
                            {item.name}
                            <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--accent))] transition-all duration-300 rounded-full ${
                              isActive ? 'w-full' : 'w-0 group-hover:w-full'
                            }`} />
                          </span>
                          {isActive && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-2 h-2 bg-[rgb(var(--primary))] rounded-full"
                            />
                          )}
                        </motion.button>
                      );
                    })}
                  </nav>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-[rgb(var(--border))]">
                  <div className="text-center">
                    <p className="text-sm text-muted">
                      Let&apos;s build something amazing together
                    </p>
                    <div className="mt-4">
                      <a
                        href="#contact"
                        className="btn-primary w-full"
                        onClick={closeMobileMenu}
                      >
                        Get In Touch
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}