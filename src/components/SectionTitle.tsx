import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionTitleProps {
  children: ReactNode;
  subtitle?: string;
  color?: 'orange' | 'teal' | 'golden' | 'rainbow';
}

const glowColors = {
  orange: 'neon-pink',
  teal: 'neon-cyan',
  golden: 'neon-yellow',
  rainbow: 'rainbow-text',
};

const SectionTitle = ({ children, subtitle, color = 'pink' }: SectionTitleProps) => {
  return (
    <motion.div
      className="text-center mb-12 md:mb-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <motion.h2 
        className={`font-display text-2xl md:text-4xl lg:text-5xl ${color === 'rainbow' ? 'rainbow-text' : glowColors[color]}`}
        data-text={typeof children === 'string' ? children : ''}
      >
        {children}
      </motion.h2>
      
      {subtitle && (
        <motion.p
          className="mt-4 font-body text-lg text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          {subtitle}
        </motion.p>
      )}
      
      {/* Decorative Line */}
      <motion.div 
        className="mt-6 mx-auto h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
        initial={{ width: 0 }}
        whileInView={{ width: '200px' }}
        transition={{ delay: 0.3, duration: 0.5 }}
        viewport={{ once: true }}
      />
    </motion.div>
  );
};

export default SectionTitle;
