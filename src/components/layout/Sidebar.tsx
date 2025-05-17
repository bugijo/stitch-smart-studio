
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { 
  Home, 
  Search, 
  Compass, 
  Heart, 
  MessagesSquare, 
  PlusSquare, 
  User,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

export default function Sidebar() {
  const location = useLocation();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/auth';
  };

  const navigationItems = [
    { name: 'Início', path: '/', icon: Home },
    { name: 'Pesquisar', path: '/search', icon: Search },
    { name: 'Explorar', path: '/patterns', icon: Compass },
    { name: 'Favoritos', path: '/favorites', icon: Heart },
    { name: 'Mensagens', path: '/messages', icon: MessagesSquare },
    { name: 'Criar', path: '/create', icon: PlusSquare },
  ];

  return (
    <div className="hidden md:flex h-screen flex-col w-64 border-r p-4 bg-background">
      <Link to="/" className="mb-8 flex items-center gap-2 px-2 py-4">
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-yarn-lavender via-yarn-sage to-yarn-terracotta flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-white"></div>
        </div>
        <span className="font-display text-lg font-bold">CrochêLab</span>
      </Link>

      <nav className="flex-1">
        <ul className="space-y-1">
          {navigationItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center gap-4 px-4 py-3 rounded-md hover:bg-accent transition-colors",
                  location.pathname === item.path && "font-semibold bg-accent"
                )}
              >
                <item.icon className="w-6 h-6" />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto pt-4 border-t">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start gap-4 px-4 py-3">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="" />
                  <AvatarFallback>
                    {user.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span>Perfil</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/profile" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Meu Perfil
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button asChild className="w-full">
            <Link to="/auth">Entrar</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
