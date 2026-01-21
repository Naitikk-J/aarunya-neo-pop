import { motion } from 'framer-motion';

const socialLinks = [
  { name: 'Instagram', icon: '📸', url: '#' },
  { name: 'Twitter', icon: '🐦', url: '#' },
  { name: 'Discord', icon: '💬', url: '#' },
  { name: 'YouTube', icon: '▶️', url: '#' },
];

const Footer = () => {
  return (
    <footer className="relative py-12 px-4 md:px-8 border-t-4 border-primary">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              hsl(28 100% 50%) 0px,
              hsl(28 100% 50%) 2px,
              transparent 2px,
              transparent 10px
            )`,
          }}
        />
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <motion.h3
              className="font-display text-xl text-primary mb-4"
              style={{ textShadow: '0 0 15px hsl(28 100% 50%), 0 0 30px hsl(28 100% 50%)' }}
              whileHover={{ scale: 1.05 }}
            >
              AARUNYA 2.0
            </motion.h3>
            <p className="font-body text-sm text-muted-foreground">
              The annual techno-cultural festival of MITS Gwalior. 
              Experience the magic of Kidcore!
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm text-foreground mb-4">QUICK LINKS</h4>
            <ul className="space-y-2">
              {['Events', 'Gallery', 'Sponsors', 'Team', 'Contact'].map((link) => (
                <li key={link}>
                  <motion.a 
                    href={`#${link.toLowerCase()}`}
                    className="font-body text-sm text-muted-foreground hover:text-primary transition-colors interactive"
                    whileHover={{ x: 5 }}
                  >
                    → {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Social Links */}
          <div>
            <h4 className="font-display text-sm text-foreground mb-4">FOLLOW US</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  className="w-12 h-12 bg-card border-2 border-muted flex items-center justify-center text-xl interactive rounded"
                  style={{ boxShadow: '3px 3px 0px hsl(217 33% 15%)' }}
                  whileHover={{
                    scale: 1.1,
                    borderColor: 'hsl(28 100% 50%)',
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-muted flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-muted-foreground">
            © 2025 AARUNYA 2.0 | MITS Gwalior. All rights reserved.
          </p>
          <p className="font-display text-[10px] text-muted-foreground">
            MADE WITH 💖 BY TEAM AARUNYA
          </p>
        </div>
        
        {/* Decorative Stickers */}
        <motion.div
          className="absolute -top-4 right-10 text-3xl"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          ⭐
        </motion.div>
        <motion.div
          className="absolute bottom-4 left-10 text-2xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🎮
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
