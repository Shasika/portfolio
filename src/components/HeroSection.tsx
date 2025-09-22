'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail, Phone, Linkedin, Code, Terminal, Github } from 'lucide-react';
import Image from 'next/image';
import { usePersonal, useHomeStats } from '@/hooks/useJsonData';

export function HeroSection() {
  const { data: personal, loading } = usePersonal();
  const { data: homeStats } = useHomeStats();

  const handleScrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <section id="home" className="relative pt-20 pb-16 lg:pt-24 lg:pb-20 overflow-hidden">
        <div className="container">
          <div className="flex items-center justify-center min-h-[600px]">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[rgb(var(--primary))]"></div>
          </div>
        </div>
      </section>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  const floatVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <section id="home" className="relative pt-20 pb-8 lg:pt-24 lg:pb-12 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-[rgb(var(--primary))]/10 to-[rgb(var(--accent))]/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-[rgb(var(--accent))]/10 to-[rgb(var(--primary))]/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Column - Main Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6 lg:space-y-8 lg:text-left text-center order-2 lg:order-1"
          >
            {/* Enhanced Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl glass-card text-sm font-medium text-[rgb(var(--fg))] lg:justify-start justify-center group"
            >
              <div className="relative">
                <Terminal className="w-5 h-5 text-[rgb(var(--primary))]" />
                <div className="absolute -inset-1 bg-[rgb(var(--primary))]/20 rounded-full blur-sm animate-pulse" />
              </div>
              <span className="font-display">{personal?.title}</span>
              <div className="w-2 h-2 bg-[rgb(var(--accent))] rounded-full animate-pulse" />
            </motion.div>

            {/* Name & Title */}
            <motion.div variants={itemVariants} className="space-y-4 lg:space-y-6">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight">
                <span className="block">
                  <span className="gradient-text relative">
                    {personal?.name.split(' ')[0]}
                    <motion.span
                      className="absolute -top-2 -right-8 text-2xl"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    >
                      👨‍💻
                    </motion.span>
                  </span>
                </span>
                <span className="block text-[rgb(var(--fg))]">
                  {personal?.name.split(' ')[1]}
                </span>
              </h1>
              <motion.div
                className="inline-block px-4 py-2 rounded-xl bg-gradient-to-r from-[rgb(var(--primary))]/10 to-[rgb(var(--accent))]/10 border border-[rgb(var(--primary))]/20"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="font-mono text-sm font-medium text-[rgb(var(--primary))]">
                  Full-Stack Developer | Problem Solver | Code Craftsman
                </span>
              </motion.div>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-lg lg:text-xl text-muted leading-relaxed max-w-xl lg:max-w-none lg:mx-0 mx-auto"
            >
              {personal?.subtitle}
            </motion.p>

            {/* Quick Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 lg:gap-6 max-w-md lg:max-w-lg mx-auto lg:mx-0"
            >
              {homeStats?.stats.map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-2xl lg:text-3xl font-bold text-[rgb(var(--primary))]">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center lg:items-start lg:justify-start justify-center gap-3 sm:gap-4 pt-2"
            >
              <motion.button
                onClick={handleScrollToProjects}
                className="btn-primary group w-full sm:w-auto"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </motion.button>

              <motion.a
                href="/shasika-cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary group w-full sm:w-auto"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                <span>Download CV</span>
              </motion.a>
            </motion.div>

            {/* Enhanced Contact Links */}
            <motion.div
              variants={itemVariants}
              className="flex items-center lg:justify-start justify-center gap-3 pt-4"
            >
              {[
                {
                  href: `mailto:${personal?.email}`,
                  icon: Mail,
                  label: 'Email',
                  color: 'from-red-500 to-pink-500',
                  bg: 'bg-red-500/10'
                },
                {
                  href: `tel:${personal?.phone}`,
                  icon: Phone,
                  label: 'Call',
                  color: 'from-green-500 to-emerald-500',
                  bg: 'bg-green-500/10'
                },
                {
                  href: personal?.linkedin,
                  icon: Linkedin,
                  label: 'LinkedIn',
                  color: 'from-blue-500 to-sky-500',
                  bg: 'bg-blue-500/10',
                  external: true
                },
                {
                  href: '#',
                  icon: Github,
                  label: 'GitHub',
                  color: 'from-gray-700 to-gray-900',
                  bg: 'bg-gray-500/10',
                  external: true
                }
              ].map((contact, index) => (
                <motion.a
                  key={contact.label}
                  href={contact.href}
                  target={contact.external ? "_blank" : undefined}
                  rel={contact.external ? "noopener noreferrer" : undefined}
                  className={`group relative flex items-center gap-2 p-3 rounded-xl glass-card hover:scale-105 transition-all duration-300 ${contact.bg}`}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + (index * 0.1) }}
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${contact.color} flex items-center justify-center text-white shadow-lg`}>
                    <contact.icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium text-[rgb(var(--fg))] group-hover:text-[rgb(var(--primary))] transition-colors duration-200 hidden lg:block">
                    {contact.label}
                  </span>
                  {/* Hover glow effect */}
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${contact.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 -z-10`} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Visual Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="order-1 lg:order-2 flex items-center justify-center"
          >
            <motion.div
              variants={itemVariants}
              className="relative w-full max-w-md lg:max-w-lg"
            >
              {/* Enhanced Visual Card */}
              <div className="glass-card p-8 lg:p-10 text-center relative overflow-hidden">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <motion.div
                    className="absolute top-4 left-4 w-20 h-20 border-2 border-[rgb(var(--primary))] rounded-lg"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute bottom-4 right-4 w-16 h-16 border-2 border-[rgb(var(--accent))] rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-[rgb(var(--primary))] rounded-2xl"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  />
                  {/* Code symbols */}
                  <motion.div
                    className="absolute top-1/4 right-1/4 text-[rgb(var(--primary))] text-2xl font-mono"
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {'</>'}
                  </motion.div>
                  <motion.div
                    className="absolute bottom-1/3 left-1/3 text-[rgb(var(--accent))] text-xl font-mono"
                    animate={{ opacity: [0.7, 0.3, 0.7] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    {'{}'}
                  </motion.div>
                </div>

                {/* Content */}
                <motion.div
                  variants={itemVariants}
                  className="relative z-10 space-y-6"
                >
                  {/* Profile Photo */}
                  <div className="relative mx-auto w-32 h-32 lg:w-36 lg:h-36">
                    <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl ring-4 ring-[rgb(var(--primary))]/20">
                      <Image
                        src="/shasika.jpeg"
                        alt="Shasika Madhushan - Senior Software Engineer"
                        fill
                        className="object-cover object-[center_20%]"
                        priority
                      />
                      {/* Gradient overlay for better integration */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--primary))]/10 via-transparent to-transparent" />
                    </div>
                    {/* Animated background glow */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[rgb(var(--primary))] to-[rgb(var(--accent))] opacity-20 blur-2xl animate-pulse -z-10" />
                    {/* Decorative ring */}
                    <div className="absolute -inset-2 rounded-3xl border-2 border-[rgb(var(--primary))]/10 animate-pulse" />
                  </div>

                  {/* Role Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[rgb(var(--primary))]/10 to-[rgb(var(--accent))]/10 border border-[rgb(var(--primary))]/20">
                    <Code className="w-4 h-4 text-[rgb(var(--primary))]" />
                    <span className="text-sm font-medium text-[rgb(var(--primary))]">
                      {homeStats?.roleTitle}
                    </span>
                  </div>

                  {/* Key Skills with Code Style */}
                  <div className="space-y-4">
                    <div className="text-sm font-medium text-muted">
                      {homeStats?.specialization.text}
                    </div>

                    {/* Code-style skill display */}
                    <div className="code-block text-left">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex gap-1">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-xs text-muted font-mono">skills.ts</span>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="text-[rgb(var(--muted))]">
                          <span className="text-purple-500">const</span>{' '}
                          <span className="text-blue-500">mySkills</span>{' '}
                          <span className="text-[rgb(var(--muted))]">=</span>{' '}
                          <span className="text-yellow-500">[</span>
                        </div>
                        {homeStats?.specialization.skills.slice(0, 3).map((skill, index) => (
                          <motion.div
                            key={skill}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.5 + (index * 0.2) }}
                            className="pl-4 text-green-400"
                          >
                            &quot;{skill}&quot;{index < 2 ? ',' : ''}
                          </motion.div>
                        ))}
                        <div className="text-yellow-500">];</div>
                      </div>
                    </div>

                    {/* Regular skill badges for remaining skills */}
                    <div className="flex flex-wrap gap-2 justify-center">
                      {homeStats?.specialization.skills.slice(3).map((skill, index) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 2.1 + (index * 0.1) }}
                          className="tech-badge text-xs"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          variants={floatVariants}
          className="flex justify-center pt-6 lg:pt-8"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="w-0.5 h-12 bg-gradient-to-b from-[rgb(var(--primary))] to-transparent rounded-full" />
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-5 h-5 rounded-full border-2 border-[rgb(var(--primary))] flex items-center justify-center"
            >
              <div className="w-1 h-1 bg-[rgb(var(--primary))] rounded-full" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}