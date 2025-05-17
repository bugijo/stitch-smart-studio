
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Users, ShoppingBag, User, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function MobileNavigation() {
  const location = useLocation();
  const { user } = useAuth();
  
  const navigationItems = [
    { name: 'Início', path: '/home', icon: Home },
    { name: 'Modelos', path: '/models', icon: BookOpen },
    { name: 'Explorar', path: '/search', icon: Search },
    { name: 'Comunidade', path: '/comunidade', icon: Users },
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
            <item.icon className="w-5 h-5" />
            <span className="text-xs mt-1">{item.name}</span>
          </Link>
        ))}
        
        <Link
          to="/perfil"
          className={cn(
            "flex flex-col items-center py-3 px-4",
            location.pathname === '/perfil' ? "text-primary" : "text-muted-foreground"
          )}
        >
          {user ? (
            <Avatar className="h-5 w-5">
              <AvatarImage src="" />
              <AvatarFallback>
                {user.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          ) : (
            <User className="w-5 h-5" />
          )}
          <span className="text-xs mt-1">Perfil</span>
        </Link>
      </div>
    </div>
  );
}
