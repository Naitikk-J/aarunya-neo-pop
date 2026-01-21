import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CursorFollower = () => {
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], .interactive')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], .interactive')) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Main Crosshair Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          animate={{
            scale: isHovering ? 1.5 : 1,
            rotate: isHovering ? 45 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="relative w-8 h-8"
        >
          {/* Crosshair Design */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Horizontal Line */}
            <div className="absolute w-full h-0.5 bg-white" />
            {/* Vertical Line */}
            <div className="absolute w-0.5 h-full bg-white" />
            {/* Center Circle */}
            <motion.div 
              className="absolute w-2 h-2 border-2 border-white rounded-full"
              animate={{ scale: isHovering ? [1, 1.5, 1] : 1 }}
              transition={{ duration: 0.3, repeat: isHovering ? Infinity : 0 }}
            />
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-0.5 bg-carnival-orange" />
            <div className="absolute top-0 left-0 w-0.5 h-2 bg-carnival-orange" />
            <div className="absolute top-0 right-0 w-2 h-0.5 bg-carnival-teal" />
            <div className="absolute top-0 right-0 w-0.5 h-2 bg-carnival-teal" />
            <div className="absolute bottom-0 left-0 w-2 h-0.5 bg-carnival-golden" />
            <div className="absolute bottom-0 left-0 w-0.5 h-2 bg-carnival-golden" />
            <div className="absolute bottom-0 right-0 w-2 h-0.5 bg-carnival-coral" />
            <div className="absolute bottom-0 right-0 w-0.5 h-2 bg-carnival-coral" />
          </div>
        </motion.div>
      </motion.div>
      
      {/* Trail Effect */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="w-8 h-8 rounded-full opacity-30"
          style={{
            background: 'linear-gradient(135deg, hsl(28 100% 50%), hsl(180 40% 50%))',
            filter: 'blur(8px)',
          }}
          animate={{
            scale: isHovering ? 2 : 1,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </>
  );
};

export default CursorFollower;
