
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LogOut, User, ShoppingBag, BookOpen, Users, Home } from "lucide-react";

const Header = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/auth';
  };

  return (
    <header className="bg-background border-b py-4 sticky top-0 z-50">
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Link to="/" className="font-display font-semibold text-xl">Artesanato<span className="text-primary">Lab</span></Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-muted-foreground hover:text-foreground flex items-center gap-1.5">
              <Home className="w-4 h-4" />
              <span>Início</span>
            </Link>
            <Link to="/aprenda" className="text-muted-foreground hover:text-foreground flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              <span>Aprenda</span>
            </Link>
            <Link to="/comunidade" className="text-muted-foreground hover:text-foreground flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              <span>Comunidade</span>
            </Link>
            <Link to="/mercado" className="text-muted-foreground hover:text-foreground flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4" />
              <span>Mercado</span>
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/perfil" className="flex items-center cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Meu Perfil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/favoritos" className="flex items-center cursor-pointer">
                    Favoritos
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
            <Button asChild>
              <Link to="/cadastro">Entrar / Cadastrar</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
