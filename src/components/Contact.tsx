import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Instagram, Facebook, Linkedin, Youtube } from 'lucide-react';
import { COMPANY_INFO } from '../data/constants';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
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
            <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-adaptive-card border border-adaptive">
              <h3 className="text-2xl font-bold text-adaptive mb-6">Send us a Message</h3>
              <div className="space-y-5">
                <div>
                  <label className="block text-adaptive-muted text-sm mb-2">Full Name</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-adaptive-secondary border border-adaptive text-adaptive placeholder-dark-400 focus:border-primary-500 focus:outline-none input-glow transition-all" placeholder="Enter your name" required />
                </div>
                <div>
                  <label className="block text-adaptive-muted text-sm mb-2">Email Address</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-adaptive-secondary border border-adaptive text-adaptive placeholder-dark-400 focus:border-primary-500 focus:outline-none input-glow transition-all" placeholder="Enter your email" required />
                </div>
                <div>
                  <label className="block text-adaptive-muted text-sm mb-2">Phone Number</label>
                  <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-adaptive-secondary border border-adaptive text-adaptive placeholder-dark-400 focus:border-primary-500 focus:outline-none input-glow transition-all" placeholder="Enter your phone" />
                </div>
                <div>
                  <label className="block text-adaptive-muted text-sm mb-2">Message</label>
                  <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={4} className="w-full px-4 py-3 rounded-xl bg-adaptive-secondary border border-adaptive text-adaptive placeholder-dark-400 focus:border-primary-500 focus:outline-none input-glow transition-all resize-none" placeholder="Your message..." required />
                </div>
                <motion.button type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold flex items-center justify-center gap-2" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  Send Message <Send className="w-4 h-4" />
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
