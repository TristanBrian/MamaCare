
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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

// Define the form schema
const baseSchema = {
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
  address: z.string().min(5, {
    message: 'Address must be at least 5 characters.',
  }),
  bio: z.string().optional(),
  licenseNumber: z.string().min(3, {
    message: 'License number is required.',
  }),
};

const doctorSchema = z.object({
  ...baseSchema,
  specialization: z.string().min(1, {
    message: "Specialization is required for doctors",
  }),
  hospitalName: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const hospitalSchema = z.object({
  ...baseSchema,
  hospitalName: z.string().min(1, {
    message: "Hospital name is required",
  }),
  specialization: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ProviderType = 'doctor' | 'hospital';

interface ProviderRegisterProps {
  providerType: ProviderType;
  onRegister: (data: any) => Promise<void>;
}

const ProviderRegister: React.FC<ProviderRegisterProps> = ({ 
  providerType = 'doctor',
  onRegister 
}) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // Choose the right schema based on provider type
  const formSchema = providerType === 'doctor' ? doctorSchema : hospitalSchema;
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      address: '',
      bio: '',
      licenseNumber: '',
      specialization: providerType === 'doctor' ? '' : undefined,
      hospitalName: providerType === 'hospital' ? '' : undefined,
    },
  });

  // Update form when provider type changes
  useEffect(() => {
    form.reset({
      ...form.getValues(),
      specialization: providerType === 'doctor' ? form.getValues().specialization || '' : undefined,
      hospitalName: providerType === 'hospital' ? form.getValues().hospitalName || '' : undefined,
    });
  }, [providerType, form]);

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
    <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 gradient-heading text-center">
        {providerType === 'doctor' 
          ? (language === 'en' ? 'Healthcare Provider Registration' : 'Usajili wa Mtoa Huduma')
          : (language === 'en' ? 'Hospital/Clinic Registration' : 'Usajili wa Hospitali/Kliniki')
        }
      </h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {providerType === 'doctor' 
                      ? (language === 'en' ? 'Full Name' : 'Jina Kamili')
                      : (language === 'en' ? 'Contact Person' : 'Mtu wa Mawasiliano')}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {providerType === 'hospital' && (
              <FormField
                control={form.control}
                name="hospitalName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{language === 'en' ? 'Hospital/Clinic Name' : 'Jina la Hospitali/Kliniki'}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            {providerType === 'doctor' && (
              <FormField
                control={form.control}
                name="specialization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{language === 'en' ? 'Specialization' : 'Utaalamu'}</FormLabel>
                    <FormControl>
                      <Input placeholder={language === 'en' ? 'e.g., Obstetrician, Midwife' : 'mfano, Mkunga, Daktari wa Uzazi'} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{language === 'en' ? 'Email' : 'Barua pepe'}</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
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
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="licenseNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {providerType === 'doctor' 
                      ? (language === 'en' ? 'License Number' : 'Namba ya Leseni') 
                      : (language === 'en' ? 'Registration Number' : 'Namba ya Usajili')}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{language === 'en' ? 'Address' : 'Anwani'}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {providerType === 'doctor' 
                    ? (language === 'en' ? 'Professional Bio' : 'Wasifu wa Kitaaluma')
                    : (language === 'en' ? 'Facility Description' : 'Maelezo ya Kituo')}
                </FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder={
                      providerType === 'doctor'
                        ? (language === 'en' ? 'Brief description of your experience and specialties' : 'Maelezo mafupi ya uzoefu na utaalamu wako')
                        : (language === 'en' ? 'Description of your facility and services offered' : 'Maelezo ya kituo chako na huduma zinazotolewa')
                    }
                    className="resize-none min-h-[100px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{language === 'en' ? 'Password' : 'Nenosiri'}</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
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
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="border-t pt-6">
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
                language === 'en' 
                  ? `Register as ${providerType === 'doctor' ? 'Provider' : 'Hospital'}` 
                  : `Jisajili kama ${providerType === 'doctor' ? 'Mtoa Huduma' : 'Hospitali'}`
              )}
            </Button>
          </div>
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

export default ProviderRegister;
