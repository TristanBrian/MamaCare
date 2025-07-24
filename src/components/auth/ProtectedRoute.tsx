
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string[];
  superAdminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children,
  requiredRole,
  superAdminOnly = false
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-maternal-purple" />
      </div>
    );
  }

  if (!isAuthenticated) {
    toast.error('You must be logged in to access this page');
    return <Navigate to="/login" replace />;
  }

  // Super admin check - only admin can access if superAdminOnly is true
  if (superAdminOnly && user && user.role !== 'admin') {
    toast.error('This section requires administrator privileges');
    return <Navigate to="/dashboard" replace />;
  }

  // Check for required role if specified
  if (requiredRole && user && !requiredRole.includes(user.role)) {
    toast.error('You do not have permission to access this page');
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
