import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';

interface EventCardProps {
  title: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  teamSize: string;
  image: string;
  color: 'pink' | 'green' | 'cyan' | 'yellow' | 'orange';
  index: number;
}

const colorClasses = {
  pink: {
    bg: 'bg-primary',
    border: 'border-primary',
    shadow: 'shadow-neon-pink',
    glow: 'box-neon-pink',
  },
  green: {
    bg: 'bg-secondary',
    border: 'border-secondary',
    shadow: 'shadow-neon-green',
    glow: 'box-neon-green',
  },
  cyan: {
    bg: 'bg-accent',
    border: 'border-accent',
    shadow: 'shadow-neon-cyan',
    glow: 'box-neon-cyan',
  },
  yellow: {
    bg: 'bg-neon-yellow',
    border: 'border-neon-yellow',
    shadow: '',
    glow: '',
  },
  orange: {
    bg: 'bg-neon-orange',
    border: 'border-neon-orange',
    shadow: '',
    glow: '',
  },
};

const EventCard = ({ title, category, date, time, venue, teamSize, image, color, index }: EventCardProps) => {
  const colors = colorClasses[color];
  
  return (
    <motion.div
      className="trading-card w-full max-w-sm h-[450px] perspective-1000"
      initial={{ opacity: 0, y: 50, rotateY: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="trading-card-inner relative w-full h-full">
        {/* Front of Card */}
        <div className={`trading-card-front absolute inset-0 ${colors.border} border-4 bg-card overflow-hidden`}
          style={{ boxShadow: '8px 8px 0px rgba(0,0,0,0.8)' }}
        >
          {/* Holographic Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 pointer-events-none" />
          
          {/* Category Badge */}
          <div className={`absolute top-4 left-4 ${colors.bg} px-3 py-1 font-display text-[10px] text-background z-10`}
            style={{ boxShadow: '2px 2px 0px rgba(0,0,0,0.5)' }}
          >
            {category}
          </div>
          
          {/* Card Image */}
          <div className="h-1/2 overflow-hidden">
            <motion.img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          </div>
          
          {/* Card Content */}
          <div className="p-4 space-y-3">
            <h3 className="font-display text-sm text-foreground leading-relaxed">
              {title}
            </h3>
            
            <div className="space-y-2 text-xs text-muted-foreground font-body">
              <div className="flex items-center gap-2">
                <Calendar className={`w-4 h-4 ${colors.border.replace('border-', 'text-')}`} />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className={`w-4 h-4 ${colors.border.replace('border-', 'text-')}`} />
                <span>{time}</span>
              </div>
            </div>
          </div>
          
          {/* Card Footer */}
          <div className={`absolute bottom-0 left-0 right-0 ${colors.bg} p-3`}>
            <span className="font-display text-[10px] text-background">
              FLIP TO REGISTER →
            </span>
          </div>
          
          {/* Corner Decorations */}
          <div className="absolute top-2 right-2 text-2xl">⭐</div>
          <div className="absolute bottom-12 right-2 text-xl opacity-50">🎮</div>
        </div>
        
        {/* Back of Card */}
        <div className={`trading-card-back absolute inset-0 ${colors.border} border-4 bg-card p-6`}
          style={{ boxShadow: '8px 8px 0px rgba(0,0,0,0.8)' }}
        >
          {/* Pattern Background */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)`,
              backgroundSize: '10px 10px',
            }}
          />
          
          <div className="relative z-10 h-full flex flex-col">
            <h3 className="font-display text-sm text-foreground mb-4">
              {title}
            </h3>
            
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-3 p-2 bg-muted/30 rounded">
                <MapPin className={`w-5 h-5 ${colors.border.replace('border-', 'text-')}`} />
                <div>
                  <p className="text-[10px] text-muted-foreground font-display">VENUE</p>
                  <p className="text-sm text-foreground font-body">{venue}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-2 bg-muted/30 rounded">
                <Users className={`w-5 h-5 ${colors.border.replace('border-', 'text-')}`} />
                <div>
                  <p className="text-[10px] text-muted-foreground font-display">TEAM SIZE</p>
                  <p className="text-sm text-foreground font-body">{teamSize}</p>
                </div>
              </div>
              
              <div className="p-2 bg-muted/30 rounded">
                <p className="text-[10px] text-muted-foreground font-display mb-1">RULES</p>
                <ul className="text-xs text-foreground font-body space-y-1">
                  <li>• College ID mandatory</li>
                  <li>• Register before deadline</li>
                  <li>• Be on time</li>
                </ul>
              </div>
            </div>
            
            {/* Register Button */}
            <motion.button
              className={`w-full py-3 ${colors.bg} font-display text-xs text-background border-4 border-black interactive`}
              style={{ boxShadow: '4px 4px 0px rgba(0,0,0,1)' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ 
                scale: 0.98,
                boxShadow: '2px 2px 0px rgba(0,0,0,1)',
                x: 2,
                y: 2,
              }}
            >
              REGISTER NOW
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
