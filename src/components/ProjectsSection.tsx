'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  ExternalLink,
  Lock,
  Code2,
  Globe,
  Github,
  Star,
  Calendar,
  Filter,
  Eye,
  Box,
  Zap,
  Award,
  Play,
  ArrowRight,
  Key
} from 'lucide-react';
import { useProjects } from '@/hooks/useJsonData';

export function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { data: projects, loading, error } = useProjects();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'showcase'>('showcase');

  const categories = ['All', ...new Set(projects?.map(p => p.category) || [])];

  const filteredProjects = projects?.filter(project =>
    selectedCategory === 'All' || project.category === selectedCategory
  ) || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live': return 'from-green-500 to-emerald-600';
      case 'Production': return 'from-blue-500 to-indigo-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'E-commerce': return Globe;
      case 'Business Tools': return Box;
      case 'SaaS Platform': return Zap;
      case 'Personal': return Star;
      default: return Code2;
    }
  };

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
    <section id="projects" className="section bg-gradient-to-br from-[rgb(var(--bg))] to-[rgb(var(--surface))]">
      <div className="container">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-12 lg:space-y-16"
        >
          {/* Enhanced Section Header */}
          <motion.div variants={itemVariants} className="section-header text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[rgb(var(--primary))] to-[rgb(var(--accent))] flex items-center justify-center">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <h2 className="section-title">Featured Projects</h2>
            </div>
            <div className="divider mx-auto" />
            <p className="section-description max-w-2xl mx-auto">
              A showcase of applications I&apos;ve built, from e-commerce platforms to enterprise SaaS solutions
            </p>

            {/* Project Statistics */}
            <div className="flex items-center justify-center gap-6 mt-8 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-[rgb(var(--fg))]/60">{projects?.filter(p => p.status === 'Live').length || 0} Live Projects</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span className="text-[rgb(var(--fg))]/60">{projects?.filter(p => p.githubUrl).length || 0} Open Source</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                <span className="text-[rgb(var(--fg))]/60">{categories.length - 1} Categories</span>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Filters & View Toggle */}
          <motion.div variants={itemVariants} className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Category Filter */}
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-[rgb(var(--primary))]" />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const IconComponent = getCategoryIcon(category);
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                        selectedCategory === category
                          ? 'bg-[rgb(var(--primary))] text-white shadow-lg'
                          : 'bg-[rgb(var(--surface))] text-[rgb(var(--fg))]/70 hover:bg-[rgb(var(--surface-hover))]'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-[rgb(var(--surface))] p-1 rounded-lg">
              <button
                onClick={() => setViewMode('showcase')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  viewMode === 'showcase'
                    ? 'bg-[rgb(var(--primary))] text-white shadow-lg'
                    : 'text-[rgb(var(--fg))]/70 hover:bg-[rgb(var(--surface-hover))]'
                }`}
              >
                <Eye className="w-4 h-4 inline-block mr-2" />
                Showcase
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-[rgb(var(--primary))] text-white shadow-lg'
                    : 'text-[rgb(var(--fg))]/70 hover:bg-[rgb(var(--surface-hover))]'
                }`}
              >
                <Box className="w-4 h-4 inline-block mr-2" />
                Grid
              </button>
            </div>
          </motion.div>

          {/* Enhanced Projects Display */}
          {loading && (
            <motion.div variants={itemVariants} className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-2 border-[rgb(var(--primary))] border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-[rgb(var(--fg))]/60">Loading amazing projects...</p>
            </motion.div>
          )}

          {error && (
            <motion.div variants={itemVariants} className="text-center py-12">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ExternalLink className="w-8 h-8 text-red-500" />
              </div>
              <p className="text-red-500">Error loading projects: {error}</p>
            </motion.div>
          )}

          {viewMode === 'showcase' ? (
            /* Showcase View - Enhanced Layout */
            <div className="space-y-12 lg:space-y-16">
              {filteredProjects.map((project, index) => {
                const CategoryIcon = getCategoryIcon(project.category);
                return (
                  <motion.div
                    key={project.title}
                    variants={itemVariants}
                    className={`group relative overflow-hidden rounded-3xl glass-card p-8 lg:p-12 ${
                      index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    } lg:flex lg:items-center lg:gap-12`}
                    whileHover={{ y: -5 }}
                  >
                    {/* Project Showcase Image */}
                    <div className="lg:w-1/2 mb-8 lg:mb-0">
                      <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-[rgb(var(--primary))]/10 via-[rgb(var(--accent))]/5 to-transparent">
                        {/* Interactive Preview Placeholder */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center space-y-6">
                            <div className="relative">
                              <div className="w-20 h-20 bg-gradient-to-br from-[rgb(var(--primary))] to-[rgb(var(--accent))] rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                                <CategoryIcon className="w-10 h-10 text-white" />
                              </div>
                              <div className={`absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r ${getStatusColor(project.status)} rounded-full flex items-center justify-center`}>
                                <div className="w-2 h-2 bg-white rounded-full" />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="text-xl font-bold text-[rgb(var(--primary))]">
                                {project.title}
                              </div>
                              <div className="flex items-center justify-center gap-2 text-sm text-[rgb(var(--fg))]/60">
                                <Calendar className="w-4 h-4" />
                                <span>{project.year}</span>
                                <span>•</span>
                                <span>{project.category}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
                          <div className="flex gap-3">
                            {project.liveUrl && (
                              <motion.a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                              >
                                <Play className="w-5 h-5" />
                              </motion.a>
                            )}
                            {project.githubUrl && (
                              <motion.a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                              >
                                <Github className="w-5 h-5" />
                              </motion.a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Project Details */}
                    <div className="lg:w-1/2 space-y-6">
                      {/* Project Header */}
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <h3 className="text-2xl lg:text-3xl font-bold">{project.title}</h3>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getStatusColor(project.status)} text-white`}>
                                {project.status}
                              </span>
                            </div>
                            <p className="text-[rgb(var(--fg))]/60 text-sm flex items-center gap-2">
                              <CategoryIcon className="w-4 h-4" />
                              {project.category} • {project.year}
                            </p>
                          </div>
                        </div>
                        <p className="text-[rgb(var(--fg))]/80 leading-relaxed text-lg">
                          {project.description}
                        </p>
                      </div>

                      {/* Project Highlights */}
                      {project.highlights && (
                        <div className="space-y-3">
                          <h4 className="font-semibold text-[rgb(var(--primary))] flex items-center gap-2">
                            <Award className="w-4 h-4" />
                            Key Highlights
                          </h4>
                          <div className="grid grid-cols-1 gap-2">
                            {project.highlights.map((highlight, highlightIndex) => (
                              <div key={highlightIndex} className="flex items-center gap-3 text-sm">
                                <div className="w-2 h-2 bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--accent))] rounded-full" />
                                <span className="text-[rgb(var(--fg))]/80">{highlight}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tech Stack */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-[rgb(var(--primary))] flex items-center gap-2">
                          <Code2 className="w-4 h-4" />
                          Tech Stack
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech, techIndex) => (
                            <span key={techIndex} className="px-3 py-1 rounded-lg bg-[rgb(var(--surface))] text-[rgb(var(--fg))]/80 text-sm font-medium border border-[rgb(var(--border))] hover:bg-[rgb(var(--surface-hover))] transition-colors">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Enhanced Action Buttons */}
                      <div className="flex flex-wrap gap-3 pt-4">
                        {project.liveUrl && (
                          <motion.a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="btn-primary flex items-center gap-2 group"
                          >
                            <Globe className="w-4 h-4" />
                            <span>Live Demo</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                          </motion.a>
                        )}

                        {project.githubUrl && (
                          <motion.a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="btn-secondary flex items-center gap-2 group"
                          >
                            <Github className="w-4 h-4" />
                            <span>Source Code</span>
                            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                          </motion.a>
                        )}

                        {project.adminUrl && (
                          <motion.a
                            href={project.adminUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="btn-ghost flex items-center gap-2 group"
                          >
                            <Lock className="w-4 h-4" />
                            <span>Admin Panel</span>
                            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                          </motion.a>
                        )}

                        {project.isInternal && (
                          <div className="btn-ghost flex items-center gap-2 opacity-60 cursor-not-allowed">
                            <Lock className="w-4 h-4" />
                            <span>Internal Project</span>
                          </div>
                        )}
                      </div>

                      {/* Demo Credentials */}
                      {project.credentials && (
                        <div className="bg-gradient-to-r from-[rgb(var(--bg))]/50 to-[rgb(var(--surface))]/50 rounded-xl p-4 border border-[rgb(var(--border))]">
                          <div className="font-medium text-[rgb(var(--primary))] mb-2 flex items-center gap-2">
                            <Key className="w-4 h-4" />
                            Demo Credentials
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                            <div className="space-y-1">
                              <div className="text-[rgb(var(--fg))]/60">Username</div>
                              <div className="font-mono bg-[rgb(var(--surface))] px-2 py-1 rounded border">{project.credentials.username}</div>
                            </div>
                            <div className="space-y-1">
                              <div className="text-[rgb(var(--fg))]/60">Password</div>
                              <div className="font-mono bg-[rgb(var(--surface))] px-2 py-1 rounded border">{project.credentials.password}</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--primary))]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                  </motion.div>
                );
              })}
            </div>
          ) : (
            /* Grid View - Compact Cards */
            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredProjects.map((project, index) => {
                const CategoryIcon = getCategoryIcon(project.category);
                return (
                  <motion.div
                    key={project.title}
                    variants={itemVariants}
                    className="group glass-card p-6 rounded-2xl hover:shadow-xl transition-all duration-300"
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    {/* Project Header */}
                    <div className="relative mb-6">
                      <div className="h-32 bg-gradient-to-br from-[rgb(var(--primary))]/10 to-[rgb(var(--accent))]/5 rounded-xl flex items-center justify-center mb-4">
                        <CategoryIcon className="w-12 h-12 text-[rgb(var(--primary))] group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div className={`absolute top-2 right-2 w-3 h-3 bg-gradient-to-r ${getStatusColor(project.status)} rounded-full`} />
                    </div>

                    {/* Project Info */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold group-hover:text-[rgb(var(--primary))] transition-colors">{project.title}</h3>
                        <p className="text-sm text-[rgb(var(--fg))]/60">{project.category} • {project.year}</p>
                        <p className="text-sm text-[rgb(var(--fg))]/80 line-clamp-3">{project.description}</p>
                      </div>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-1">
                        {project.tech.slice(0, 3).map((tech, techIndex) => (
                          <span key={techIndex} className="px-2 py-1 rounded text-xs bg-[rgb(var(--surface))] text-[rgb(var(--fg))]/70 border border-[rgb(var(--border))]">
                            {tech}
                          </span>
                        ))}
                        {project.tech.length > 3 && (
                          <span className="px-2 py-1 rounded text-xs bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))]">
                            +{project.tech.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 btn-primary text-xs flex items-center justify-center gap-1 py-2"
                          >
                            <Globe className="w-3 h-3" />
                            <span>Demo</span>
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 btn-secondary text-xs flex items-center justify-center gap-1 py-2"
                          >
                            <Github className="w-3 h-3" />
                            <span>Code</span>
                          </a>
                        )}
                        {project.isInternal && (
                          <div className="flex-1 bg-[rgb(var(--surface))] text-[rgb(var(--fg))]/50 text-xs flex items-center justify-center gap-1 py-2 rounded-lg cursor-not-allowed">
                            <Lock className="w-3 h-3" />
                            <span>Private</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

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