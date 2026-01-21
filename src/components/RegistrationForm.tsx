import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import IDRevealModal from './IDRevealModal';

interface RegistrationFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  college: string;
}

const RegistrationForm = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm<RegistrationFormData>();
  const { toast } = useToast();
  const [showIDModal, setShowIDModal] = useState(false);
  const [generatedID, setGeneratedID] = useState<string | null>(null);
  const password = watch('password');

  const onSubmit = async (data: RegistrationFormData) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        toast({
          title: 'Registration Failed',
          description: result.error || 'An error occurred during registration',
          variant: 'destructive',
        });
        return;
      }

      setGeneratedID(result.aarunyaId);
      setShowIDModal(true);

      toast({
        title: 'Registration Successful!',
        description: 'Your Aarunya-ID has been generated',
      });
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: 'Error',
        description: 'Failed to register. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const inputClasses = 'retro-input bg-black border-2 border-lime-500 text-lime-400 font-mono placeholder-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-offset-2 focus:ring-offset-black';
  const labelClasses = 'text-lime-400 font-mono text-sm font-bold';
  const errorClasses = 'text-red-400 font-mono text-xs mt-1';

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mx-auto"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Form Title */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-display text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-cyan-400 mb-2">
              NEW GAME
            </h2>
            <p className="text-lime-400 font-mono text-sm">Initialize Your Aarunya Account</p>
          </div>

          {/* Full Name */}
          <div className="form-group">
            <Label htmlFor="fullName" className={labelClasses}>
              PLAYER NAME
            </Label>
            <Input
              id="fullName"
              {...register('fullName', {
                required: 'Full name is required',
                minLength: { value: 2, message: 'Name must be at least 2 characters' },
              })}
              placeholder="> Enter your full name"
              className={inputClasses}
            />
            {errors.fullName && <p className={errorClasses}>{errors.fullName.message}</p>}
          </div>

          {/* Email */}
          <div className="form-group">
            <Label htmlFor="email" className={labelClasses}>
              CONTACT TERMINAL
            </Label>
            <Input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              placeholder="> Enter your email"
              className={inputClasses}
            />
            {errors.email && <p className={errorClasses}>{errors.email.message}</p>}
          </div>

          {/* College */}
          <div className="form-group">
            <Label htmlFor="college" className={labelClasses}>
              PLAYER FACTION
            </Label>
            <Input
              id="college"
              {...register('college', {
                required: 'College is required',
              })}
              placeholder="> Enter your college"
              className={inputClasses}
            />
            {errors.college && <p className={errorClasses}>{errors.college.message}</p>}
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
                minLength: { value: 8, message: 'Password must be at least 8 characters' },
                pattern: {
                  value: /[A-Z]/,
                  message: 'Password must contain an uppercase letter',
                },
              })}
              placeholder="> Enter password"
              className={inputClasses}
            />
            {errors.password && <p className={errorClasses}>{errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <Label htmlFor="confirmPassword" className={labelClasses}>
              VERIFY CODE
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) => value === password || 'Passwords do not match',
              })}
              placeholder="> Confirm password"
              className={inputClasses}
            />
            {errors.confirmPassword && <p className={errorClasses}>{errors.confirmPassword.message}</p>}
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isSubmitting}
            type="submit"
            className="w-full mt-6 py-3 px-4 bg-gradient-to-b from-lime-400 to-lime-600 text-black font-bold font-mono text-lg rounded-lg border-4 border-lime-300 shadow-lg hover:shadow-xl hover:shadow-lime-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              textShadow: '2px 2px 0px rgba(0,0,0,0.3)',
              boxShadow: '0 8px 0 rgba(0,0,0,0.3), 0 0 20px rgba(132,204,22,0.5)',
            }}
          >
            {isSubmitting ? 'INITIALIZING...' : '> INSERT COIN'}
          </motion.button>
        </form>
      </motion.div>

      {/* ID Reveal Modal */}
      {showIDModal && generatedID && (
        <IDRevealModal
          aarunyaId={generatedID}
          onClose={() => setShowIDModal(false)}
        />
      )}
    </>
  );
};

export default RegistrationForm;
