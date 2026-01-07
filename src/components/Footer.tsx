import { motion } from 'framer-motion';
import { TrendingUp, Heart, ArrowUp } from 'lucide-react';
import { COMPANY_INFO } from '../data/constants';

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const footerLinks = {
    company: [{ label: 'About Us', href: '#about' }, { label: 'Our Team', href: '#about' }, { label: 'Careers', href: '#' }],
    courses: [{ label: 'Forex Fundamentals', href: '#courses' }, { label: 'Technical Analysis', href: '#courses' }, { label: 'Professional Program', href: '#courses' }],
    resources: [{ label: 'Blog', href: '#' }, { label: 'Market Analysis', href: '#' }, { label: 'FAQ', href: '#' }],
    legal: [{ label: 'Privacy Policy', href: '#' }, { label: 'Terms of Service', href: '#' }, { label: 'Disclaimer', href: '#' }],
  };

  return (
    <footer className="relative bg-primary-950/50 dark:bg-primary-950/50 light:bg-gray-50 border-t border-adaptive">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          <div className="lg:col-span-2">
            <motion.a href="#home" className="flex items-center gap-3 mb-6" whileHover={{ scale: 1.02 }}>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-adaptive">{COMPANY_INFO.name.split(' ')[0]}</h3>
                <p className="text-xs text-primary-500 tracking-wider uppercase">Forex Academy</p>
              </div>
            </motion.a>
            <p className="text-adaptive-secondary mb-6 max-w-sm">
              Nigeria's premier forex education institution. Transforming beginners into confident, profitable traders since 2022.
            </p>
            <div className="flex items-center gap-2 text-sm text-adaptive-muted">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span>in Enugu, Nigeria</span>
            </div>
          </div>

          <div>
            <h4 className="text-adaptive font-bold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}><a href={link.href} className="text-adaptive-secondary hover:text-primary-500 transition-colors">{link.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-adaptive font-bold mb-4">Courses</h4>
            <ul className="space-y-3">
              {footerLinks.courses.map((link) => (
                <li key={link.label}><a href={link.href} className="text-adaptive-secondary hover:text-primary-500 transition-colors">{link.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-adaptive font-bold mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}><a href={link.href} className="text-adaptive-secondary hover:text-primary-500 transition-colors">{link.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-adaptive font-bold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}><a href={link.href} className="text-adaptive-secondary hover:text-primary-500 transition-colors">{link.label}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="section-divider mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-adaptive-muted text-sm text-center md:text-left">
            © {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.
          </p>
          <motion.button onClick={scrollToTop} className="p-3 rounded-xl bg-primary-500/10 border border-primary-500/30 text-primary-500 hover:bg-primary-500/20 transition-all" whileHover={{ scale: 1.1, y: -2 }}>
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
