import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';
import EventCard from './EventCard';

const events = [
  {
    title: 'CODE MAYHEM',
    category: 'TECH',
    date: 'March 15, 2025',
    time: '10:00 AM',
    venue: 'Main Auditorium',
    teamSize: '1-3 Members',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&h=400&fit=crop&q=80',
    color: 'pink' as const,
  },
  {
    title: 'DANCE BATTLE',
    category: 'CULTURAL',
    date: 'March 15, 2025',
    time: '2:00 PM',
    venue: 'Open Air Theater',
    teamSize: '4-8 Members',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&h=400&fit=crop&q=80',
    color: 'green' as const,
  },
  {
    title: 'ROBO WARS',
    category: 'ROBOTICS',
    date: 'March 16, 2025',
    time: '11:00 AM',
    venue: 'Tech Arena',
    teamSize: '2-4 Members',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop&q=80',
    color: 'cyan' as const,
  },
  {
    title: 'BATTLE OF BANDS',
    category: 'MUSIC',
    date: 'March 16, 2025',
    time: '5:00 PM',
    venue: 'Main Stage',
    teamSize: '4-6 Members',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop&q=80',
    color: 'yellow' as const,
  },
  {
    title: 'GAMING ARENA',
    category: 'ESPORTS',
    date: 'March 17, 2025',
    time: '9:00 AM',
    venue: 'Gaming Zone',
    teamSize: '1-5 Members',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=400&fit=crop&q=80',
    color: 'orange' as const,
  },
  {
    title: 'ART ATTACK',
    category: 'ART',
    date: 'March 17, 2025',
    time: '1:00 PM',
    venue: 'Art Gallery',
    teamSize: 'Individual',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&h=400&fit=crop&q=80',
    color: 'pink' as const,
  },
];

const EventsSection = () => {
  return (
    <section id="events" className="relative py-20 md:py-32 px-4 md:px-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, hsl(300 100% 50%) 0%, transparent 25%),
              radial-gradient(circle at 80% 50%, hsl(180 100% 50%) 0%, transparent 25%),
              radial-gradient(circle at 50% 80%, hsl(120 100% 50%) 0%, transparent 25%)
            `,
          }}
        />
      </div>
      
      <div className="container mx-auto relative z-10">
        <SectionTitle 
          color="rainbow"
          subtitle="Get ready for the most epic events of the year!"
        >
          EVENTS
        </SectionTitle>
        
        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 justify-items-center">
          {events.map((event, index) => (
            <EventCard key={event.title} {...event} index={index} />
          ))}
        </div>
        
        {/* Decorative Elements */}
        <motion.div
          className="absolute -top-10 -left-10 text-6xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          🎪
        </motion.div>
        <motion.div
          className="absolute -bottom-10 -right-10 text-6xl"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          🎡
        </motion.div>
      </div>
    </section>
  );
};

export default EventsSection;
