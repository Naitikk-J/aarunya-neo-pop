import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Calendar, Image, Users, Heart, LogIn } from 'lucide-react';

const navItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: Calendar, label: 'Events', href: '#events' },
  { icon: Image, label: 'Gallery', href: './Gallery' },
  { icon: Heart, label: 'Sponsors', href: '#sponsors' },
  { icon: Users, label: 'Team', href: '#team' },
  { icon: LogIn, label: 'Login', href: '#login' },
];

interface DockNavbarProps {
  isVisible?: boolean;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}

const DockNavbar = ({ isVisible = true, onHoverStart, onHoverEnd }: DockNavbarProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleContainerMouseEnter = () => {
    onHoverStart?.();
  };

  const handleContainerMouseLeave = () => {
    onHoverEnd?.();
  };

  return (
    <motion.nav
      className="fixed bottom-6 right-6 z-50"
      initial={{ x: 100, opacity: 0 }}
      animate={isVisible ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      onMouseEnter={handleContainerMouseEnter}
      onMouseLeave={handleContainerMouseLeave}
    >
      <div
        className="tv-remote-container py-4 px-3 rounded-2xl bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 border-4 border-gray-600"
        style={{
          boxShadow: 'inset 0 2px 8px rgba(255,255,255,0.1), 8px 8px 20px rgba(0,0,0,0.8), 0 0 30px hsl(300 100% 50% / 0.2)',
        }}
      >
        {/* Remote Vertical Layout */}
        <div className="flex flex-col gap-3 items-center">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isHovered = hoveredIndex === index;
            const isRoute = item.href.startsWith('/');

            const buttonContent = (
              <>
                {/* Circular Remote Button */}
                <motion.div
                  className="w-14 h-14 rounded-full flex items-center justify-center cursor-pointer"
                  style={{
                    background: isHovered
                      ? `radial-gradient(circle at 30% 30%, hsl(${index % 2 === 0 ? 25 : 210} 100% 60%), hsl(${index % 2 === 0 ? 25 : 210} 100% 40%))`
                      : `radial-gradient(circle at 30% 30%, hsl(${index % 2 === 0 ? 25 : 210} 80% 45%), hsl(${index % 2 === 0 ? 25 : 210} 90% 25%))`,
                    boxShadow: isHovered
                      ? `0 0 20px hsl(${index % 2 === 0 ? 25 : 210} 100% 50%), inset -2px -2px 5px rgba(0,0,0,0.5), inset 2px 2px 5px rgba(255,255,255,0.2)`
                      : `0 4px 8px rgba(0,0,0,0.6), inset -2px -2px 8px rgba(0,0,0,0.8), inset 2px 2px 5px rgba(255,255,255,0.1)`,
                  }}
                  animate={isHovered ? { scale: 1.15, y: -2 } : { scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon
                    className={`w-7 h-7 transition-colors ${isHovered ? 'text-white' : 'text-gray-200'}`}
                  />

                  {/* Gloss Effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
                </motion.div>

                {/* Tooltip Label */}
                <motion.span
                  className="absolute -left-20 font-display text-xs text-gray-300 whitespace-nowrap px-2 py-1 rounded bg-gray-800/90 border border-gray-600"
                  initial={{ opacity: 0, x: 4 }}
                  animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.label}
                </motion.span>
              </>
            );

            if (isRoute) {
              return (
                <motion.div
                  key={item.label}
                  className="remote-button group flex items-center justify-center relative"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  title={item.label}
                >
                  <Link
                    to={item.href}
                    className="absolute inset-0 flex items-center justify-center"
                  />
                  {buttonContent}
                </motion.div>
              );
            }

            return (
              <motion.a
                key={item.label}
                href={item.href}
                className="remote-button group flex items-center justify-center relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                title={item.label}
              >
                {buttonContent}
              </motion.a>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};

export default DockNavbar;
