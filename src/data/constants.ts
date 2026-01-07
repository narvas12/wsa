import type { GalleryImage, TeamMember, Course, Testimonial, CurrencyPair } from '../types';

export const COMPANY_INFO = {
  name: 'Wallstreet Forex Academy',
  tagline: 'Master the Art of Forex Trading',
  ceo: 'Chukwuma Cornelius Chibuike',
  secretary: 'Chukwuma Kamsi Cynthia',
  location: {
    city: 'Enugu',
    state: 'Enugu State',
    country: 'Nigeria',
    address: 'Opposite Uwani Police Station, 50 Zik Ave, Uwani, Enugu 400242, Enugu State, Nigeria',
    googleMapsUrl: 'https://maps.app.goo.gl/GHPvWzUdAznhGMnC6',
  },
  contact: {
    email: 'info@wallstreetforexacademy.com',
    phone: '+234 814 083 3872',
    whatsapp: '+234 814 083 3872',
  },
  social: {
    instagram: 'https://www.instagram.com/wallstreetforex_academy_enugu/',
    tiktok: 'https://www.tiktok.com/@wallstreet_forex_enugu',
    linkedin: 'https://linkedin.com/company/wallstreet-forex-academy',
    youtube: 'https://www.youtube.com/@wallstreetforexacademy',
    facebook: 'https://www.facebook.com/people/Wallstreet-Forex-Academy-Enugu',
  },
};

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop',
    caption: 'Live Trading Session - Students analyzing EUR/USD',
    category: 'classroom',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop',
    caption: 'Graduation Ceremony 2024 - Class of Excellence',
    category: 'graduation',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop',
    caption: 'Advanced Technical Analysis Workshop',
    category: 'workshop',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
    caption: 'Team Building & Strategy Session',
    category: 'events',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop',
    caption: 'One-on-One Mentorship Program',
    category: 'classroom',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
    caption: 'Annual Forex Trading Competition',
    category: 'events',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&h=400&fit=crop',
    caption: 'Risk Management Masterclass',
    category: 'workshop',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop',
    caption: 'Student Success Celebration',
    category: 'graduation',
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop',
    caption: 'Fundamental Analysis Deep Dive',
    category: 'classroom',
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&h=400&fit=crop',
    caption: 'Networking Event with Industry Experts',
    category: 'events',
  },
  {
    id: 11,
    src: 'https://images.unsplash.com/photo-1558008258-3256797b43f3?w=600&h=400&fit=crop',
    caption: 'Chart Pattern Recognition Workshop',
    category: 'workshop',
  },
  {
    id: 12,
    src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop',
    caption: 'End of Year Gala Dinner',
    category: 'events',
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Chukwuma Cornelius Chibuike',
    role: 'Chief Executive Officer & Lead Instructor',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
    description: 'With over 15 years of forex trading experience and millions in profitable trades, Cornelius founded Wallstreet Forex Academy to share his expertise with aspiring traders across Nigeria.',
  },
  {
    name: 'Chukwuma Kamsi Cynthia',
    role: 'Secretary & Operations Director',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop',
    description: 'Cynthia ensures smooth operations and exceptional student experiences at the academy. Her organizational skills and dedication keep the institution running at peak efficiency.',
  },
];

export const COURSES: Course[] = [
  {
    id: 1,
    title: 'Forex Fundamentals',
    description: 'Master the basics of forex trading, currency pairs, and market mechanics.',
    duration: '8 Weeks',
    level: 'Beginner',
    price: '₦150,000',
    features: [
      'Understanding currency pairs',
      'Market hours & sessions',
      'Basic technical analysis',
      'Demo trading practice',
      'Certificate upon completion',
    ],
  },
  {
    id: 2,
    title: 'Technical Analysis Mastery',
    description: 'Deep dive into chart patterns, indicators, and price action strategies.',
    duration: '8 Weeks',
    level: 'Intermediate',
    price: '₦300,000',
    features: [
      'Advanced chart patterns',
      'Multiple indicator strategies',
      'Price action trading',
      'Fibonacci & Elliott Wave',
      'Live trading sessions',
    ],
  },
  {
    id: 3,
    title: 'Professional Trading Program',
    description: 'Comprehensive program for serious traders aiming for consistency.',
    duration: '8 Weeks',
    level: 'Advanced',
    price: '₦500,000',
    features: [
      'Complete trading system',
      'Risk management mastery',
      'Trading psychology',
      'Portfolio management',
      '1-on-1 mentorship',
      'Funded account opportunity',
      'Access to exclusive webinars',
      'Access to private trading community',
    ],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Adaobi Eze',
    role: 'Full-time Trader',
    content: 'Wallstreet Forex Academy transformed my understanding of the markets. I went from losing consistently to making profitable trades within 3 months of completing the program.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    rating: 5,
  },
  {
    id: 2,
    name: 'Emeka Okonkwo',
    role: 'Part-time Trader & Engineer',
    content: 'The structured curriculum and hands-on approach made learning forex trading accessible even with my busy schedule. Highly recommend!',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    rating: 5,
  },
  {
    id: 3,
    name: 'Chidinma Nwosu',
    role: 'Business Owner & Trader',
    content: 'The mentorship I received was invaluable. The instructors genuinely care about your success and are always available to answer questions.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
    rating: 5,
  },
];

export const CURRENCY_PAIRS: CurrencyPair[] = [
  { symbol: 'EUR/USD', name: 'Euro/US Dollar', price: '1.0842', change: '+0.0023', changePercent: '+0.21%', isPositive: true },
  { symbol: 'GBP/USD', name: 'British Pound/US Dollar', price: '1.2654', change: '+0.0045', changePercent: '+0.36%', isPositive: true },
  { symbol: 'USD/JPY', name: 'US Dollar/Japanese Yen', price: '149.82', change: '-0.34', changePercent: '-0.23%', isPositive: false },
  { symbol: 'USD/NGN', name: 'US Dollar/Nigerian Naira', price: '1520.00', change: '+5.00', changePercent: '+0.33%', isPositive: true },
  { symbol: 'AUD/USD', name: 'Australian Dollar/US Dollar', price: '0.6521', change: '-0.0012', changePercent: '-0.18%', isPositive: false },
  { symbol: 'USD/CAD', name: 'US Dollar/Canadian Dollar', price: '1.3542', change: '+0.0018', changePercent: '+0.13%', isPositive: true },
  { symbol: 'EUR/GBP', name: 'Euro/British Pound', price: '0.8568', change: '-0.0008', changePercent: '-0.09%', isPositive: false },
  { symbol: 'XAU/USD', name: 'Gold/US Dollar', price: '2045.30', change: '+12.50', changePercent: '+0.61%', isPositive: true },
];

export const STATS = [
  { value: '5,000+', label: 'Students Trained' },
  { value: '15+', label: 'Years Experience' },
  { value: '₦2B+', label: 'Student Profits' },
  { value: '95%', label: 'Success Rate' },
];

export const FOREX_TOPICS = [
  'Currency pairs and how they work',
  'Technical analysis and chart patterns',
  'Fundamental analysis and economic indicators',
  'Risk management strategies',
  'Trading psychology',
  'Market sessions and trading hours',
  'Leverage and margin',
  'Order types (market, limit, stop)',
  'Candlestick patterns',
  'Support and resistance levels',
  'Trend analysis',
  'Economic calendar events',
  'Central bank policies',
  'Trading strategies',
  'Position sizing',
];
