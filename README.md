# Wallstreet Forex Academy

A modern, production-grade forex education website with an AI-powered assistant built with React, TypeScript, and Tailwind CSS.

## Features

### 🎨 Design
- **Blue Theme** - Professional blue color scheme
- **Dark/Light Mode** - Toggle between themes with smooth transitions
- **Responsive Design** - Works on all devices
- **Glassmorphism Effects** - Modern UI with blur effects
- **Smooth Animations** - Powered by Framer Motion

### 📄 Sections
- **Hero** - Stunning landing with animated trading chart
- **About** - Company info and leadership team
- **Gallery** - Filterable photo gallery with lightbox
- **Courses** - Three pricing tiers with features
- **Testimonials** - Student success stories
- **Contact** - Form, Google Maps, social links
- **Footer** - Site navigation and info

### 🤖 AI Assistant (WallBot)
- **OpenRouter Integration** - Uses GPT-4o-mini (cheapest model)
- **News API Integration** - Live forex market news
- **Forex-Only Scope** - Redirects non-forex questions
- **Demo Mode** - Works without API keys

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy the example env file and add your API keys:

```bash
cp .env.example .env
```

Edit `.env` and add your keys:
```env
# OpenRouter API Configuration
VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here
VITE_OPENROUTER_MODEL=openai/gpt-4o-mini

# News API Configuration (optional)
VITE_NEWS_API_KEY=your_news_api_key_here
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

## API Keys

### OpenRouter API
1. Go to [openrouter.ai](https://openrouter.ai)
2. Create an account and get your API key
3. Add to `.env` as `VITE_OPENROUTER_API_KEY`

The default model is `openai/gpt-4o-mini` (cheapest GPT model). You can change it in `.env`:
```env
VITE_OPENROUTER_MODEL=openai/gpt-4o-mini
```

### News API (Optional)
1. Go to [newsapi.org](https://newsapi.org)
2. Get a free API key
3. Add to `.env` as `VITE_NEWS_API_KEY`

## Theme Toggle

The website supports both dark and light modes:
- Click the sun/moon icon in the header
- Theme preference is saved to localStorage
- Respects system preference on first visit

## Company Information

- **Company**: Wallstreet Forex Academy
- **CEO**: Chukwuma Cornelius Chibuike
- **Secretary**: Chukwuma Kamsi Cynthia
- **Location**: Enugu, Nigeria

## Tech Stack

- **React 18** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

## Project Structure

```
src/
├── components/       # React components
├── context/          # Theme context
├── data/             # Constants and data
├── services/         # API services
├── types/            # TypeScript types
├── App.tsx           # Main app
├── main.tsx          # Entry point
└── index.css         # Global styles
```

## License

© 2024 Wallstreet Forex Academy. All rights reserved.

---

**Note**: Trading forex involves significant risk. This is an educational platform only.
