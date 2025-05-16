
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, Menu, User, Heart, LogIn } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const isMobile = useIsMobile();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleAuthClick = () => {
    if (user) {
      logout();
    } else {
      navigate('/auth');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px]">
                <div className="flex flex-col gap-4 mt-8">
                  <Link to="/" className="text-lg font-display font-medium px-2">Início</Link>
                  <Link to="/patterns" className="text-lg font-display font-medium px-2">Catálogo</Link>
                  <Link to="/import" className="text-lg font-display font-medium px-2">Importar PDF</Link>
                  <Link to="/my-projects" className="text-lg font-display font-medium px-2">Meus Projetos</Link>
                  {!user && <Link to="/auth" className="text-lg font-display font-medium px-2">Entrar / Cadastrar</Link>}
                </div>
              </SheetContent>
            </Sheet>
          )}
          
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yarn-lavender via-yarn-sage to-yarn-terracotta flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-white"></div>
            </div>
            <span className="font-display text-xl font-bold">CrochêLab</span>
          </Link>
        </div>
        
        {!isMobile && (
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link to="/" className="font-medium transition-colors hover:text-primary">Início</Link>
            <Link to="/patterns" className="font-medium transition-colors hover:text-primary">Catálogo</Link>
            <Link to="/import" className="font-medium transition-colors hover:text-primary">Importar PDF</Link>
            <Link to="/my-projects" className="font-medium transition-colors hover:text-primary">Meus Projetos</Link>
          </nav>
        )}
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
            <span className="sr-only">Pesquisar</span>
          </Button>
          <Button variant="ghost" size="icon">
            <Heart className="h-5 w-5" />
            <span className="sr-only">Favoritos</span>
          </Button>
          <Button 
            variant={user ? "outline" : "ghost"} 
            size="icon" 
            className={user ? "rounded-full" : ""}
            onClick={handleAuthClick}
          >
            {user ? (
              <User className="h-5 w-5" />
            ) : (
              <LogIn className="h-5 w-5" />
            )}
            <span className="sr-only">{user ? "Perfil" : "Entrar"}</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
