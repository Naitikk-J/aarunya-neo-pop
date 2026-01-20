import { useState, useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import CursorFollower from '@/components/CursorFollower';
import NoiseOverlay from '@/components/NoiseOverlay';
import FloatingStickers from '@/components/FloatingStickers';
import DockNavbar from '@/components/DockNavbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import EventsSection from '@/components/EventsSection';
import SponsorsSection from '@/components/SponsorsSection';
import Footer from '@/components/Footer';

const Index = () => {
  const [showDock, setShowDock] = useState(false);
  const [dockEnabled, setDockEnabled] = useState(false);
  const autoHideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isScrollingRef = useRef(false);
  const isDockHoveredRef = useRef(false);

  const handleTVZoomComplete = useCallback(() => {
    setDockEnabled(true);
  }, []);

  const startAutoHideTimer = useCallback(() => {
    // Clear existing timer
    if (autoHideTimeoutRef.current) {
      clearTimeout(autoHideTimeoutRef.current);
    }
    // Set new timer to hide after 3 seconds (only if not hovering)
    autoHideTimeoutRef.current = setTimeout(() => {
      if (!isDockHoveredRef.current) {
        setShowDock(false);
      }
    }, 3000);
  }, []);

  const toggleDock = useCallback(() => {
    setShowDock(prev => !prev);
    if (!showDock) {
      startAutoHideTimer();
    }
  }, [showDock, startAutoHideTimer]);

  const handleDockHoverStart = useCallback(() => {
    isDockHoveredRef.current = true;
    // Clear auto-hide timer when hovering
    if (autoHideTimeoutRef.current) {
      clearTimeout(autoHideTimeoutRef.current);
    }
  }, []);

  const handleDockHoverEnd = useCallback(() => {
    isDockHoveredRef.current = false;
    // Restart timer when hover ends
    if (showDock) {
      startAutoHideTimer();
    }
  }, [showDock, startAutoHideTimer]);

  // Handle scroll to auto-hide dock
  useEffect(() => {
    const handleScroll = () => {
      if (showDock && !isScrollingRef.current && !isDockHoveredRef.current) {
        setShowDock(false);
      }
      isScrollingRef.current = true;

      // Reset scrolling flag after scroll ends
      const timeoutId = setTimeout(() => {
        isScrollingRef.current = false;
      }, 100);

      return () => clearTimeout(timeoutId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showDock]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (autoHideTimeoutRef.current) {
        clearTimeout(autoHideTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Global Effects */}
      <CursorFollower />
      <NoiseOverlay />
      <FloatingStickers />

      {/* Navigation */}
      <DockNavbar
        isVisible={showDock && dockEnabled}
        onHoverStart={handleDockHoverStart}
        onHoverEnd={handleDockHoverEnd}
      />

      {/* Toggle Button */}
      {dockEnabled && (
        <motion.button
          onClick={toggleDock}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center cursor-pointer"
          style={{
            background: showDock
              ? 'radial-gradient(circle at 30% 30%, hsl(0 100% 60%), hsl(0 100% 40%))'
              : 'radial-gradient(circle at 30% 30%, hsl(300 100% 60%), hsl(300 100% 40%))',
            boxShadow: showDock
              ? '0 0 20px hsl(0 100% 50%), inset -2px -2px 5px rgba(0,0,0,0.5), inset 2px 2px 5px rgba(255,255,255,0.2)'
              : '0 0 20px hsl(300 100% 50%), inset -2px -2px 5px rgba(0,0,0,0.5), inset 2px 2px 5px rgba(255,255,255,0.2)',
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, type: 'spring' }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title={showDock ? 'Hide Navigation' : 'Show Navigation'}
        >
          {showDock ? (
            <X className="w-7 h-7 text-white" />
          ) : (
            <Menu className="w-7 h-7 text-white" />
          )}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
        </motion.button>
      )}

      {/* Main Content */}
      <main>
        <HeroSection onZoomComplete={handleTVZoomComplete} />
        <AboutSection />
        <EventsSection />
        <SponsorsSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
