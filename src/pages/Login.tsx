import { motion } from 'framer-motion';
import CursorFollower from '@/components/CursorFollower';
import LoginForm from '@/components/LoginForm';
import NoiseOverlay from '@/components/NoiseOverlay';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Custom Cursor */}
      <CursorFollower />

      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Grid Background */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(0deg, transparent 24%, rgba(6, 182, 212, 0.1) 25%, rgba(6, 182, 212, 0.1) 26%, transparent 27%, transparent 74%, rgba(6, 182, 212, 0.1) 75%, rgba(6, 182, 212, 0.1) 76%, transparent 77%, transparent),
              linear-gradient(90deg, transparent 24%, rgba(6, 182, 212, 0.1) 25%, rgba(6, 182, 212, 0.1) 26%, transparent 27%, transparent 74%, rgba(6, 182, 212, 0.1) 75%, rgba(6, 182, 212, 0.1) 76%, transparent 77%, transparent)
            `,
            backgroundSize: '50px 50px',
          }}
        />

        {/* Animated Gradient Orbs */}
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-3xl"
        />
      </div>

      <NoiseOverlay />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header with Back Button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between p-6"
        >
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors font-mono text-sm"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-2xl font-display text-cyan-400">AARUNYA 2.0</h1>
          <div className="w-16" />
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            {/* Card Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="p-8 rounded-2xl border-2 border-cyan-400/30 bg-black/40 backdrop-blur-sm"
              style={{
                boxShadow: '0 0 40px rgba(6, 182, 212, 0.2), inset 0 0 20px rgba(6, 182, 212, 0.05)',
              }}
            >
              <LoginForm />
            </motion.div>

            {/* Footer Info */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center text-gray-400 font-mono text-xs mt-8"
            >
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/register')}
                className="text-lime-400 hover:text-lime-300 font-bold underline"
              >
                Register here
              </button>
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
