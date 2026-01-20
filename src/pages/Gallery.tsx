import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import CursorFollower from '@/components/CursorFollower';
import NoiseOverlay from '@/components/NoiseOverlay';

interface FloatingItem {
  id: string;
  x: number;
  y: number;
  src: string;
  type: 'image' | 'video';
  duration: number;
  delay: number;
}

const dummyMedia = [
  { src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop', type: 'image' as const },
  { src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop', type: 'image' as const },
  { src: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop', type: 'image' as const },
  { src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=300&fit=crop', type: 'image' as const },
  { src: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=300&h=300&fit=crop', type: 'image' as const },
  { src: 'https://images.unsplash.com/photo-1478737270454-541a06777d4d?w=300&h=300&fit=crop', type: 'image' as const },
  { src: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop', type: 'image' as const },
  { src: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&h=300&fit=crop', type: 'image' as const },
  { src: 'https://images.unsplash.com/photo-1514523247557-40e08b25da37?w=300&h=300&fit=crop', type: 'image' as const },
  { src: 'https://images.unsplash.com/photo-1511415225967-ab1ce5b94d35?w=300&h=300&fit=crop', type: 'image' as const },
];

const Gallery = () => {
  const [floatingItems, setFloatingItems] = useState<FloatingItem[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemIdRef = useRef(0);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Create 2-4 floating items at the click position
    const itemCount = Math.floor(Math.random() * 3) + 2;
    const newItems: FloatingItem[] = [];

    for (let i = 0; i < itemCount; i++) {
      const media = dummyMedia[Math.floor(Math.random() * dummyMedia.length)];
      const newItem: FloatingItem = {
        id: `${itemIdRef.current++}`,
        x,
        y,
        src: media.src,
        type: media.type,
        duration: Math.random() * 2 + 4,
        delay: i * 0.15,
      };
      newItems.push(newItem);
    }

    setFloatingItems(prev => [...prev, ...newItems]);

    // Remove items after animation completes
    setTimeout(() => {
      setFloatingItems(prev => 
        prev.filter(item => !newItems.find(newItem => newItem.id === item.id))
      );
    }, (Math.max(...newItems.map(item => item.duration + item.delay)) + 0.5) * 1000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Global Effects */}
      <CursorFollower />
      <NoiseOverlay />

      {/* Back Button */}
      <Link
        to="/"
        className="fixed top-6 left-6 z-40 flex items-center gap-2 px-4 py-2 rounded-lg"
        style={{
          background: 'radial-gradient(circle at 30% 30%, hsl(25 100% 60%), hsl(25 100% 40%))',
          boxShadow: '0 0 20px hsl(25 100% 50%), inset -2px -2px 5px rgba(0,0,0,0.5), inset 2px 2px 5px rgba(255,255,255,0.2)',
        }}
      >
        <ArrowLeft className="w-5 h-5 text-white" />
        <span className="font-display text-sm text-white">HOME</span>
      </Link>

      {/* Main Gallery */}
      <section
        id="gallery-page"
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
            Click to reveal moments from AARUNYA
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
                scale: [0, 1, 0.3],
                x: (Math.random() - 0.5) * 300,
                y: (Math.random() - 0.5) * 300 - 150,
              }}
              transition={{
                duration: item.duration,
                delay: item.delay,
                ease: "easeOut",
                opacity: { duration: item.duration, times: [0, 0.6, 1] },
              }}
              exit={{ opacity: 0, scale: 0 }}
            >
              <motion.div
                className="relative"
                animate={{ 
                  rotate: [0, 360],
                  y: [0, -10, 0],
                }}
                transition={{ 
                  rotate: { duration: item.duration * 0.8, repeat: Infinity, ease: "linear" },
                  y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                <div
                  className="w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden flex items-center justify-center border-2 bg-card"
                  style={{
                    borderColor: 'hsl(25 100% 50%)',
                    boxShadow: '0 0 20px hsl(25 100% 50%), inset 0 0 20px hsl(25 100% 30%)',
                  }}
                >
                  {item.type === 'image' ? (
                    <img
                      src={item.src}
                      alt="Gallery item"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/300x300?text=Image';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <span className="text-4xl">🎥</span>
                    </div>
                  )}
                  
                  {/* Gloss effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Decorative Elements */}
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 border-2 border-primary/20"
          animate={{ rotate: [0, 90, 180, 270, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-40 h-40 rounded-full border-2 border-secondary/20"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </section>
    </div>
  );
};

export default Gallery;
