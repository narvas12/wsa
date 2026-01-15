import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Instagram, Facebook, Linkedin, Youtube, Loader2 } from 'lucide-react';
import { COMPANY_INFO } from '../data/constants';
import { useToastContext } from '../context/ToastContext';

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { success, error } = useToastContext();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    if (!phone) return true; // Phone is optional
    return /^[\d\s\-\+\(\)]+$/.test(phone);
  };

  const validateField = (name: string, value: string) => {
    const newErrors: FormErrors = { ...errors };

    switch (name) {
      case 'name':
        if (!value.trim()) {
          newErrors.name = 'Name is required';
        } else if (value.trim().length < 2) {
          newErrors.name = 'Name must be at least 2 characters';
        } else {
          delete newErrors.name;
        }
        break;
      case 'email':
        if (!value.trim()) {
          newErrors.email = 'Email is required';
        } else if (!validateEmail(value)) {
          newErrors.email = 'Please enter a valid email address';
        } else {
          delete newErrors.email;
        }
        break;
      case 'phone':
        if (value && !validatePhone(value)) {
          newErrors.phone = 'Please enter a valid phone number';
        } else {
          delete newErrors.phone;
        }
        break;
      case 'message':
        if (!value.trim()) {
          newErrors.message = 'Message is required';
        } else if (value.trim().length < 10) {
          newErrors.message = 'Message must be at least 10 characters';
        } else {
          delete newErrors.message;
        }
        break;
    }

    setErrors(newErrors);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({ name: true, email: true, phone: true, message: true });

    // Validate all fields
    Object.keys(formData).forEach((key) => {
      validateField(key, formData[key as keyof typeof formData]);
    });

    // Check if there are any errors
    const validationErrors: FormErrors = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      validationErrors.name = 'Name is required';
    }
    if (!formData.email.trim() || !validateEmail(formData.email)) {
      validationErrors.email = 'Valid email is required';
    }
    if (formData.phone && !validatePhone(formData.phone)) {
      validationErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      validationErrors.message = 'Message must be at least 10 characters';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      error('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      success('Thank you for your message! We will get back to you soon.', 5000);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setErrors({});
      setTouched({});
    } catch (err) {
      error('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: MapPin, label: 'Address', value: `${COMPANY_INFO.location.address}, ${COMPANY_INFO.location.city}` },
    { icon: Phone, label: 'Phone', value: COMPANY_INFO.contact.phone },
    { icon: Mail, label: 'Email', value: COMPANY_INFO.contact.email },
    { icon: Clock, label: 'Hours', value: 'Mon - Sat: 9AM - 6PM' },
  ];

  const socialLinks = [
    { icon: Instagram, href: COMPANY_INFO.social.instagram },
    { icon: Facebook, href: COMPANY_INFO.social.facebook },
    // { icon: Tiktok, href: COMPANY_INFO.social.tiktok },
    { icon: Linkedin, href: COMPANY_INFO.social.linkedin },
    { icon: Youtube, href: COMPANY_INFO.social.youtube },
  ];

  return (
    <section id="contact" className="relative py-24 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-primary-950/20 to-transparent" />
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-500 text-sm font-medium mb-4">
            <MessageCircle className="w-4 h-4" />
            Get In Touch
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-adaptive mb-6">
            Start Your <span className="gradient-text">Journey Today</span>
          </h2>
          <p className="text-xl text-adaptive-secondary max-w-3xl mx-auto">
            Ready to transform your financial future? Contact us to learn more.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }}>
            <div className="space-y-6 mb-8">
              {contactInfo.map((item, index) => (
                <motion.div key={item.label} initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: index * 0.1 }} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/30 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary-500" />
                  </div>
                  <div>
                    <p className="text-adaptive-muted text-sm">{item.label}</p>
                    <p className="text-adaptive font-medium">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-bold text-adaptive mb-4">Follow Us</h3>
              <div className="flex gap-3">
                {socialLinks.map((social, i) => (
                  <motion.a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-primary-500/10 border border-primary-500/30 flex items-center justify-center text-primary-500 hover:bg-primary-500/20 transition-all" whileHover={{ scale: 1.1 }}>
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-adaptive">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7214445545865!2d7.491478074601133!3d6.429819993561279!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1044a160e7afb3c5%3A0x17cacc7004286e00!2sWALL%20STREET%20FOREX%20ACADEMY%20ENUGU!5e0!3m2!1sen!2sng!4v1767795373261!5m2!1sen!2sng" width="100%" height="250" style={{ border: 0 }} 
              allowFullScreen loading="lazy" className=" opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500" />

              
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-adaptive-card border border-adaptive" noValidate>
              <h3 className="text-2xl font-bold text-adaptive mb-6">Send us a Message</h3>
              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-adaptive-muted text-sm mb-2 font-medium">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 rounded-xl bg-adaptive-secondary border text-adaptive placeholder-adaptive-muted focus:outline-none input-glow transition-all ${
                      errors.name ? 'border-red-500 focus:border-red-500' : 'border-adaptive focus:border-primary-500'
                    }`}
                    placeholder="Enter your full name"
                    aria-invalid={errors.name ? 'true' : 'false'}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && touched.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      id="name-error"
                      className="mt-1 text-sm text-red-500 flex items-center gap-1"
                      role="alert"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block text-adaptive-muted text-sm mb-2 font-medium">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 rounded-xl bg-adaptive-secondary border text-adaptive placeholder-adaptive-muted focus:outline-none input-glow transition-all ${
                      errors.email ? 'border-red-500 focus:border-red-500' : 'border-adaptive focus:border-primary-500'
                    }`}
                    placeholder="Enter your email"
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && touched.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      id="email-error"
                      className="mt-1 text-sm text-red-500 flex items-center gap-1"
                      role="alert"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-adaptive-muted text-sm mb-2 font-medium">
                    Phone Number <span className="text-adaptive-muted text-xs">(Optional)</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 rounded-xl bg-adaptive-secondary border text-adaptive placeholder-adaptive-muted focus:outline-none input-glow transition-all ${
                      errors.phone ? 'border-red-500 focus:border-red-500' : 'border-adaptive focus:border-primary-500'
                    }`}
                    placeholder="Enter your phone number"
                    aria-invalid={errors.phone ? 'true' : 'false'}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                  />
                  {errors.phone && touched.phone && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      id="phone-error"
                      className="mt-1 text-sm text-red-500 flex items-center gap-1"
                      role="alert"
                    >
                      {errors.phone}
                    </motion.p>
                  )}
                </div>
                <div>
                  <label htmlFor="message" className="block text-adaptive-muted text-sm mb-2 font-medium">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={4}
                    className={`w-full px-4 py-3 rounded-xl bg-adaptive-secondary border text-adaptive placeholder-adaptive-muted focus:outline-none input-glow transition-all resize-none ${
                      errors.message ? 'border-red-500 focus:border-red-500' : 'border-adaptive focus:border-primary-500'
                    }`}
                    placeholder="Your message..."
                    aria-invalid={errors.message ? 'true' : 'false'}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  <div className="flex items-center justify-between mt-1">
                    {errors.message && touched.message ? (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        id="message-error"
                        className="text-sm text-red-500 flex items-center gap-1"
                        role="alert"
                      >
                        {errors.message}
                      </motion.p>
                    ) : (
                      <span />
                    )}
                    <span className={`text-xs ${formData.message.length < 10 ? 'text-adaptive-muted' : 'text-green-500'}`}>
                      {formData.message.length}/10 min
                    </span>
                  </div>
                </div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message <Send className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
