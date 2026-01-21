import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';

const sponsors = [
  { name: 'TechCorp', tier: 'platinum', logo: '🏢' },
  { name: 'GameZone', tier: 'platinum', logo: '🎮' },
  { name: 'DrinkMax', tier: 'gold', logo: '🥤' },
  { name: 'FoodHub', tier: 'gold', logo: '🍔' },
  { name: 'MusicBox', tier: 'gold', logo: '🎵' },
  { name: 'StyleUp', tier: 'silver', logo: '👕' },
  { name: 'TechGear', tier: 'silver', logo: '⌨️' },
  { name: 'EduPro', tier: 'silver', logo: '📚' },
];

const tierStyles = {
  platinum: 'border-carnival-golden bg-gradient-to-br from-yellow-900/20 to-yellow-800/10',
  gold: 'border-carnival-orange bg-gradient-to-br from-orange-900/20 to-orange-800/10',
  silver: 'border-muted-foreground bg-gradient-to-br from-gray-800/20 to-gray-700/10',
};

const SponsorsSection = () => {
  return (
    <section id="sponsors" className="relative py-20 md:py-32 px-4 md:px-8">
      <div className="container mx-auto">
        <SectionTitle
          color="orange"
          subtitle="The amazing brands making this fest possible!"
        >
          OUR SPONSORS
        </SectionTitle>
        
        {/* Platinum Tier */}
        <div className="mb-12">
          <motion.h3
            className="font-display text-sm text-carnival-golden text-center mb-6"
            style={{ textShadow: '0 0 15px hsl(42 100% 55%), 0 0 30px hsl(42 100% 55%)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            ★ PLATINUM PARTNERS ★
          </motion.h3>
          <div className="flex flex-wrap justify-center gap-6">
            {sponsors.filter(s => s.tier === 'platinum').map((sponsor, index) => (
              <motion.div
                key={sponsor.name}
                className={`w-40 h-40 md:w-52 md:h-52 ${tierStyles[sponsor.tier]} border-4 flex flex-col items-center justify-center`}
                style={{ boxShadow: '6px 6px 0px rgba(0,0,0,0.5)' }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                <span className="text-5xl md:text-6xl mb-2">{sponsor.logo}</span>
                <span className="font-display text-xs text-foreground">{sponsor.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Gold Tier */}
        <div className="mb-12">
          <motion.h3
            className="font-display text-sm text-carnival-orange text-center mb-6"
            style={{ textShadow: '0 0 15px hsl(28 100% 50%), 0 0 30px hsl(28 100% 50%)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            ★ GOLD PARTNERS ★
          </motion.h3>
          <div className="flex flex-wrap justify-center gap-4">
            {sponsors.filter(s => s.tier === 'gold').map((sponsor, index) => (
              <motion.div
                key={sponsor.name}
                className={`w-32 h-32 md:w-40 md:h-40 ${tierStyles[sponsor.tier]} border-4 flex flex-col items-center justify-center`}
                style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-4xl md:text-5xl mb-2">{sponsor.logo}</span>
                <span className="font-display text-[10px] text-foreground">{sponsor.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Silver Tier */}
        <div>
          <motion.h3 
            className="font-display text-sm text-muted-foreground text-center mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            ★ SILVER PARTNERS ★
          </motion.h3>
          <div className="flex flex-wrap justify-center gap-4">
            {sponsors.filter(s => s.tier === 'silver').map((sponsor, index) => (
              <motion.div
                key={sponsor.name}
                className={`w-24 h-24 md:w-32 md:h-32 ${tierStyles[sponsor.tier]} border-2 flex flex-col items-center justify-center`}
                style={{ boxShadow: '3px 3px 0px rgba(0,0,0,0.5)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-3xl md:text-4xl mb-1">{sponsor.logo}</span>
                <span className="font-display text-[8px] text-foreground">{sponsor.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Become a Sponsor CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="font-body text-muted-foreground mb-4">
            Want to be a part of something amazing?
          </p>
          <motion.button
            className="font-display text-sm px-8 py-4 bg-gradient-to-r from-primary via-accent to-secondary text-background border-4 interactive rounded"
            style={{ borderColor: 'hsl(217 33% 15%)', boxShadow: '4px 4px 0px hsl(217 33% 15%)' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95, x: 4, y: 4, boxShadow: '0px 0px 0px hsl(217 33% 15%)' }}
          >
            BECOME A SPONSOR
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default SponsorsSection;
