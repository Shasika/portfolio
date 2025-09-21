'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar } from 'lucide-react';
import { useExperience } from '@/hooks/useJsonData';

export function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { data: experience, loading, error } = useExperience();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="experience" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">Experience</h2>
            <div className="w-24 h-1 bg-[rgb(var(--primary))] mx-auto rounded-full" />
            <p className="text-lg text-[rgb(var(--fg))]/70 max-w-2xl mx-auto">
              My professional journey and contributions to various organizations
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-[rgb(var(--border))] transform md:-translate-x-px" />

            <div className="space-y-12">
              {loading && (
                <div className="text-center text-muted">Loading experience...</div>
              )}
              {error && (
                <div className="text-center text-red-500">Error loading experience: {error}</div>
              )}
              {experience?.map((job, index) => (
                <motion.div
                  key={`${job.company}-${job.period}`}
                  variants={itemVariants}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-[rgb(var(--primary))] rounded-full transform -translate-x-2 md:-translate-x-2 z-10 border-4 border-[rgb(var(--bg))]" />

                  {/* Content Card */}
                  <div className={`card ml-20 md:ml-0 md:w-5/12 ${
                    index % 2 === 0 ? 'md:mr-auto md:ml-0' : 'md:ml-auto md:mr-0'
                  }`}>
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-[rgb(var(--primary))]">
                          {job.role}
                        </h3>
                        <h4 className="text-lg font-semibold">
                          {job.company}
                        </h4>
                        <div className="flex items-center space-x-4 text-sm text-[rgb(var(--fg))]/70">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{job.period}</span>
                          </div>
                        </div>
                      </div>

                      {/* Highlights */}
                      <div className="space-y-3">
                        {job.highlights.map((highlight, highlightIndex) => (
                          <motion.div
                            key={highlightIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                            transition={{ delay: (index * 0.2) + (highlightIndex * 0.1) + 0.3 }}
                            className="flex items-start space-x-3"
                          >
                            <div className="w-2 h-2 bg-[rgb(var(--primary))] rounded-full mt-2 flex-shrink-0" />
                            <p className="text-[rgb(var(--fg))]/80 leading-relaxed">
                              {highlight}
                            </p>
                          </motion.div>
                        ))}
                      </div>

                      {/* Tech Stack */}
                      <div className="pt-4 border-t border-[rgb(var(--border))]">
                        <div className="flex flex-wrap gap-2">
                          {job.tech.map((tech, techIndex) => (
                            <motion.span
                              key={tech}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                              transition={{ delay: (index * 0.2) + (techIndex * 0.05) + 0.5 }}
                              className="chip text-xs"
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Summary Stats */}
          <motion.div variants={itemVariants} className="bg-[rgb(var(--surface))] rounded-2xl p-8 border border-[rgb(var(--border))]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-[rgb(var(--primary))]">4+</div>
                <div className="text-[rgb(var(--fg))]/70">Years Experience</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-[rgb(var(--primary))]">15+</div>
                <div className="text-[rgb(var(--fg))]/70">Projects Delivered</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-[rgb(var(--primary))]">3</div>
                <div className="text-[rgb(var(--fg))]/70">Major Platforms Built</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}