import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider, useToastContext } from './context/ToastContext';
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
  ScrollToTop,
  ToastContainer,
} from './components';

function AppContent() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { toasts, removeToast } = useToastContext();

  return (
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
      <ScrollToTop />
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
