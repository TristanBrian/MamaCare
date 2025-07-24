
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { Loader2, Lock, User, SmartphoneIcon, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(1, {
    message: 'Password is required.',
  }),
});

const Login = () => {
  const { language } = useLanguage();
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [showPassword, setShowPassword] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await login(values.email, values.password);
      toast.success(language === 'en' ? 'Login successful!' : 'Umefanikiwa kuingia!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      toast.error(language === 'en' ? 'Login failed. Please check your credentials.' : 'Imeshindwa kuingia. Tafadhali angalia taarifa zako.');
    }
  }

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className={`w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden ${isMobile ? 'p-4' : 'p-6'}`}>
      <div className="flex justify-center mb-6">
        <div className="h-16 w-16 bg-maternal-purple-light rounded-full flex items-center justify-center">
          <Lock className="h-8 w-8 text-maternal-purple" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-6 gradient-heading text-center">
        {language === 'en' ? 'Sign In' : 'Ingia'}
      </h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {language === 'en' ? 'Email' : 'Barua pepe'}
                </FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder={language === 'en' ? 'Enter your email' : 'Ingiza barua pepe yako'} 
                    {...field} 
                    autoComplete="email"
                    className="bg-gray-50"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  {language === 'en' ? 'Password' : 'Nenosiri'}
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input 
                      type={showPassword ? "text" : "password"} 
                      placeholder={language === 'en' ? 'Enter your password' : 'Ingiza nenosiri lako'} 
                      {...field} 
                      autoComplete="current-password"
                      className="bg-gray-50 pr-10"
                    />
                    <button 
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      onClick={togglePasswordVisibility}
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-maternal-purple focus:ring-maternal-purple"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                {language === 'en' ? 'Remember me' : 'Nikumbuke'}
              </label>
            </div>
            
            <div className="text-sm">
              <a href="#" className="text-maternal-purple hover:underline font-medium">
                {language === 'en' ? 'Forgot password?' : 'Umesahau nenosiri?'}
              </a>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-maternal-purple hover:bg-maternal-purple-dark transition-all"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {language === 'en' ? 'Signing in...' : 'Inaingia...'}
              </>
            ) : (
              language === 'en' ? 'Sign In' : 'Ingia'
            )}
          </Button>
        </form>
      </Form>
      
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">
              {language === 'en' ? 'Or continue with' : 'Au endelea na'}
            </span>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button variant="outline" className="w-full">
            Google
          </Button>
          <Button variant="outline" className="w-full">
            Facebook
          </Button>
        </div>
      </div>
      
      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          {language === 'en' ? "Don't have an account?" : 'Huna akaunti?'}{' '}
          <a href="/register" className="text-maternal-purple hover:underline font-medium">
            {language === 'en' ? 'Register now' : 'Jisajili sasa'}
          </a>
        </p>
      </div>
      
      <div className="mt-8 border-t pt-4">
        <h3 className="text-xs font-medium text-gray-500 mb-2 flex items-center justify-center gap-1">
          <SmartphoneIcon className="h-3 w-3" />
          {language === 'en' ? 'Demo Accounts' : 'Akaunti za Majaribio'}:
        </h3>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
          <div>
            <p><strong>Admin:</strong> admin@example.com</p>
            <p><strong>Hospital:</strong> hospital@example.com</p>
          </div>
          <div>
            <p><strong>Doctor:</strong> doctor@example.com</p>
            <p><strong>Patient:</strong> patient@example.com</p>
          </div>
          <p className="col-span-2 mt-1 text-center text-xs text-gray-400">Password for all: password123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
