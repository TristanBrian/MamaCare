
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

// Define user types
export type UserRole = 'admin' | 'hospital' | 'doctor' | 'patient';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  profileData?: any; // Additional profile data based on role
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any, role: UserRole) => Promise<void>;
  logout: () => void;
  updateUserProfile: (data: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check for saved auth state on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('maternal_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('maternal_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call to authenticate
      // For now, we'll use mock data for demonstration
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock users for demonstration
      const mockUsers = [
        {
          id: '1',
          email: 'admin@example.com',
          password: 'password123',
          fullName: 'Admin User',
          role: 'admin' as UserRole
        },
        {
          id: '2',
          email: 'hospital@example.com',
          password: 'password123',
          fullName: 'Nairobi Hospital',
          role: 'hospital' as UserRole
        },
        {
          id: '3',
          email: 'doctor@example.com',
          password: 'password123',
          fullName: 'Dr. Jane Doe',
          role: 'doctor' as UserRole
        },
        {
          id: '4',
          email: 'patient@example.com',
          password: 'password123',
          fullName: 'Sarah Smith',
          role: 'patient' as UserRole
        }
      ];
      
      const foundUser = mockUsers.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        // Remove password from user object
        const { password, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem('maternal_user', JSON.stringify(userWithoutPassword));
        toast.success('Login successful');
      } else {
        toast.error('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: any, role: UserRole) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call to register the user
      // For now, we'll simulate a successful registration
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a new user
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 15),
        email: userData.email,
        fullName: userData.fullName || userData.hospitalName || '',
        role: role,
        profileData: userData
      };
      
      setUser(newUser);
      localStorage.setItem('maternal_user', JSON.stringify(newUser));
      toast.success('Registration successful');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('maternal_user');
    toast.success('Logged out successfully');
  };

  const updateUserProfile = async (data: any) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call to update user profile
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (user) {
        const updatedUser = {
          ...user,
          ...data,
          profileData: {
            ...user.profileData,
            ...data
          }
        };
        
        setUser(updatedUser);
        localStorage.setItem('maternal_user', JSON.stringify(updatedUser));
        toast.success('Profile updated successfully');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error('Profile update failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout,
      updateUserProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};
