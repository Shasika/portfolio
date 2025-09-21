'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Phone, Linkedin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { usePersonal } from '@/hooks/useJsonData';

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const { data: personal } = usePersonal();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        const errorData = await response.json();
        setStatus('error');
        setErrorMessage(errorData.message || 'Failed to send message');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
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
    <section id="contact" className="py-20 px-6">
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
            <h2 className="text-4xl md:text-5xl font-bold">Get In Touch</h2>
            <div className="w-24 h-1 bg-[rgb(var(--primary))] mx-auto rounded-full" />
            <p className="text-lg text-[rgb(var(--fg))]/70 max-w-2xl mx-auto">
              Ready to work together? Let&apos;s discuss your next project and bring your ideas to life.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div variants={itemVariants} className="space-y-8">
              <h3 className="text-2xl font-semibold">Let&apos;s Connect</h3>

              <div className="space-y-6">
                <a
                  href={`mailto:${personal?.email}`}
                  className="card flex items-center space-x-4 group cursor-pointer"
                >
                  <div className="w-12 h-12 bg-[rgb(var(--primary))]/10 rounded-lg flex items-center justify-center group-hover:bg-[rgb(var(--primary))]/20 transition-colors duration-200">
                    <Mail className="w-6 h-6 text-[rgb(var(--primary))]" />
                  </div>
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-[rgb(var(--fg))]/70">{personal?.email}</div>
                  </div>
                </a>

                <a
                  href={`tel:${personal?.phone}`}
                  className="card flex items-center space-x-4 group cursor-pointer"
                >
                  <div className="w-12 h-12 bg-[rgb(var(--primary))]/10 rounded-lg flex items-center justify-center group-hover:bg-[rgb(var(--primary))]/20 transition-colors duration-200">
                    <Phone className="w-6 h-6 text-[rgb(var(--primary))]" />
                  </div>
                  <div>
                    <div className="font-medium">Phone</div>
                    <div className="text-[rgb(var(--fg))]/70">{personal?.phone}</div>
                  </div>
                </a>

                <a
                  href={personal?.linkedin || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card flex items-center space-x-4 group cursor-pointer"
                >
                  <div className="w-12 h-12 bg-[rgb(var(--primary))]/10 rounded-lg flex items-center justify-center group-hover:bg-[rgb(var(--primary))]/20 transition-colors duration-200">
                    <Linkedin className="w-6 h-6 text-[rgb(var(--primary))]" />
                  </div>
                  <div>
                    <div className="font-medium">LinkedIn</div>
                    <div className="text-[rgb(var(--fg))]/70">Connect with me</div>
                  </div>
                </a>
              </div>

              <div className="card">
                <h4 className="font-semibold mb-4">Available for</h4>
                <div className="space-y-2 text-[rgb(var(--fg))]/80">
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

            {/* Contact Form */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl font-semibold">Send a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
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
                      value={formData.email}
                      onChange={handleInputChange}
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
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--surface))] focus:ring-2 focus:ring-[rgb(var(--primary))] focus:border-transparent outline-none transition-all duration-200 resize-vertical"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                </div>

                {/* Status Messages */}
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-2 text-green-600 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>Message sent successfully! I&apos;ll get back to you soon.</span>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-2 text-red-600 bg-red-50 dark:bg-red-900/20 p-4 rounded-lg"
                  >
                    <AlertCircle className="w-5 h-5" />
                    <span>{errorMessage}</span>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}