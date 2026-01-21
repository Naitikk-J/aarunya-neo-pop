import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface IDRevealModalProps {
  aarunyaId: string;
  onClose: () => void;
}

const IDRevealModal = ({ aarunyaId, onClose }: IDRevealModalProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [copied, setCopied] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const { toast } = useToast();

  // Confetti animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      size: number;
      life: number;
    }> = [];

    // Create confetti particles
    const colors = ['#84cc16', '#06b6d4', '#ff006e', '#fbbf24', '#a78bfa'];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.5) * 12 - 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        life: 1,
      });
    }

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2; // gravity
        p.life -= 0.01;

        if (p.life <= 0) {
          particles.splice(index, 1);
        } else {
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.life;
          ctx.fillRect(p.x, p.y, p.size, p.size);
          ctx.globalAlpha = 1;
        }
      });

      if (particles.length > 0) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(aarunyaId);
    setCopied(true);
    toast({
      title: 'Copied!',
      description: 'Aarunya-ID copied to clipboard',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
      />

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        className="relative z-10"
      >
        {/* Holographic Card Container */}
        <motion.div
          onClick={() => setIsFlipped(!isFlipped)}
          className="cursor-pointer perspective"
          style={{ perspective: '1200px' }}
        >
          <motion.div
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6 }}
            className="relative w-96 h-56 bg-gradient-to-br from-lime-400/20 via-cyan-400/20 to-purple-400/20 rounded-2xl border-2 border-lime-400 p-8 shadow-2xl"
            style={{
              transformStyle: 'preserve-3d',
              boxShadow: '0 0 40px rgba(132, 204, 22, 0.6), inset 0 0 40px rgba(6, 182, 212, 0.2)',
            }}
          >
            {/* Front Side */}
            <motion.div
              style={{ backfaceVisibility: 'hidden' }}
              className="absolute inset-0 flex flex-col items-center justify-center p-8 rounded-2xl"
            >
              <h3 className="text-lime-400 font-mono text-sm font-bold mb-4">
                AARUNYA PLAYER CARD
              </h3>
              <div className="text-center">
                <p className="text-gray-300 font-mono text-xs mb-4">YOUR UNIQUE ID</p>
                <motion.p
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-cyan-400 font-mono tracking-widest"
                >
                  {aarunyaId}
                </motion.p>
              </div>
              <p className="text-gray-400 font-mono text-xs mt-8">Click to reveal info</p>
            </motion.div>

            {/* Back Side */}
            <motion.div
              initial={{ rotateY: 180 }}
              animate={{ rotateY: isFlipped ? 0 : 180 }}
              transition={{ duration: 0.6 }}
              style={{ backfaceVisibility: 'hidden' }}
              className="absolute inset-0 flex flex-col items-center justify-center p-8 rounded-2xl bg-gradient-to-br from-black to-gray-900 border-2 border-lime-400"
            >
              <h3 className="text-lime-400 font-mono text-sm font-bold mb-4">SAVE THIS ID</h3>
              <p className="text-gray-300 font-mono text-xs text-center mb-6">
                This is your unique Aarunya-ID. Use it to log in to future events.
              </p>
              <div className="bg-black border-2 border-lime-400 rounded p-4 mb-4 w-full">
                <p className="text-lime-400 font-mono text-center text-lg font-bold">
                  {aarunyaId}
                </p>
              </div>
              <p className="text-yellow-400 font-mono text-xs text-center">
                ⚠️ Do not share this ID with anyone
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex gap-4 mt-8 justify-center"
        >
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-6 py-3 bg-lime-400 text-black font-bold font-mono rounded-lg hover:bg-lime-500 transition-colors shadow-lg"
          >
            {copied ? (
              <>
                <Check className="w-5 h-5" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                Copy ID
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="px-6 py-3 bg-cyan-400 text-black font-bold font-mono rounded-lg hover:bg-cyan-500 transition-colors shadow-lg"
          >
            Continue
          </button>
        </motion.div>

        {/* Instructions */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-gray-300 font-mono text-xs mt-6 max-w-md"
        >
          ✨ Your account is ready! Keep your Aarunya-ID safe for future logins. ✨
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default IDRevealModal;
