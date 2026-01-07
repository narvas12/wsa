import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import {
  Header,
  Hero,
  About,
  Gallery,
  Courses,
  Testimonials,
  Contact,
  Footer,
  ChatAssistant,
  ChatButton,
} from './components';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-adaptive text-adaptive transition-colors duration-300">
        <Header onOpenChat={() => setIsChatOpen(true)} />
        
        <main>
          <Hero />
          <About />
          <Gallery />
          <Courses />
          <Testimonials />
          <Contact />
        </main>
        
        <Footer />

        <ChatButton isOpen={isChatOpen} onClick={() => setIsChatOpen(!isChatOpen)} />
        <ChatAssistant isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </div>
    </ThemeProvider>
  );
}

export default App;
