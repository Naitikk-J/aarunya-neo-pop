import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CandyButtonProps {
  children: ReactNode;
  variant?: 'pink' | 'green' | 'cyan' | 'yellow' | 'orange';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}

const variants = {
  pink: 'bg-primary text-primary-foreground border-primary',
  green: 'bg-secondary text-secondary-foreground border-secondary',
  cyan: 'bg-accent text-accent-foreground border-accent',
  yellow: 'bg-neon-yellow text-background border-neon-yellow',
  orange: 'bg-neon-orange text-background border-neon-orange',
};

const sizes = {
  sm: 'px-4 py-2 text-[10px]',
  md: 'px-6 py-3 text-xs',
  lg: 'px-8 py-4 text-sm',
};

const CandyButton = ({ 
  children, 
  variant = 'pink', 
  size = 'md',
  onClick,
  className = '',
}: CandyButtonProps) => {
  return (
    <motion.button
      className={`
        relative font-display uppercase tracking-wider
        border-4 border-black
        ${variants[variant]}
        ${sizes[size]}
        ${className}
        interactive
      `}
      style={{
        boxShadow: '4px 4px 0px hsl(0 0% 0%)',
      }}
      whileHover={{
        scale: 1.05,
      }}
      whileTap={{
        scale: 0.98,
        x: 4,
        y: 4,
        boxShadow: '0px 0px 0px hsl(0 0% 0%)',
      }}
      onClick={onClick}
    >
      {/* Inner Highlight */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
      
      {/* Content */}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default CandyButton;
