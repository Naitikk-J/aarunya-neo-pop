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
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Global Effects */}
      <CursorFollower />
      <NoiseOverlay />
      <FloatingStickers />
      
      {/* Navigation */}
      <DockNavbar />
      
      {/* Main Content */}
      <main>
        <HeroSection />
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
