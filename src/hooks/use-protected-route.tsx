
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export function useProtectedRoute() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      toast.error('Você precisa estar logado para acessar esta página');
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  return { user, isLoading };
}
