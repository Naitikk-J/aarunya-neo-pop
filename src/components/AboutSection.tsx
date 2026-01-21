import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';
import CandyButton from './CandyButton';

const stats = [
  { number: '50+', label: 'EVENTS', emoji: '🎮' },
  { number: '10K+', label: 'FOOTFALL', emoji: '👥' },
  { number: '₹5L+', label: 'PRIZES', emoji: '🏆' },
  { number: '3', label: 'DAYS', emoji: '📅' },
];

const AboutSection = () => {
  return (
    <section className="relative py-20 md:py-32 px-4 md:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-card" />
      
      {/* Floating Shapes */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 border-4 border-primary/30 rotate-45"
        animate={{ rotate: [45, 90, 45], scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-24 h-24 border-4 border-secondary/30 rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      
      <div className="container mx-auto relative z-10">
        <SectionTitle
          color="teal"
          subtitle="The biggest college fest of Central India is back!"
        >
          WELCOME TO AARUNYA
        </SectionTitle>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-muted-foreground font-body leading-relaxed">
              <span className="text-primary font-bold">Aarunya 2.0</span> is the annual 
              techno-cultural festival of <span className="text-accent">MITS Gwalior</span>, 
              where creativity meets chaos in the most beautiful way possible!
            </p>
            <p className="text-lg text-muted-foreground font-body leading-relaxed">
              From mind-bending hackathons to electrifying dance battles, from robot wars 
              to battle of bands – we've got it all! This year's theme? 
              <span className="text-secondary font-bold"> KIDCORE</span> – a nostalgic 
              trip to the 90s with a futuristic twist!
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <CandyButton variant="orange" size="lg">
                REGISTER NOW
              </CandyButton>
              <CandyButton variant="teal" size="lg">
                WATCH TEASER
              </CandyButton>
            </div>
          </motion.div>
          
          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="relative p-6 bg-card border-4 border-muted text-center"
                style={{ boxShadow: '6px 6px 0px rgba(0,0,0,0.5)' }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.05,
                  borderColor: index % 2 === 0 ? 'hsl(28 100% 50%)' : 'hsl(180 40% 50%)',
                }}
              >
                <motion.span 
                  className="text-4xl block mb-2"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                >
                  {stat.emoji}
                </motion.span>
                <span className="font-display text-2xl md:text-3xl text-foreground block">
                  {stat.number}
                </span>
                <span className="font-display text-[10px] text-muted-foreground">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Marquee */}
        <motion.div 
          className="mt-16 py-4 bg-primary overflow-hidden"
          style={{ boxShadow: '0 4px 0px rgba(0,0,0,0.5)' }}
        >
          <motion.div
            className="flex gap-8 whitespace-nowrap"
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {[...Array(10)].map((_, i) => (
              <span key={i} className="font-display text-sm text-primary-foreground">
                ★ AARUNYA 2.0 ★ MARCH 15-17 ★ MITS GWALIOR ★ KIDCORE EDITION
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
