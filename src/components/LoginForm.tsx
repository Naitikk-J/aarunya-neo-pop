import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate, Link } from 'react-router-dom';

interface LoginFormData {
  aarunyaId: string;
  password: string;
}

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string | null>(null);

  const onSubmit = async (data: LoginFormData) => {
    setLoginError(null);
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setLoginError(result.error || 'Login failed');
        toast({
          title: 'Login Failed',
          description: result.error || 'An error occurred during login',
          variant: 'destructive',
        });
        return;
      }

      // Store token in localStorage
      localStorage.setItem('authToken', result.token);
      localStorage.setItem('aarunyaId', result.aarunyaId);
      localStorage.setItem('userEmail', result.email);
      localStorage.setItem('fullName', result.fullName);

      toast({
        title: 'Login Successful!',
        description: `Welcome back, ${result.fullName}!`,
      });

      // Redirect to home
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Failed to connect to server. Please try again.');
      toast({
        title: 'Error',
        description: 'Failed to login. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const inputClasses = 'retro-input bg-black border-2 border-cyan-400 text-cyan-400 font-mono placeholder-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black';
  const labelClasses = 'text-cyan-400 font-mono text-sm font-bold';
  const errorClasses = 'text-red-400 font-mono text-xs mt-1';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Form Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-display text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-2">
            RESUME GAME
          </h2>
          <p className="text-cyan-400 font-mono text-sm">Access Your Aarunya Account</p>
        </div>

        {/* Error Message */}
        {loginError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-3 bg-red-900/20 border-2 border-red-400 rounded text-red-400 font-mono text-sm"
          >
            ⚠️ {loginError}
          </motion.div>
        )}

        {/* Aarunya ID */}
        <div className="form-group">
          <Label htmlFor="aarunyaId" className={labelClasses}>
            PLAYER ID
          </Label>
          <Input
            id="aarunyaId"
            {...register('aarunyaId', {
              required: 'Aarunya-ID is required',
              pattern: {
                value: /^AR-\d{2}-\d{4}$/,
                message: 'Invalid format. Use: AR-26-XXXX',
              },
            })}
            placeholder="> AR-26-XXXX"
            className={inputClasses}
            disabled={isSubmitting}
          />
          {errors.aarunyaId && <p className={errorClasses}>{errors.aarunyaId.message}</p>}
        </div>

        {/* Password */}
        <div className="form-group">
          <Label htmlFor="password" className={labelClasses}>
            ACCESS CODE
          </Label>
          <Input
            id="password"
            type="password"
            {...register('password', {
              required: 'Password is required',
            })}
            placeholder="> Enter your password"
            className={inputClasses}
            disabled={isSubmitting}
          />
          {errors.password && <p className={errorClasses}>{errors.password.message}</p>}
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isSubmitting}
          type="submit"
          className="w-full mt-6 py-3 px-4 bg-gradient-to-b from-cyan-400 to-cyan-600 text-black font-bold font-mono text-lg rounded-lg border-4 border-cyan-300 shadow-lg hover:shadow-xl hover:shadow-cyan-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            textShadow: '2px 2px 0px rgba(0,0,0,0.3)',
            boxShadow: '0 8px 0 rgba(0,0,0,0.3), 0 0 20px rgba(6, 182, 212, 0.5)',
          }}
        >
          {isSubmitting ? 'LOADING GAME...' : '> PLAY'}
        </motion.button>

        {/* Register Link */}
        <div className="text-center mt-6 pt-4 border-t border-gray-600">
          <p className="text-gray-400 font-mono text-sm mb-3">New to Aarunya?</p>
          <Link
            to="/register"
            className="text-lime-400 hover:text-lime-300 font-mono font-bold text-sm underline transition-colors"
          >
            Create a New Account
          </Link>
        </div>
      </form>
    </motion.div>
  );
};

export default LoginForm;
