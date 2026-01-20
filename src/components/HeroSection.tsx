import RetroTV from './RetroTV';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  onZoomComplete?: () => void;
}

const HeroSection = ({ onZoomComplete }: HeroSectionProps) => {
  return (
    <section id="home" className="relative min-h-[200vh]">
      {/* Background Gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-background via-background to-card -z-10" />

      {/* Animated Background Circles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-5">
        <motion.div
          className="absolute w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, hsl(25 100% 50%) 0%, transparent 70%)',
            top: '10%',
            left: '10%',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-80 h-80 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, hsl(210 100% 50%) 0%, transparent 70%)',
            top: '40%',
            right: '15%',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.25, 0.2],
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute w-72 h-72 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, hsl(25 100% 50%) 0%, transparent 70%)',
            bottom: '20%',
            left: '20%',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 7, repeat: Infinity, delay: 2 }}
        />
      </div>

      {/* TV Section */}
      <RetroTV onZoomComplete={onZoomComplete} />
      
      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-32 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span className="font-display text-[10px] text-muted-foreground">SCROLL</span>
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-1.5 bg-primary rounded-full"
              animate={{ y: [0, 16, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
