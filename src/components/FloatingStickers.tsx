import { motion } from 'framer-motion';

const stickers = [
  { emoji: '⭐', color: 'text-neon-yellow', size: 'text-4xl', delay: 0 },
  { emoji: '⚡', color: 'text-neon-orange', size: 'text-3xl', delay: 0.5 },
  { emoji: '🌈', color: '', size: 'text-4xl', delay: 1 },
  { emoji: '💖', color: 'text-neon-pink', size: 'text-3xl', delay: 1.5 },
  { emoji: '🎮', color: '', size: 'text-4xl', delay: 0.3 },
  { emoji: '🎪', color: '', size: 'text-3xl', delay: 0.8 },
  { emoji: '🌟', color: 'text-neon-yellow', size: 'text-5xl', delay: 1.2 },
  { emoji: '🎵', color: '', size: 'text-3xl', delay: 0.6 },
  { emoji: '🔥', color: '', size: 'text-4xl', delay: 1.8 },
  { emoji: '💫', color: 'text-neon-cyan', size: 'text-3xl', delay: 0.2 },
];

const positions = [
  { top: '10%', left: '5%' },
  { top: '20%', right: '8%' },
  { top: '35%', left: '3%' },
  { top: '50%', right: '5%' },
  { top: '65%', left: '7%' },
  { top: '75%', right: '10%' },
  { top: '85%', left: '4%' },
  { top: '15%', left: '92%' },
  { top: '45%', left: '95%' },
  { top: '90%', right: '3%' },
];

const FloatingStickers = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {stickers.map((sticker, index) => (
        <motion.div
          key={index}
          className={`absolute ${sticker.size} ${sticker.color}`}
          style={positions[index]}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ 
            opacity: [0.4, 0.8, 0.4],
            scale: [0.8, 1, 0.8],
            rotate: [0, 10, -10, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            delay: sticker.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {sticker.emoji}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingStickers;
