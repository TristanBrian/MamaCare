
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: 'Full name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  phone: z.string().min(10, {
    message: 'Phone number must be at least 10 digits.',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

interface UserRegisterProps {
  onRegister: (data: z.infer<typeof formSchema>) => Promise<void>;
}

const UserRegister: React.FC<UserRegisterProps> = ({ onRegister }) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      await onRegister(values);
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 gradient-heading text-center">
        {language === 'en' ? 'Create Patient Account' : 'Tengeneza Akaunti ya Mgonjwa'}
      </h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{language === 'en' ? 'Full Name' : 'Jina Kamili'}</FormLabel>
                <FormControl>
                  <Input placeholder={language === 'en' ? 'Enter your full name' : 'Ingiza jina lako kamili'} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{language === 'en' ? 'Email' : 'Barua pepe'}</FormLabel>
                <FormControl>
                  <Input type="email" placeholder={language === 'en' ? 'Enter your email' : 'Ingiza barua pepe yako'} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{language === 'en' ? 'Phone Number' : 'Namba ya Simu'}</FormLabel>
                <FormControl>
                  <Input placeholder={language === 'en' ? 'Enter your phone number' : 'Ingiza namba yako ya simu'} {...field} />
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
                <FormLabel>{language === 'en' ? 'Password' : 'Nenosiri'}</FormLabel>
                <FormControl>
                  <Input type="password" placeholder={language === 'en' ? 'Create a password' : 'Tengeneza nenosiri'} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{language === 'en' ? 'Confirm Password' : 'Thibitisha Nenosiri'}</FormLabel>
                <FormControl>
                  <Input type="password" placeholder={language === 'en' ? 'Confirm your password' : 'Thibitisha nenosiri lako'} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full bg-maternal-purple hover:bg-maternal-purple-dark"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {language === 'en' ? 'Registering...' : 'Inasajili...'}
              </>
            ) : (
              language === 'en' ? 'Register' : 'Jisajili'
            )}
          </Button>
        </form>
      </Form>
      
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          {language === 'en' ? 'Already have an account?' : 'Tayari una akaunti?'}{' '}
          <a href="/login" className="text-maternal-purple hover:underline">
            {language === 'en' ? 'Sign in' : 'Ingia'}
          </a>
        </p>
      </div>
    </div>
  );
};

export default UserRegister;
