import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CandyButtonProps {
  children: ReactNode;
  variant?: 'orange' | 'golden' | 'teal' | 'coral';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}

const variants = {
  orange: 'bg-primary text-primary-foreground border-primary',
  golden: 'bg-secondary text-secondary-foreground border-secondary',
  teal: 'bg-accent text-accent-foreground border-accent',
  coral: 'bg-carnival-coral text-background border-carnival-coral',
};

const sizes = {
  sm: 'px-4 py-2 text-[10px]',
  md: 'px-6 py-3 text-xs',
  lg: 'px-8 py-4 text-sm',
};

const CandyButton = ({
  children,
  variant = 'orange',
  size = 'md',
  onClick,
  className = '',
}: CandyButtonProps) => {
  return (
    <motion.button
      className={`
        relative font-display uppercase tracking-wider
        border-4 rounded-lg
        ${variants[variant]}
        ${sizes[size]}
        ${className}
        interactive
      `}
      style={{
        borderColor: 'hsl(217 33% 15%)',
        boxShadow: '6px 6px 0px hsl(217 33% 15%)',
      }}
      whileHover={{
        scale: 1.05,
      }}
      whileTap={{
        scale: 0.98,
        x: 6,
        y: 6,
        boxShadow: '0px 0px 0px hsl(217 33% 15%)',
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
