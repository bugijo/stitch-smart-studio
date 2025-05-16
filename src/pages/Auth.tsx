
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

// Schema para validação do formulário de login
const loginSchema = z.object({
  email: z.string().email('Digite um email válido'),
  password: z.string().min(6, 'A senha precisa ter pelo menos 6 caracteres'),
  rememberMe: z.boolean().optional(),
});

// Schema para validação do formulário de cadastro
const registerSchema = z.object({
  name: z.string().min(2, 'O nome precisa ter pelo menos 2 caracteres'),
  email: z.string().email('Digite um email válido'),
  password: z.string().min(6, 'A senha precisa ter pelo menos 6 caracteres'),
  confirmPassword: z.string().min(6, 'A senha precisa ter pelo menos 6 caracteres'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
});

// Tipos para os formulários
type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user, login, register } = useAuth();

  // Se o usuário já estiver autenticado, redireciona para a página inicial
  if (user) {
    return <Navigate to="/" />;
  }

  // Formulário de login
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  // Formulário de cadastro
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  // Função para lidar com o envio do formulário de login
  const onLoginSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    try {
      await login(values.email, values.password);
      // A navegação acontecerá automaticamente no useEffect se o login for bem-sucedido
    } catch (error) {
      console.error("Erro no login:", error);
      setIsLoading(false);
    }
  };

  // Função para lidar com o envio do formulário de cadastro
  const onRegisterSubmit = async (values: RegisterFormValues) => {
    setIsLoading(true);
    try {
      await register(values.name, values.email, values.password);
      // A navegação acontecerá automaticamente no useEffect se o cadastro for bem-sucedido
    } catch (error) {
      console.error("Erro no cadastro:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Card className="w-full">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yarn-lavender via-yarn-sage to-yarn-terracotta flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-white"></div>
              </div>
            </div>
            <CardTitle className="text-2xl font-display">
              {isLogin ? 'Bem-vindo de volta!' : 'Crie sua conta'}
            </CardTitle>
            <CardDescription>
              {isLogin 
                ? 'Entre com suas credenciais para acessar sua conta' 
                : 'Preencha os campos abaixo para se cadastrar'}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {isLogin ? (
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input 
                              {...field} 
                              placeholder="seu@email.com" 
                              type="email" 
                              className="pl-10"
                              disabled={isLoading}
                            />
                          </FormControl>
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Senha</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input 
                              {...field} 
                              placeholder="Sua senha" 
                              type={showPassword ? "text" : "password"} 
                              className="pl-10"
                              disabled={isLoading}
                            />
                          </FormControl>
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-10 w-10"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center space-x-2">
                    <FormField
                      control={loginForm.control}
                      name="rememberMe"
                      render={({ field }) => (
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="rememberMe"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={isLoading}
                          />
                          <label
                            htmlFor="rememberMe"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Lembrar-me
                          </label>
                        </div>
                      )}
                    />
                    <div className="flex-1 text-right">
                      <Button variant="link" className="p-0 h-auto" disabled={isLoading}>
                        Esqueceu a senha?
                      </Button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Entrando..." : "Entrar"}
                  </Button>
                </form>
              </Form>
            ) : (
              <Form {...registerForm}>
                <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                  <FormField
                    control={registerForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input 
                              {...field} 
                              placeholder="Seu nome completo" 
                              className="pl-10"
                              disabled={isLoading}
                            />
                          </FormControl>
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={registerForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input 
                              {...field} 
                              placeholder="seu@email.com" 
                              type="email" 
                              className="pl-10"
                              disabled={isLoading}
                            />
                          </FormControl>
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={registerForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Senha</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input 
                              {...field} 
                              placeholder="Sua senha" 
                              type={showPassword ? "text" : "password"} 
                              className="pl-10"
                              disabled={isLoading}
                            />
                          </FormControl>
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-10 w-10"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={registerForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirmar Senha</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input 
                              {...field} 
                              placeholder="Confirme sua senha" 
                              type={showConfirmPassword ? "text" : "password"} 
                              className="pl-10"
                              disabled={isLoading}
                            />
                          </FormControl>
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-10 w-10"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Criando conta..." : "Criar conta"}
                  </Button>
                </form>
              </Form>
            )}
          </CardContent>

          <CardFooter className="flex justify-center">
            <div className="text-center">
              {isLogin ? (
                <p className="text-sm text-muted-foreground">
                  Não tem uma conta?{' '}
                  <Button variant="link" className="p-0 h-auto" onClick={() => setIsLogin(false)} disabled={isLoading}>
                    Cadastre-se
                  </Button>
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Já tem uma conta?{' '}
                  <Button variant="link" className="p-0 h-auto" onClick={() => setIsLogin(true)} disabled={isLoading}>
                    Entrar
                  </Button>
                </p>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
