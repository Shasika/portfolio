'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, Calendar, GraduationCap, Target } from 'lucide-react';
import Image from 'next/image';
import { useAbout, useAchievements, useQuickFacts, useEducation } from '@/hooks/useJsonData';

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const { data: about } = useAbout();
  const { data: achievements } = useAchievements();
  const { data: quickFacts } = useQuickFacts();
  const { data: education } = useEducation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="about" className="section">
      <div className="container">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-12 lg:space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="section-header">
            <h2 className="section-title">About Me</h2>
            <div className="divider" />
            <p className="section-description">
              Crafting digital experiences with passion and precision
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* Left Column - Photo & Content */}
            <motion.div variants={itemVariants} className="space-y-6 lg:space-y-8">
              {/* Professional Photo */}
              <motion.div
                variants={itemVariants}
                className="flex justify-center lg:justify-start"
              >
                <div className="relative">
                  <div className="relative w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-3xl overflow-hidden shadow-2xl">
                    <Image
                      src="/shasika.jpeg"
                      alt="Shasika Madhushan - Senior Software Engineer"
                      fill
                      className="object-cover object-[center_20%]"
                      priority
                    />
                    {/* Professional overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--primary))]/20 via-transparent to-transparent" />
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -inset-3 sm:-inset-4 rounded-3xl border border-[rgb(var(--primary))]/20 -z-10" />
                  <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[rgb(var(--primary))] to-[rgb(var(--accent))] rounded-2xl flex items-center justify-center shadow-lg">
                    <Award className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                </div>
              </motion.div>
              <div className="space-y-4 lg:space-y-6">
                <p className="text-base lg:text-lg text-muted leading-relaxed">
                  {about?.intro}
                </p>
                <p className="text-base lg:text-lg text-muted leading-relaxed">
                  {about?.secondParagraph}
                </p>
              </div>

              {/* Achievement Badges */}
              <div className="space-y-4 lg:space-y-6">
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-5 h-5 lg:w-6 lg:h-6 text-[rgb(var(--primary))]" />
                  <h3 className="text-lg lg:text-xl font-semibold">Notable Achievements</h3>
                </div>
                <div className="space-y-3 lg:space-y-4">
                  {achievements?.map((achievement, index) => (
                    <motion.div
                      key={achievement.title}
                      variants={itemVariants}
                      className="card-hover group"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ delay: 0.5 + (index * 0.1) }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-[rgb(var(--primary))] group-hover:text-[rgb(var(--primary-hover))] transition-colors">
                            {achievement.title}
                          </h4>
                          <p className="text-sm text-muted mt-1 leading-relaxed">
                            {achievement.description}
                          </p>
                        </div>
                        <div className="chip bg-gradient-to-r from-[rgb(var(--primary))]/10 to-[rgb(var(--accent))]/10 border-[rgb(var(--primary))]/20 text-[rgb(var(--primary))] font-medium">
                          {achievement.award}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Quick Facts & Education */}
            <motion.div variants={itemVariants} className="space-y-6 lg:space-y-8">
              {/* Quick Facts */}
              <div className="space-y-4 lg:space-y-6">
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 lg:w-6 lg:h-6 text-[rgb(var(--accent))]" />
                  <h3 className="text-lg lg:text-xl font-semibold">Quick Facts</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 lg:gap-4">
                  {quickFacts?.map((fact, index) => (
                    <motion.div
                      key={fact.label}
                      className="card-hover group text-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ delay: 0.3 + (index * 0.1) }}
                    >
                      <div className="space-y-2">
                        <div className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text group-hover:scale-110 transition-transform duration-300">
                          {fact.value}
                        </div>
                        <div className="text-sm lg:text-base text-muted font-medium">
                          {fact.label}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <motion.div
                variants={itemVariants}
                className="card-hover"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.6 }}
              >
                <div className="space-y-3 lg:space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-gradient-to-br from-[rgb(var(--accent))]/20 to-[rgb(var(--primary))]/20 flex items-center justify-center">
                      <GraduationCap className="w-4 h-4 lg:w-5 lg:h-5 text-[rgb(var(--accent))]" />
                    </div>
                    <h4 className="text-base lg:text-lg font-semibold">Education</h4>
                  </div>
                  <div className="space-y-2 pl-11 lg:pl-13">
                    <div className="text-sm lg:text-base font-medium text-[rgb(var(--fg))]">
                      {education?.degree}
                    </div>
                    <div className="flex items-center gap-2 text-muted text-sm lg:text-base">
                      <Calendar className="w-3 h-3 lg:w-4 lg:h-4" />
                      <span>{education?.period}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}