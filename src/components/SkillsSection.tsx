'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useSkills } from '@/hooks/useJsonData';

export function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [showMore, setShowMore] = useState(false);

  const { data: skills } = useSkills();

  const skillCategories = [
    { title: 'Backend', skills: skills?.backend || [] },
    { title: 'Frontend', skills: skills?.frontend || [] },
    { title: 'Databases', skills: skills?.databases || [] },
    { title: 'Tools & Testing', skills: skills?.tools || [] },
    { title: 'Soft Skills', skills: skills?.soft || [] },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const chipVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 10
      }
    },
  };

  return (
    <section id="skills" className="section bg-[rgb(var(--surface))]">
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
            <h2 className="section-title">Skills & Expertise</h2>
            <div className="divider" />
            <p className="section-description">
              Technologies and skills I use to bring ideas to life
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="space-y-8 lg:space-y-12">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                variants={itemVariants}
                className="space-y-4 lg:space-y-6"
              >
                <h3 className="text-xl lg:text-2xl font-semibold text-[rgb(var(--primary))]">
                  {category.title}
                </h3>

                <motion.div
                  className="flex flex-wrap gap-2 lg:gap-3"
                  variants={containerVariants}
                >
                  {category.skills.map((skill, skillIndex) => {
                    const totalIndex = categoryIndex * 10 + skillIndex;
                    const shouldShow = showMore || totalIndex < 12;

                    if (!shouldShow) return null;

                    return (
                      <motion.div
                        key={skill}
                        variants={chipVariants}
                        className="chip group cursor-default text-sm lg:text-base"
                        whileHover={{
                          scale: 1.05,
                          boxShadow: `0 4px 20px rgb(var(--primary) / 0.3)`
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="relative z-10">{skill}</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-[rgb(var(--primary))]/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </motion.div>
                    );
                  })}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Show More/Less Button */}
          {!showMore && (
            <motion.div variants={itemVariants} className="text-center pt-6 lg:pt-8">
              <button
                onClick={() => setShowMore(true)}
                className="btn-ghost group"
              >
                <span>Show All Skills</span>
                <motion.div
                  className="w-4 h-4 lg:w-5 lg:h-5 ml-2"
                  animate={{ rotate: showMore ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.div>
              </button>
            </motion.div>
          )}

          {/* Skills Highlight */}
          <motion.div variants={itemVariants} className="card">
            <div className="text-center space-y-3 lg:space-y-4">
              <h3 className="text-lg lg:text-xl font-semibold">Core Expertise</h3>
              <p className="text-sm lg:text-base text-[rgb(var(--fg))]/70 leading-relaxed">
                Specialized in building full-stack web applications with <span className="text-[rgb(var(--primary))] font-medium">Laravel</span> and <span className="text-[rgb(var(--primary))] font-medium">Vue.js</span>,
                focusing on clean architecture, performance optimization, and maintainable code.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}