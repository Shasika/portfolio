'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Lock, Code2, Globe } from 'lucide-react';
import { useProjects } from '@/hooks/useJsonData';

export function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { data: projects, loading, error } = useProjects();

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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="projects" className="py-20 px-6 bg-[rgb(var(--surface))]">
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
            <h2 className="text-4xl md:text-5xl font-bold">Featured Projects</h2>
            <div className="w-24 h-1 bg-[rgb(var(--primary))] mx-auto rounded-full" />
            <p className="text-lg text-[rgb(var(--fg))]/70 max-w-2xl mx-auto">
              A showcase of applications I&apos;ve built, from e-commerce platforms to SaaS solutions
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid gap-8 md:gap-12">
            {loading && (
              <div className="text-center text-muted">Loading projects...</div>
            )}
            {error && (
              <div className="text-center text-red-500">Error loading projects: {error}</div>
            )}
            {projects?.map((project, index) => (
              <motion.div
                key={project.title}
                variants={itemVariants}
                className={`card overflow-hidden ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } lg:flex lg:items-center lg:space-x-0 space-y-6 lg:space-y-0`}
              >
                {/* Project Image */}
                <div className="lg:w-1/2">
                  <div className="relative h-64 lg:h-80 rounded-xl overflow-hidden bg-gradient-to-br from-[rgb(var(--primary))]/20 to-[rgb(var(--primary))]/5">
                    {/* Placeholder for project image */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-[rgb(var(--primary))]/20 rounded-full flex items-center justify-center mx-auto">
                          <Code2 className="w-8 h-8 text-[rgb(var(--primary))]" />
                        </div>
                        <div className="text-lg font-medium text-[rgb(var(--primary))]">
                          {project.title}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className={`lg:w-1/2 space-y-6 ${
                  index % 2 === 0 ? 'lg:pl-8' : 'lg:pr-8'
                }`}>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">{project.title}</h3>
                    <p className="text-[rgb(var(--fg))]/80 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Features */}
                  {project.features && (
                    <div className="space-y-3">
                      <h4 className="font-semibold text-[rgb(var(--primary))]">Key Features:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {project.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-[rgb(var(--primary))] rounded-full" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tech Stack */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-[rgb(var(--primary))]">Tech Stack:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <span key={techIndex} className="chip text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 pt-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary flex items-center space-x-2 group"
                      >
                        <Globe className="w-4 h-4" />
                        <span>Live Demo</span>
                        <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                      </a>
                    )}

                    {project.adminUrl && (
                      <a
                        href={project.adminUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ghost flex items-center space-x-2 group"
                      >
                        <Lock className="w-4 h-4" />
                        <span>Admin Panel</span>
                        <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                      </a>
                    )}

                    {project.isInternal && (
                      <div className="btn-ghost flex items-center space-x-2 opacity-60 cursor-not-allowed">
                        <Lock className="w-4 h-4" />
                        <span>Internal Project</span>
                      </div>
                    )}
                  </div>

                  {/* Login Credentials */}
                  {project.credentials && (
                    <div className="bg-[rgb(var(--bg))]/50 rounded-lg p-4 border border-[rgb(var(--border))] text-sm">
                      <div className="font-medium text-[rgb(var(--primary))] mb-2">
                        Demo Credentials:
                      </div>
                      <div className="space-y-1 text-[rgb(var(--fg))]/70">
                        <div>Username: <span className="font-mono">{project.credentials.username}</span></div>
                        <div>Password: <span className="font-mono">{project.credentials.password}</span></div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div variants={itemVariants} className="text-center pt-8">
            <div className="card max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold mb-4">Interested in working together?</h3>
              <p className="text-[rgb(var(--fg))]/70 mb-6">
                I&apos;m always open to discussing new opportunities and exciting projects.
              </p>
              <a
                href="#contact"
                className="btn-primary inline-flex items-center space-x-2"
              >
                <span>Get In Touch</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}