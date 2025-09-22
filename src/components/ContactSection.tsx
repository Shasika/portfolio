'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, Phone, Linkedin } from 'lucide-react';
import { usePersonal } from '@/hooks/useJsonData';

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { data: personal } = usePersonal();

  const handleEmailClick = () => {
    const subject = encodeURIComponent('Portfolio Contact');
    const body = encodeURIComponent('Hi Shasika,\n\nI would like to get in touch with you.\n\nBest regards,');
    window.open(`mailto:${personal?.email}?subject=${subject}&body=${body}`, '_blank');
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
    <section id="contact" className="section">
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
            <h2 className="section-title">Get In Touch</h2>
            <div className="divider" />
            <p className="section-description">
              Ready to work together? Let&apos;s discuss your next project and bring your ideas to life.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
            {/* Contact Info */}
            <motion.div variants={itemVariants} className="space-y-6 lg:space-y-8">
              <h3 className="text-xl lg:text-2xl font-semibold">Let&apos;s Connect</h3>

              <div className="space-y-4 lg:space-y-6">
                <a
                  href={`mailto:${personal?.email}`}
                  className="card flex items-center space-x-3 lg:space-x-4 group cursor-pointer"
                >
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[rgb(var(--primary))]/10 rounded-lg flex items-center justify-center group-hover:bg-[rgb(var(--primary))]/20 transition-colors duration-200">
                    <Mail className="w-5 h-5 lg:w-6 lg:h-6 text-[rgb(var(--primary))]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm lg:text-base">Email</div>
                    <div className="text-[rgb(var(--fg))]/70 text-sm lg:text-base truncate">{personal?.email}</div>
                  </div>
                </a>

                <a
                  href={`tel:${personal?.phone}`}
                  className="card flex items-center space-x-3 lg:space-x-4 group cursor-pointer"
                >
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[rgb(var(--primary))]/10 rounded-lg flex items-center justify-center group-hover:bg-[rgb(var(--primary))]/20 transition-colors duration-200">
                    <Phone className="w-5 h-5 lg:w-6 lg:h-6 text-[rgb(var(--primary))]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm lg:text-base">Phone</div>
                    <div className="text-[rgb(var(--fg))]/70 text-sm lg:text-base truncate">{personal?.phone}</div>
                  </div>
                </a>

                <a
                  href={personal?.linkedin || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card flex items-center space-x-3 lg:space-x-4 group cursor-pointer"
                >
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[rgb(var(--primary))]/10 rounded-lg flex items-center justify-center group-hover:bg-[rgb(var(--primary))]/20 transition-colors duration-200">
                    <Linkedin className="w-5 h-5 lg:w-6 lg:h-6 text-[rgb(var(--primary))]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm lg:text-base">LinkedIn</div>
                    <div className="text-[rgb(var(--fg))]/70 text-sm lg:text-base">Connect with me</div>
                  </div>
                </a>
              </div>

              <div className="card">
                <h4 className="font-semibold mb-3 lg:mb-4 text-sm lg:text-base">Available for</h4>
                <div className="space-y-2 text-sm lg:text-base text-[rgb(var(--fg))]/80">
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-[rgb(var(--primary))] rounded-full" />
                    <span>Full-time opportunities</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-[rgb(var(--primary))] rounded-full" />
                    <span>Freelance projects</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-[rgb(var(--primary))] rounded-full" />
                    <span>Consulting work</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form with Formspree */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-xl lg:text-2xl font-semibold">Send a Message</h3>

              <form
                action="https://formspree.io/f/xeorjklz"
                method="POST"
                className="card space-y-6"
              >
                <input type="hidden" name="_subject" value="New contact from portfolio" />
                <input type="hidden" name="_next" value={typeof window !== 'undefined' ? window.location.origin + '?success=true' : ''} />
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--surface))] focus:ring-2 focus:ring-[rgb(var(--primary))] focus:border-transparent outline-none transition-all duration-200"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--surface))] focus:ring-2 focus:ring-[rgb(var(--primary))] focus:border-transparent outline-none transition-all duration-200"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--surface))] focus:ring-2 focus:ring-[rgb(var(--primary))] focus:border-transparent outline-none transition-all duration-200 resize-vertical"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full flex items-center justify-center space-x-2"
                >
                  <Mail className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </form>

              {/* Alternative Contact Methods */}
              <div className="text-center space-y-4">
                <p className="text-sm text-[rgb(var(--fg))]/60">Or reach out directly:</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    onClick={handleEmailClick}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-secondary flex items-center justify-center space-x-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </motion.button>

                  <motion.a
                    href={`tel:${personal?.phone}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-secondary flex items-center justify-center space-x-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call</span>
                  </motion.a>

                  <motion.a
                    href={personal?.linkedin || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-secondary flex items-center justify-center space-x-2"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}