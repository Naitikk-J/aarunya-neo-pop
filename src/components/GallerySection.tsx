import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FloatingItem {
  id: string;
  x: number;
  y: number;
  type: 'image' | 'video';
  icon: string;
  color: string;
  duration: number;
  delay: number;
}

const galleryItems = [
  { icon: '📸', color: 'hsl(25 100% 50%)', label: 'Photo' },
  { icon: '🎥', color: 'hsl(210 100% 50%)', label: 'Video' },
  { icon: '🖼️', color: 'hsl(60 100% 50%)', label: 'Gallery' },
  { icon: '🎬', color: 'hsl(30 100% 50%)', label: 'Film' },
  { icon: '✨', color: 'hsl(270 100% 50%)', label: 'Moment' },
];

const GallerySection = () => {
  const [floatingItems, setFloatingItems] = useState<FloatingItem[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemIdRef = useRef(0);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Create 3-5 floating items at the click position
    const itemCount = Math.floor(Math.random() * 3) + 3;
    const newItems: FloatingItem[] = [];

    for (let i = 0; i < itemCount; i++) {
      const galleryItem = galleryItems[Math.floor(Math.random() * galleryItems.length)];
      const newItem: FloatingItem = {
        id: `${itemIdRef.current++}`,
        x,
        y,
        type: Math.random() > 0.5 ? 'image' : 'video',
        icon: galleryItem.icon,
        color: galleryItem.color,
        duration: Math.random() * 2 + 3,
        delay: i * 0.1,
      };
      newItems.push(newItem);
    }

    setFloatingItems(prev => [...prev, ...newItems]);

    // Remove items after animation completes
    setTimeout(() => {
      setFloatingItems(prev => 
        prev.filter(item => !newItems.find(newItem => newItem.id === item.id))
      );
    }, (Math.max(...newItems.map(item => item.duration + item.delay)) + 1) * 1000);
  };

  return (
    <section
      id="gallery"
      ref={containerRef}
      onClick={handleContainerClick}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden cursor-crosshair"
      style={{
        background: 'radial-gradient(ellipse at center, #1a0a2e 0%, #0a0015 100%)',
      }}
    >
      {/* Background Grid Effect */}
      <div className="absolute inset-0">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(0deg, transparent 24%, rgba(300, 100, 50%, 0.05) 25%, rgba(300, 100, 50%, 0.05) 26%, transparent 27%, transparent 74%, rgba(300, 100, 50%, 0.05) 75%, rgba(300, 100, 50%, 0.05) 76%, transparent 77%, transparent),
              linear-gradient(90deg, transparent 24%, rgba(300, 100, 50%, 0.05) 25%, rgba(300, 100, 50%, 0.05) 26%, transparent 27%, transparent 74%, rgba(300, 100, 50%, 0.05) 75%, rgba(300, 100, 50%, 0.05) 76%, transparent 77%, transparent)
            `,
            backgroundSize: '50px 50px',
            backgroundPosition: '0 0',
          }}
        />
      </div>

      {/* Animated Border Effect */}
      <div className="absolute inset-0 border-2 border-primary/20 pointer-events-none" />

      {/* Central Text */}
      <motion.div
        className="relative z-10 text-center space-y-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h2
          className="font-display text-5xl md:text-7xl text-primary"
          style={{
            textShadow: '0 0 20px hsl(25 100% 50%), 0 0 40px hsl(25 100% 50%)',
          }}
          animate={{
            textShadow: [
              '0 0 20px hsl(25 100% 50%), 0 0 40px hsl(25 100% 50%)',
              '0 0 40px hsl(25 100% 50%), 0 0 80px hsl(25 100% 50%)',
              '0 0 20px hsl(25 100% 50%), 0 0 40px hsl(25 100% 50%)',
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          GALLERY
        </motion.h2>

        <motion.p
          className="font-display text-xl md:text-3xl text-secondary"
          animate={{ opacity: [1, 0.6, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ✨ TAP ANYWHERE ✨
        </motion.p>

        <motion.div
          className="text-5xl md:text-7xl"
          animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          👆
        </motion.div>

        <motion.p
          className="font-body text-sm md:text-lg text-muted-foreground pt-4"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Click to reveal memories
        </motion.p>
      </motion.div>

      {/* Floating Items */}
      <AnimatePresence>
        {floatingItems.map((item) => (
          <motion.div
            key={item.id}
            className="fixed pointer-events-none"
            style={{
              left: item.x,
              top: item.y,
            }}
            initial={{
              opacity: 1,
              scale: 0,
              x: 0,
              y: 0,
            }}
            animate={{
              opacity: [1, 1, 0],
              scale: [0, 1, 0.5],
              x: (Math.random() - 0.5) * 400,
              y: (Math.random() - 0.5) * 400 - 100,
            }}
            transition={{
              duration: item.duration,
              delay: item.delay,
              ease: "easeOut",
              opacity: { duration: item.duration, times: [0, 0.7, 1] },
            }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <motion.div
              className="relative"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: item.duration * 0.8, repeat: Infinity, ease: "linear" }}
            >
              <div
                className="w-16 h-16 md:w-20 md:h-20 rounded-lg flex items-center justify-center text-4xl md:text-5xl backdrop-blur-md border-2"
                style={{
                  background: `linear-gradient(135deg, ${item.color}20, ${item.color}40)`,
                  borderColor: item.color,
                  boxShadow: `0 0 20px ${item.color}, inset 0 0 20px ${item.color}30`,
                }}
              >
                {item.icon}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 border-2 border-primary/30"
        animate={{ rotate: [0, 90, 180, 270, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-32 h-32 rounded-full border-2 border-secondary/30"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
    </section>
  );
};

export default GallerySection;
