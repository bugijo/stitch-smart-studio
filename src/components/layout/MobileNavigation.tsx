
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Compass, Heart, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function MobileNavigation() {
  const location = useLocation();
  const { user } = useAuth();
  
  const navigationItems = [
    { name: 'Início', path: '/', icon: Home },
    { name: 'Pesquisar', path: '/search', icon: Search },
    { name: 'Explorar', path: '/patterns', icon: Compass },
    { name: 'Favoritos', path: '/favorites', icon: Heart },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-background z-50">
      <div className="flex items-center justify-around">
        {navigationItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={cn(
              "flex flex-col items-center py-3 px-4",
              location.pathname === item.path ? "text-primary" : "text-muted-foreground"
            )}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs">{item.name}</span>
          </Link>
        ))}
        
        <Link
          to="/profile"
          className={cn(
            "flex flex-col items-center py-3 px-4",
            location.pathname === '/profile' ? "text-primary" : "text-muted-foreground"
          )}
        >
          {user ? (
            <Avatar className="h-6 w-6">
              <AvatarImage src="" />
              <AvatarFallback>
                {user.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          ) : (
            <User className="w-6 h-6" />
          )}
          <span className="text-xs">Perfil</span>
        </Link>
      </div>
    </div>
  );
}
