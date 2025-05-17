
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/AuthContext';
import { Link, Navigate } from 'react-router-dom';
import { BookOpen, Users, ShoppingBag, ArrowRight, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export default function Register() {
  const { user, signIn, signUp } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  // Redirecionar se já estiver logado
  if (user) {
    return <Navigate to="/" />;
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await signIn({ email, password });
      toast({
        title: "Bem-vindo(a) de volta!",
        description: "Login realizado com sucesso.",
      });
    } catch (error: any) {
      console.error('Erro ao fazer login:', error);
      toast({
        variant: "destructive",
        title: "Erro ao fazer login",
        description: error.message || "Verifique seu email e senha e tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!name) {
      toast({
        variant: "destructive",
        title: "Nome é obrigatório",
        description: "Por favor, informe seu nome para criar uma conta.",
      });
      setIsLoading(false);
      return;
    }
    
    try {
      await signUp({ 
        email, 
        password,
        options: {
          data: {
            name: name,
          },
        },
      });
      toast({
        title: "Conta criada com sucesso!",
        description: "Bem-vindo(a) à nossa plataforma de artesanato.",
      });
    } catch (error: any) {
      console.error('Erro ao criar conta:', error);
      toast({
        variant: "destructive",
        title: "Erro ao criar conta",
        description: error.message || "Não foi possível criar sua conta. Tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <div className="container flex-1 flex flex-col md:flex-row items-center justify-center py-8 md:py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 text-2xl font-bold font-display">
              Artesanato<span className="text-primary">Lab</span>
            </Link>
            <p className="text-muted-foreground mt-2">
              Sua plataforma para aprender, compartilhar e vender artesanato
            </p>
          </div>
          
          <Card className="w-full">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-display text-center">Criar conta ou entrar</CardTitle>
              <CardDescription className="text-center">
                Entre para acessar todos os recursos da plataforma
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Entrar</TabsTrigger>
                  <TabsTrigger value="register">Cadastre-se</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login">
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        placeholder="seu-email@exemplo.com" 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Senha</Label>
                        <Link to="/recuperar-senha" className="text-xs text-muted-foreground hover:text-primary">
                          Esqueceu sua senha?
                        </Link>
                      </div>
                      <Input 
                        id="password" 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Entrando..." : "Entrar"}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="register">
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome</Label>
                      <Input 
                        id="name" 
                        placeholder="Seu nome completo" 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input 
                        id="signup-email" 
                        placeholder="seu-email@exemplo.com" 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Senha</Label>
                      <Input 
                        id="signup-password" 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        A senha deve ter pelo menos 6 caracteres
                      </p>
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Cadastrando..." : "Criar Conta"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
              
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                      Ou continue com
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <Button variant="outline" type="button" disabled>
                    Google
                  </Button>
                  <Button variant="outline" type="button" disabled>
                    Facebook
                  </Button>
                </div>
                
                <p className="text-center text-xs text-muted-foreground mt-6">
                  Ao criar uma conta, você concorda com nossos{" "}
                  <Link to="/termos" className="underline hover:text-primary">Termos de Serviço</Link>
                  {" "}e{" "}
                  <Link to="/privacidade" className="underline hover:text-primary">Política de Privacidade</Link>.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="hidden md:block w-full max-w-md pl-12">
          <h2 className="text-2xl font-bold mb-6 font-display">Por que se cadastrar?</h2>
          
          <div className="space-y-6">
            <div className="flex gap-3">
              <div className="mt-1 bg-primary/10 p-2 rounded-full">
                <Check className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Aprenda em seu ritmo</h3>
                <p className="text-sm text-muted-foreground">
                  Acesse tutoriais gratuitos e premium para todos os níveis de habilidade
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="mt-1 bg-secondary/10 p-2 rounded-full">
                <Check className="h-4 w-4 text-secondary" />
              </div>
              <div>
                <h3 className="font-medium">Compartilhe seus projetos</h3>
                <p className="text-sm text-muted-foreground">
                  Mostre suas criações, receba feedback e conecte-se com outros artesãos
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="mt-1 bg-accent/10 p-2 rounded-full">
                <Check className="h-4 w-4 text-accent-foreground" />
              </div>
              <div>
                <h3 className="font-medium">Venda seus conhecimentos</h3>
                <p className="text-sm text-muted-foreground">
                  Transforme sua paixão em renda vendendo tutoriais, padrões e cursos
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 space-y-4">
            <h3 className="font-medium">Comece agora a explorar:</h3>
            
            <div className="grid grid-cols-3 gap-3">
              <Button variant="outline" className="justify-start" asChild>
                <Link to="/aprenda">
                  <BookOpen className="h-4 w-4 mr-2" /> Aprenda
                </Link>
              </Button>
              <Button variant="outline" className="justify-start" asChild>
                <Link to="/comunidade">
                  <Users className="h-4 w-4 mr-2" /> Comunidade
                </Link>
              </Button>
              <Button variant="outline" className="justify-start" asChild>
                <Link to="/mercado">
                  <ShoppingBag className="h-4 w-4 mr-2" /> Mercado
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
