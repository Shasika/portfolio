'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail, Phone, Linkedin, Sparkles, Code } from 'lucide-react';
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
    <section id="home" className="relative pt-20 pb-16 lg:pt-24 lg:pb-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-[rgb(var(--primary))]/10 to-[rgb(var(--accent))]/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-[rgb(var(--accent))]/10 to-[rgb(var(--primary))]/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center px-4 sm:px-6">
          {/* Left Column - Main Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6 lg:space-y-8 lg:text-left text-center order-2 lg:order-1"
          >
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgb(var(--surface))] border border-[rgb(var(--border))] text-sm font-medium text-muted lg:justify-start justify-center"
            >
              <Sparkles className="w-4 h-4 text-[rgb(var(--primary))]" />
              <span>{personal?.title}</span>
            </motion.div>

            {/* Name & Title */}
            <motion.div variants={itemVariants} className="space-y-3 lg:space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight">
                <span className="block">
                  <span className="gradient-text">
                    {personal?.name.split(' ')[0]}
                  </span>
                </span>
                <span className="block text-[rgb(var(--fg))]">
                  {personal?.name.split(' ')[1]}
                </span>
              </h1>
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
              className="flex flex-col sm:flex-row items-center lg:items-start lg:justify-start justify-center gap-4 pt-2"
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

            {/* Contact Links */}
            <motion.div
              variants={itemVariants}
              className="flex items-center lg:justify-start justify-center gap-4 pt-4"
            >
              {[
                {
                  href: `mailto:${personal?.email}`,
                  icon: Mail,
                  label: 'Email',
                  color: 'text-red-500'
                },
                {
                  href: `tel:${personal?.phone}`,
                  icon: Phone,
                  label: 'Call',
                  color: 'text-green-500'
                },
                {
                  href: personal?.linkedin,
                  icon: Linkedin,
                  label: 'LinkedIn',
                  color: 'text-blue-500',
                  external: true
                }
              ].map((contact, index) => (
                <motion.a
                  key={contact.label}
                  href={contact.href}
                  target={contact.external ? "_blank" : undefined}
                  rel={contact.external ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-2 p-2 rounded-lg hover:bg-[rgb(var(--surface))]/50 transition-all duration-200"
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + (index * 0.1) }}
                >
                  <div className={`w-8 h-8 rounded-lg bg-[rgb(var(--surface))] flex items-center justify-center group-hover:scale-110 transition-transform duration-200 ${contact.color}`}>
                    <contact.icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs text-muted group-hover:text-[rgb(var(--fg))] transition-colors duration-200 hidden lg:block">
                    {contact.label}
                  </span>
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
              {/* Main Visual Card */}
              <div className="card-hover p-8 lg:p-10 text-center relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-4 left-4 w-20 h-20 border-2 border-[rgb(var(--primary))] rounded-lg rotate-12" />
                  <div className="absolute bottom-4 right-4 w-16 h-16 border-2 border-[rgb(var(--accent))] rounded-full" />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-[rgb(var(--primary))] rounded-2xl rotate-45" />
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

                  {/* Key Skills */}
                  <div className="space-y-3">
                    <div className="text-sm font-medium text-muted">
                      {homeStats?.specialization.text}
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {homeStats?.specialization.skills.map((skill, index) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1.5 + (index * 0.1) }}
                          className="chip text-xs bg-gradient-to-r from-[rgb(var(--primary))]/5 to-[rgb(var(--accent))]/5 border-[rgb(var(--primary))]/20"
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
          className="flex justify-center pt-12 lg:pt-16"
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