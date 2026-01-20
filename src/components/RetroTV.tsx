import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RetroTVProps {
  onZoomComplete?: () => void;
}

const RetroTV = ({ onZoomComplete }: RetroTVProps) => {
  const tvRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOn, setIsOn] = useState(false);
  const hasTriggeredCallback = useRef(false);

  useEffect(() => {
    // Turn on animation after mount
    const timer = setTimeout(() => setIsOn(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !tvRef.current) return;

    const handleZoomComplete = () => {
      onZoomComplete?.();
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=100%',
        scrub: 1,
        pin: true,
        onUpdate: (self) => {
          // Trigger callback when scroll progress reaches near end of zoom animation
          if (self.progress >= 0.95 && !hasTriggeredCallback.current) {
            hasTriggeredCallback.current = true;
            handleZoomComplete();
          }
        },
      },
    });

    tl.to(tvRef.current, {
      scale: 20,
      duration: 1,
      ease: 'power2.inOut',
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [onZoomComplete]);

  return (
    <div ref={containerRef} className="h-screen w-full flex items-center justify-center overflow-hidden">
      <motion.div
        ref={tvRef}
        className="relative"
        initial={{ opacity: 0, scale: 1, rotateY: 0 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* TV Body */}
        <div className="relative w-[1700px] md:w-[1500px] aspect-[16/9]">
          {/* TV Frame - Outer */}
          <div 
            className="absolute inset-0 rounded-3xl bg-gradient-to-b from-gray-600 via-gray-700 to-gray-800"
            style={{
              boxShadow: '8px 8px 0px rgba(0,0,0,0.5), inset 0 2px 10px rgba(255,255,255,0.1)',
            }}
          />
          
          {/* TV Frame - Inner Bezel */}
          <div className="absolute inset-4 md:inset-6 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900" />
          
          {/* Screen Container */}
          <div 
            ref={screenRef}
            className="absolute inset-8 md:inset-10 rounded-xl overflow-hidden h-[765px] w-[1420px] crt-screen"
            style={{
              background: isOn 
                ? 'radial-gradient(ellipse at center, #1a0a2e 0%, #0a0015 100%)'
                : '#000',
            }}
          >
            {/* Screen Content */}
            <motion.div
              className="w-full h-full flex flex-col items-center justify-center p-2 md:p-4 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: isOn ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {/* Static/Turn On Effect */}
              {!isOn && (
                <div className="absolute inset-0 bg-white animate-pulse" />
              )}

              {/* Main Content */}
              <motion.div
                className="text-center space-y-2 md:space-y-4 w-full max-w-full overflow-hidden"
                animate={isOn ? { y: [0, -5, 0] } : {}}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <motion.h1
                  className="font-display text-lg md:text-8xl text-primary glitch neon-pink leading-none"
                  data-text="AARUNYA 2.0"
                  animate={{
                    textShadow: [
                      '0 0 20px hsl(300 100% 50%), 0 0 40px hsl(300 100% 50%)',
                      '0 0 40px hsl(300 100% 50%), 0 0 80px hsl(300 100% 50%)',
                      '0 0 20px hsl(300 100% 50%), 0 0 40px hsl(300 100% 50%)',
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                    <br />
                    <br />
                    
                  AARUNYA 2.0
                </motion.h1>

                <motion.p
                  className="font-display text-[8px] md:text-3xl text-secondary neon-green leading-tight"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                    21-23  FEBRUARY  2026 <br />
                    <br />
                  MITS GWALIOR
                  <br />
                </motion.p>

                <motion.div
                  className="flex items-center justify-center gap-1 md:gap-2 mt-2 md:mt-4 flex-wrap"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                    <br />
                    <br />
                    <div>
                  <span className="text-lg md:text-2xl">🎮</span>
                  <span className="font-display text-[7px] md:text-xl text-accent neon-cyan">
                    
                    SCROLL TO ENTER
                  </span>
                  <span className="text-lg md:text-2xl">🎮</span>
                </div>
                </motion.div>

                {/* Animated Arrows */}
                <motion.div
                  className="mt-2 md:mt-4 text-neon-yellow"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <span className="text-xl md:text-3xl">↓</span>
                </motion.div>
              </motion.div>
            </motion.div>
            
            {/* CRT Flicker Effect */}
            <motion.div
              className="absolute inset-0 bg-white pointer-events-none"
              animate={{ opacity: [0, 0.02, 0, 0.01, 0] }}
              transition={{ duration: 0.15, repeat: Infinity, repeatDelay: 3 }}
            />
          </div>
          
          {/* TV Controls Panel */}
          <div className="absolute bottom-4 right-4 md:right-6 flex flex-col gap-2">
            {/* Power Button */}
            <motion.button
              className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-b from-gray-600 to-gray-800 border-2 border-gray-500 interactive"
              style={{ boxShadow: '2px 2px 0px rgba(0,0,0,0.5)' }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOn(!isOn)}
            >
              <div className={`w-2 h-2 mx-auto rounded-full ${isOn ? 'bg-green-400 shadow-neon-green' : 'bg-red-900'}`} />
            </motion.button>
            
            {/* Volume Knob */}
            <motion.div
              className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-b from-gray-500 to-gray-700 border-2 border-gray-600"
              style={{ boxShadow: '2px 2px 0px rgba(0,0,0,0.5)' }}
              whileHover={{ rotate: 45 }}
            >
              <div className="w-0.5 h-3 bg-gray-400 mx-auto mt-0.5" />
            </motion.div>
          </div>
          
          {/* TV Brand Badge */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
            <span className="font-display text-[8px] md:text-xs text-gray-400 tracking-widest">
                MITS PRESENTS
            </span>
          </div>
          
          {/* Antenna */}
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex gap-8">
            <motion.div 
              className="w-2 h-20 bg-gradient-to-t from-gray-600 to-gray-400 rounded-full origin-bottom"
              style={{ transform: 'rotate(-15deg)' }}
              animate={{ rotate: [-15, -20, -15] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-4 h-4 bg-primary rounded-full -mt-2 -ml-1 shadow-neon-pink" />
            </motion.div>
            <motion.div 
              className="w-2 h-20 bg-gradient-to-t from-gray-600 to-gray-400 rounded-full origin-bottom"
              style={{ transform: 'rotate(15deg)' }}
              animate={{ rotate: [15, 20, 15] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <div className="w-4 h-4 bg-secondary rounded-full -mt-2 -ml-1 shadow-neon-green" />
            </motion.div>
          </div>
          
          {/* TV Legs */}
          <div className="absolute -bottom-8 left-1/4 w-4 h-8 bg-gradient-to-b from-gray-700 to-gray-800 rounded-b-lg" />
          <div className="absolute -bottom-8 right-1/4 w-4 h-8 bg-gradient-to-b from-gray-700 to-gray-800 rounded-b-lg" />
        </div>
      </motion.div>
    </div>
  );
};

export default RetroTV;
