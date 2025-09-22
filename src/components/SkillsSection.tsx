'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useSkills } from '@/hooks/useJsonData';
import {
  Server,
  Globe,
  Database,
  Wrench,
  Users,
  Code,
  Layers,
  Zap,
  Star,
  TrendingUp,
  Award,
  Target,
  BarChart3
} from 'lucide-react';

export function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'chart'>('grid');

  const { data: skills } = useSkills();

  const skillCategories = [
    {
      title: 'Backend',
      icon: Server,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-500/10',
      skills: skills?.backend?.map(skill => ({
        name: skill,
        level: getSkillLevel(skill),
        description: getSkillDescription(skill)
      })) || []
    },
    {
      title: 'Frontend',
      icon: Globe,
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-500/10',
      skills: skills?.frontend?.map(skill => ({
        name: skill,
        level: getSkillLevel(skill),
        description: getSkillDescription(skill)
      })) || []
    },
    {
      title: 'Databases',
      icon: Database,
      color: 'from-purple-500 to-violet-600',
      bgColor: 'bg-purple-500/10',
      skills: skills?.databases?.map(skill => ({
        name: skill,
        level: getSkillLevel(skill),
        description: getSkillDescription(skill)
      })) || []
    },
    {
      title: 'Tools & Testing',
      icon: Wrench,
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-500/10',
      skills: skills?.tools?.map(skill => ({
        name: skill,
        level: getSkillLevel(skill),
        description: getSkillDescription(skill)
      })) || []
    },
    {
      title: 'Soft Skills',
      icon: Users,
      color: 'from-pink-500 to-rose-600',
      bgColor: 'bg-pink-500/10',
      skills: skills?.soft?.map(skill => ({
        name: skill,
        level: getSkillLevel(skill),
        description: getSkillDescription(skill)
      })) || []
    },
  ];

  function getSkillLevel(skill: string): number {
    // Define proficiency levels based on your expertise
    const expertLevel = ['PHP (Laravel, CodeIgniter)', 'Vue.js', 'JavaScript', 'MySQL', 'Git'];
    const advancedLevel = ['Node.js', 'React', 'Next.js', 'API Development', 'Database Design', 'Tailwind CSS'];
    const intermediateLevel = ['jQuery', 'MongoDB', 'Livewire', 'Alpine.js', 'Testing'];

    if (expertLevel.some(expert => skill.includes(expert.split(' ')[0]))) return 95;
    if (advancedLevel.some(advanced => skill.includes(advanced.split(' ')[0]))) return 85;
    if (intermediateLevel.some(intermediate => skill.includes(intermediate.split(' ')[0]))) return 75;
    return 90; // Default for soft skills and others
  }

  function getSkillDescription(skill: string): string {
    const descriptions: Record<string, string> = {
      'PHP (Laravel, CodeIgniter)': 'Expert in PHP frameworks, building scalable web applications',
      'Vue.js': 'Advanced reactive frontend development with Vue ecosystem',
      'JavaScript': 'Modern ES6+ JavaScript and asynchronous programming',
      'React': 'Component-based UI development with hooks and state management',
      'Next.js': 'Full-stack React framework for production applications',
      'Node.js': 'Server-side JavaScript and REST API development',
      'MySQL': 'Database design, optimization, and complex queries',
      'MongoDB': 'NoSQL database design and aggregation pipelines',
      'Git': 'Version control, branching strategies, and collaboration',
      'Tailwind CSS': 'Utility-first CSS framework for rapid UI development',
      'API Development': 'RESTful APIs, authentication, and documentation',
      'Testing': 'Unit, integration, and end-to-end testing strategies',
      'Problem-solving': 'Analytical thinking and systematic debugging',
      'Communication': 'Technical documentation and cross-team collaboration',
      'Leadership': 'Team guidance and mentoring junior developers',
      'Critical thinking': 'Strategic planning and architectural decisions'
    };
    return descriptions[skill] || 'Professional experience and continuous learning';
  }

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

  return (
    <section id="skills" className="section bg-gradient-to-br from-[rgb(var(--surface))] to-[rgb(var(--bg))]">
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
                <Code className="w-6 h-6 text-white" />
              </div>
              <h2 className="section-title">Tech Stack & Expertise</h2>
            </div>
            <div className="divider mx-auto" />
            <p className="section-description max-w-2xl mx-auto">
              A comprehensive overview of my technical skills, frameworks, and tools with proficiency levels and real-world experience
            </p>

            {/* View Mode Toggle */}
            <div className="flex items-center justify-center mt-8 gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-[rgb(var(--primary))] text-white shadow-lg'
                    : 'bg-[rgb(var(--surface))] text-[rgb(var(--fg))]/70 hover:bg-[rgb(var(--surface-hover))]'
                }`}
              >
                <Layers className="w-4 h-4 inline-block mr-2" />
                Category View
              </button>
              <button
                onClick={() => setViewMode('chart')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  viewMode === 'chart'
                    ? 'bg-[rgb(var(--primary))] text-white shadow-lg'
                    : 'bg-[rgb(var(--surface))] text-[rgb(var(--fg))]/70 hover:bg-[rgb(var(--surface-hover))]'
                }`}
              >
                <BarChart3 className="w-4 h-4 inline-block mr-2" />
                Proficiency View
              </button>
            </div>
          </motion.div>

          {/* Enhanced Skills Visualization */}
          {viewMode === 'grid' ? (
            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {skillCategories.map((category, categoryIndex) => {
                const IconComponent = category.icon;
                return (
                  <motion.div
                    key={category.title}
                    variants={itemVariants}
                    className={`group relative overflow-hidden rounded-2xl glass-card p-6 lg:p-8 cursor-pointer transition-all duration-300 ${
                      activeCategory === category.title ? 'ring-2 ring-[rgb(var(--primary))] scale-105' : ''
                    }`}
                    onMouseEnter={() => setActiveCategory(category.title)}
                    onMouseLeave={() => setActiveCategory(null)}
                    whileHover={{ y: -5 }}
                  >
                    {/* Category Header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} ${category.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg lg:text-xl font-bold text-[rgb(var(--fg))]">{category.title}</h3>
                        <p className="text-sm text-[rgb(var(--fg))]/60">{category.skills.length} skills</p>
                      </div>
                    </div>

                    {/* Skills with Progress Bars */}
                    <div className="space-y-4">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                          className="group/skill"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-[rgb(var(--fg))]">{skill.name}</span>
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-[rgb(var(--fg))]/70">{skill.level}%</span>
                              {skill.level >= 90 && <Star className="w-3 h-3 text-yellow-500" />}
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div className="relative w-full h-2 bg-[rgb(var(--surface-hover))] rounded-full overflow-hidden">
                            <motion.div
                              className={`absolute top-0 left-0 h-full bg-gradient-to-r ${category.color} rounded-full`}
                              initial={{ width: 0 }}
                              animate={{ width: isInView ? `${skill.level}%` : 0 }}
                              transition={{ duration: 1, delay: categoryIndex * 0.2 + skillIndex * 0.1 }}
                            />
                          </div>

                          {/* Skill Description on Hover */}
                          <motion.div
                            className="mt-2 text-xs text-[rgb(var(--fg))]/50 opacity-0 group-hover/skill:opacity-100 transition-opacity duration-200"
                            initial={false}
                          >
                            {skill.description}
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`} />
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            /* Proficiency Chart View */
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="glass-card p-6 lg:p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[rgb(var(--primary))]" />
                  Skill Proficiency Overview
                </h3>

                <div className="space-y-6">
                  {skillCategories.map((category) =>
                    category.skills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        className="flex items-center gap-4"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <div className="w-32 text-sm font-medium text-[rgb(var(--fg))] truncate">
                          {skill.name}
                        </div>
                        <div className="flex-1 relative h-6 bg-[rgb(var(--surface-hover))] rounded-full overflow-hidden">
                          <motion.div
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--accent))] rounded-full flex items-center justify-end pr-2"
                            initial={{ width: 0 }}
                            animate={{ width: isInView ? `${skill.level}%` : 0 }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                          >
                            <span className="text-xs font-medium text-white">{skill.level}%</span>
                          </motion.div>
                        </div>
                        <div className="flex items-center gap-1">
                          {skill.level >= 90 && <Award className="w-4 h-4 text-yellow-500" />}
                          {skill.level >= 85 && skill.level < 90 && <Target className="w-4 h-4 text-blue-500" />}
                          {skill.level < 85 && <Zap className="w-4 h-4 text-green-500" />}
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Enhanced Skills Highlight */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass-card p-6 lg:p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold">Core Expertise</h3>
              </div>
              <p className="text-[rgb(var(--fg))]/70 leading-relaxed">
                Specialized in building full-stack web applications with <span className="text-[rgb(var(--primary))] font-medium">Laravel</span> and <span className="text-[rgb(var(--primary))] font-medium">Vue.js</span>,
                focusing on clean architecture, performance optimization, and maintainable code.
              </p>
            </div>

            <div className="glass-card p-6 lg:p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold">Always Learning</h3>
              </div>
              <p className="text-[rgb(var(--fg))]/70 leading-relaxed">
                Continuously expanding knowledge in modern web technologies, cloud platforms, and emerging frameworks to deliver cutting-edge solutions.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}