"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MapPin, Send, ArrowUpRight, Clock } from 'lucide-react';
import { quoteService } from '@/services/quote.service';

gsap.registerPlugin(ScrollTrigger);

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validateIndianPhone = (phone) => {
  const digitsOnly = phone.replace(/\D/g, '');
  return /^[6-9]\d{9}$/.test(digitsOnly);
};

const formatIndianPhone = (value) => {
  const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
  if (digitsOnly.length === 0) return '';
  if (digitsOnly.length <= 5) return digitsOnly;
  return `${digitsOnly.slice(0, 5)} ${digitsOnly.slice(5)}`;
};

const inputBase =
  'w-full rounded-xl border bg-gray-50 px-4 py-3.5 text-gray-900 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all duration-300';
const inputNormal = `${inputBase} border-gray-200 focus:border-[#E32219] focus:ring-[#E32219]/10`;
const inputError  = `${inputBase} border-red-400 focus:border-red-500 focus:ring-red-100`;

const FieldGroup = ({ label, error, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
      {label}
    </label>
    {children}
    {error && (
      <p className="text-xs font-medium text-red-500 mt-0.5">{error}</p>
    )}
  </div>
);

export default function ContactSection() {
  const containerRef = useRef(null);
  const headerRef    = useRef(null);
  const formRef      = useRef(null);
  const infoRef      = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 90%' } }
      );
      gsap.fromTo(
        '.contact-card',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: infoRef.current, start: 'top 90%' } }
      );
      gsap.fromTo(
        formRef.current,
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2,
          scrollTrigger: { trigger: formRef.current, start: 'top 85%' } }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors,   setErrors]   = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const set = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateForm = () => {
    const e = {};
    if (!formData.name.trim())                         e.name    = 'Name is required';
    if (!formData.email.trim())                        e.email   = 'Email is required';
    else if (!validateEmail(formData.email))           e.email   = 'Please enter a valid email';
    if (!formData.phone.trim())                        e.phone   = 'Phone is required';
    else if (!validateIndianPhone(formData.phone))     e.phone   = 'Enter a valid 10-digit Indian number';
    if (!formData.message.trim())                      e.message = 'Message is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);
    if (!validateForm()) { setSubmitStatus('validation_error'); return; }
    setIsSubmitting(true);
    try {
      await quoteService.submit({
        ...formData,
        phone: formData.phone.replace(/\D/g, ''),
        company: formData.subject,
        source: 'contact'
      });
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setErrors({});
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (err) {
      console.error('Contact submission failed:', err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactDetails = [
    {
      icon: <MapPin className="w-5 h-5" />,
      label: 'Operational HQ',
      value: 'Kottivakkam, Chennai',
      sub: 'Door No: A115 & B115, Nehru Nagar 2nd Main Road, 7th Link St, Nehru Nagar Industrial Area, Kottivakkam, OMR, Chennai – 600041, TN, India',
      href: 'https://www.google.com/maps/place/Trridev+Labelss/@12.974888,80.2475952,17z'
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: 'Call Engineering',
      value: '+91 96000 07995',
      sub: 'Mobile: +91 99406 22559 | Tel: 044-47839627',
      href: 'tel:+919600007995'
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'Technical Inquiries',
      value: 'Kiruba@trridevlabelss.com',
      sub: 'General: info@trridevlabels.com',
      href: 'mailto:Kiruba@trridevlabelss.com'
    }
  ];

  return (
    <section ref={containerRef} className="py-20 md:py-32 bg-white overflow-hidden relative">
      {/* Subtle Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(45deg, #000 1px, transparent 1px),
                            linear-gradient(-45deg, #000 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">

        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-4xl mx-auto mb-20 md:mb-24">
          <div className="flex items-center justify-center mb-6 md:mb-8">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            <div className="mx-4 text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-gray-400">
              Get In Touch
            </div>
            <div className="h-px w-12 bg-gradient-to-l from-transparent via-gray-300 to-transparent" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-light text-gray-900 tracking-tight leading-[1.1] mb-6">
            Let's start a <br />
            <span className="font-medium text-[#E32219] relative inline-block">
              Conversation.
              <span className="absolute bottom-1 left-0 w-full h-px bg-gradient-to-r from-[#E32219]/0 via-[#E32219]/40 to-[#E32219]/0" />
            </span>
          </h2>
          <p className="text-gray-500 font-light text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Whether you have a complex labeling project or just need technical advice, our team is ready to engineer the perfect solution.
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Left: Contact Info Cards */}
          <div ref={infoRef} className="lg:col-span-5 flex flex-col gap-4">
            {contactDetails.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className="contact-card group relative p-6 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-white hover:border-[#E32219]/20 hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-500 overflow-hidden"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 group-hover:text-[#E32219] group-hover:border-[#E32219]/20 transition-all duration-500 shadow-sm shrink-0">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{item.label}</h4>
                      <div className="text-lg md:text-xl font-semibold text-gray-900 leading-tight mb-1 group-hover:text-[#E32219] transition-colors break-all">
                        {item.value}
                      </div>
                      <p className="text-sm text-gray-500 font-light leading-relaxed">{item.sub}</p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-transparent flex items-center justify-center text-gray-300 group-hover:bg-[#E32219] group-hover:text-white transition-all duration-500 transform group-hover:-translate-y-1 group-hover:translate-x-1 shrink-0 mt-1">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </a>
            ))}

            {/* Working Hours Strip */}
            <div className="contact-card rounded-2xl bg-[#0a0a0a] px-6 py-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#E32219] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Working Hours</p>
                  <p className="text-white font-semibold text-base">Mon – Sat &nbsp;·&nbsp; 10:00 – 18:30</p>
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#E32219] bg-[#E32219]/10 px-3 py-1.5 rounded-full whitespace-nowrap">
                Sun Closed
              </span>
            </div>
          </div>

          {/* Right: Form */}
          <div ref={formRef} className="lg:col-span-7">
            <div className="bg-white p-8 md:p-10 lg:p-12 rounded-[32px] border border-gray-100 shadow-2xl shadow-gray-200/40">
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>

                {/* Row 1: Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FieldGroup label="Your Name" error={errors.name}>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={e => set('name', e.target.value)}
                      className={errors.name ? inputError : inputNormal}
                      placeholder="e.g. John Doe"
                    />
                  </FieldGroup>

                  <FieldGroup label="Email Address" error={errors.email}>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={e => set('email', e.target.value)}
                      className={errors.email ? inputError : inputNormal}
                      placeholder="you@example.com"
                    />
                  </FieldGroup>
                </div>

                {/* Row 2: Phone + Subject */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FieldGroup label="Phone Number" error={errors.phone}>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={e => set('phone', formatIndianPhone(e.target.value))}
                      className={errors.phone ? inputError : inputNormal}
                      placeholder="98765 43210"
                    />
                  </FieldGroup>

                  <FieldGroup label="Subject / Company" error={errors.subject}>
                    <input
                      type="text"
                      id="subject"
                      value={formData.subject}
                      onChange={e => set('subject', e.target.value)}
                      className={inputNormal}
                      placeholder="Company or topic"
                    />
                  </FieldGroup>
                </div>

                {/* Message */}
                <FieldGroup label="Project Details" error={errors.message}>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={e => set('message', e.target.value)}
                    className={`resize-none ${errors.message ? inputError : inputNormal}`}
                    placeholder="Describe your labeling requirement in detail..."
                  />
                </FieldGroup>

                {/* Footer */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <div className="text-sm font-medium">
                    {submitStatus === 'success' && (
                      <span className="text-green-600 flex items-center gap-2">✓ Message Sent Successfully!</span>
                    )}
                    {submitStatus === 'error' && (
                      <span className="text-red-600 flex items-center gap-2">✕ Failed to send. Please try again.</span>
                    )}
                    {submitStatus === 'validation_error' && (
                      <span className="text-amber-600 flex items-center gap-2">⚠ Please fix the errors above.</span>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`group relative inline-flex items-center gap-3 px-10 py-4 rounded-xl transition-all duration-500 shadow-xl overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed
                      ${submitStatus === 'success' ? 'bg-green-600' : 'bg-gray-900 hover:bg-[#E32219]'}`}
                  >
                    <span className="relative z-10 text-xs font-bold uppercase text-white tracking-[0.2em]">
                      {isSubmitting ? 'Processing...' : submitStatus === 'success' ? 'Thank You!' : 'Send Message'}
                    </span>
                    <Send
                      className={`w-4 h-4 relative z-10 text-white transition-transform duration-300 ${
                        isSubmitting ? 'animate-pulse' : 'group-hover:translate-x-1 group-hover:-translate-y-1'
                      }`}
                    />
                    <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out" />
                  </button>
                </div>

              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
