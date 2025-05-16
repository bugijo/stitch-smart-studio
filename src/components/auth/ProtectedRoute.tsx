
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  // Se estiver carregando, mostra um indicador de carregamento
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="yarn-loader"></div>
      </div>
    );
  }

  // Se não estiver autenticado, redireciona para a página de login
  if (!user) {
    return <Navigate to="/auth" />;
  }

  // Se estiver autenticado, renderiza o conteúdo da rota
  return <>{children}</>;
}
