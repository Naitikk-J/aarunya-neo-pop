import { motion } from 'framer-motion';
import { useState } from 'react';
import { Home, Calendar, Image, Users, Heart, LogIn } from 'lucide-react';

const navItems = [
  { icon: Home, label: 'Home', href: '#home' },
  { icon: Calendar, label: 'Events', href: '#events' },
  { icon: Image, label: 'Gallery', href: '#gallery' },
  { icon: Heart, label: 'Sponsors', href: '#sponsors' },
  { icon: Users, label: 'Team', href: '#team' },
  { icon: LogIn, label: 'Login', href: '#login' },
];

const DockNavbar = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <motion.nav
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.5, type: "spring" }}
    >
      <div 
        className="flex items-end gap-1 px-4 py-3 rounded-2xl bg-card/80 backdrop-blur-xl border-4 border-primary/30"
        style={{
          boxShadow: '0 0 30px hsl(300 100% 50% / 0.3), 0 10px 40px rgba(0,0,0,0.5)',
        }}
      >
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isHovered = hoveredIndex === index;
          const distance = hoveredIndex !== null ? Math.abs(hoveredIndex - index) : 0;
          const scale = isHovered ? 1.5 : hoveredIndex !== null ? Math.max(1, 1.3 - distance * 0.15) : 1;
          
          return (
            <motion.a
              key={item.label}
              href={item.href}
              className="interactive relative flex flex-col items-center"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              animate={{ scale }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <motion.div
                className="relative p-3 rounded-xl"
                style={{
                  background: isHovered 
                    ? `linear-gradient(135deg, hsl(${300 + index * 30} 100% 50%), hsl(${180 + index * 30} 100% 50%))`
                    : 'transparent',
                }}
                whileHover={{
                  boxShadow: '0 0 20px hsl(300 100% 50% / 0.5)',
                }}
              >
                <Icon 
                  className={`w-6 h-6 transition-colors ${isHovered ? 'text-background' : 'text-foreground'}`}
                />
                
                {/* Reflection */}
                {isHovered && (
                  <motion.div
                    className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-4 rounded-full blur-md opacity-50"
                    style={{
                      background: `linear-gradient(135deg, hsl(${300 + index * 30} 100% 50%), hsl(${180 + index * 30} 100% 50%))`,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                  />
                )}
              </motion.div>
              
              {/* Label */}
              <motion.span
                className="absolute -top-8 font-display text-[10px] text-foreground whitespace-nowrap px-2 py-1 rounded bg-card border border-primary/50"
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: isHovered ? 1 : 0, 
                  y: isHovered ? 0 : 10,
                }}
                transition={{ duration: 0.2 }}
              >
                {item.label}
              </motion.span>
            </motion.a>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default DockNavbar;
