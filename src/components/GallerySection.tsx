import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface MediaParticle {
  id: number;
  x: number;
  y: number;
  type: 'image' | 'video';
  icon: string;
  color: string;
}

const GallerySection = () => {
  const [particles, setParticles] = useState<MediaParticle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const particleCountRef = useRef(0);

  const mediaIcons = ['🎬', '🎥', '📹', '📸', '🖼️', '🎨', '🎭', '📷'];
  const colors = [
    'hsl(300 100% 50%)',   // pink
    'hsl(180 100% 50%)',   // cyan
    'hsl(120 100% 50%)',   // green
    'hsl(60 100% 50%)',    // yellow
    'hsl(0 100% 50%)',     // red
    'hsl(240 100% 50%)',   // blue
  ];

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Create 5-8 particles on each tap
    const particleCount = Math.floor(Math.random() * 4) + 5;
    const newParticles: MediaParticle[] = [];

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: particleCountRef.current++,
        x,
        y,
        type: Math.random() > 0.5 ? 'video' : 'image',
        icon: mediaIcons[Math.floor(Math.random() * mediaIcons.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    setParticles(prev => [...prev, ...newParticles]);

    // Remove particles after animation completes (4 seconds)
    setTimeout(() => {
      setParticles(prev =>
        prev.filter(p => !newParticles.some(np => np.id === p.id))
      );
    }, 4000);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      id="gallery"
      className="relative min-h-screen w-full bg-gradient-to-b from-background via-background to-card flex items-center justify-center overflow-hidden"
      ref={containerRef}
      onClick={handleContainerClick}
      onMouseMove={handleMouseMove}
    >
      {/* Background Gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-background via-background to-card -z-10" />

      {/* Animated Background Circles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-5">
        <motion.div
          className="absolute w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, hsl(180 100% 50%) 0%, transparent 70%)',
            bottom: '20%',
            right: '10%',
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
            background: 'radial-gradient(circle, hsl(120 100% 50%) 0%, transparent 70%)',
            top: '30%',
            left: '15%',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.25, 0.2],
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 1 }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center space-y-6 pointer-events-none">
        <motion.h2
          className="font-display text-6xl md:text-7xl text-primary glitch neon-pink"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          GALLERY
        </motion.h2>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="font-display text-2xl md:text-3xl text-secondary neon-cyan">
            TAP ANYWHERE
          </p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-4xl">✨</span>
            <p className="font-display text-sm md:text-base text-accent neon-green">
              Let the media flow from your cursor
            </p>
            <span className="text-4xl">✨</span>
          </div>
        </motion.div>

        {/* Animated Cue */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-5xl"
        >
          👆
        </motion.div>
      </div>

      {/* Falling Media Particles */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="fixed w-16 h-16 md:w-20 md:h-20 rounded-lg flex items-center justify-center text-4xl md:text-5xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${particle.color}, ${particle.color}dd)`,
            boxShadow: `0 0 20px ${particle.color}`,
            left: particle.x,
            top: particle.y,
          }}
          initial={{
            opacity: 1,
            scale: 0.5,
            x: 0,
            y: 0,
          }}
          animate={{
            opacity: [1, 1, 0],
            y: [0, 400, window.innerHeight],
            x: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 150],
            scale: [0.5, 1, 0.8],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 4,
            ease: 'easeIn',
            delay: 0,
          }}
        >
          {particle.icon}
          
          {/* Gloss Effect */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/30 to-transparent pointer-events-none" />
        </motion.div>
      ))}

      {/* Cursor Indicator */}
      <motion.div
        className="fixed w-8 h-8 rounded-full border-2 pointer-events-none z-20"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          borderColor: 'hsl(300 100% 50%)',
          boxShadow: '0 0 10px hsl(300 100% 50%)',
        }}
        animate={{
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        <div className="absolute inset-1 rounded-full border border-cyan-400" />
      </motion.div>
    </section>
  );
};

export default GallerySection;
