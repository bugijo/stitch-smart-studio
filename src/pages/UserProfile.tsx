
import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Heart, MessageCircle, Edit, Settings, ShoppingBag, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function UserProfile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // Simulando dados do perfil - em um app real, buscaríamos esses dados do backend
    setDisplayName(user?.email?.split('@')[0] || 'Usuário');
    setBio('Amante de artesanato e criação manual. Adoro compartilhar minhas criações e aprender técnicas novas.');
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulação de atualização de perfil
    setTimeout(() => {
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram salvas com sucesso.",
      });
      setIsLoading(false);
    }, 1000);
  };

  // Dados simulados de projetos, produtos e favoritos
  const userProjects = [
    {
      id: 1,
      title: "Bolsa de crochê verão",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
      likes: 42,
      comments: 5
    },
    {
      id: 2,
      title: "Amigurumi de urso",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
      likes: 28,
      comments: 3
    },
  ];
  
  const userProducts = [
    {
      id: 1,
      title: "Apostila de Macramê Básico",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
      price: 19.9,
      sales: 24,
    },
    {
      id: 2,
      title: "Curso de Amigurumi para Iniciantes",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      price: 49.9,
      sales: 12,
    },
  ];
  
  const favoriteProjects = [
    {
      id: 3,
      title: "Xale de tricô com detalhes",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
      author: "Ana Silva",
      likes: 67
    },
    {
      id: 4,
      title: "Bordado floral em bastidor",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
      author: "Carlos Mendes",
      likes: 83
    },
  ];
  
  const favoriteTutorials = [
    {
      id: 1,
      title: "Como fazer amigurumi passo a passo",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
      type: "vídeo",
      duration: "28min"
    },
    {
      id: 2,
      title: "Técnicas avançadas de macramê",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      type: "pdf",
      pages: "15"
    },
  ];

  return (
    <Layout>
      <div className="container py-8">
        <div className="grid gap-6 md:grid-cols-[300px_1fr]">
          {/* Sidebar / Profile Card */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Avatar className="h-32 w-32 mx-auto">
                  <AvatarFallback className="text-3xl">
                    {displayName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold mt-4">{displayName}</h2>
                <p className="text-muted-foreground text-sm mt-1">
                  {user?.email}
                </p>
                <div className="flex justify-center gap-4 mt-4">
                  <div className="text-center">
                    <div className="font-bold">24</div>
                    <div className="text-xs text-muted-foreground">Seguindo</div>
                  </div>
                  <Separator orientation="vertical" className="h-10" />
                  <div className="text-center">
                    <div className="font-bold">142</div>
                    <div className="text-xs text-muted-foreground">Seguidores</div>
                  </div>
                  <Separator orientation="vertical" className="h-10" />
                  <div className="text-center">
                    <div className="font-bold">38</div>
                    <div className="text-xs text-muted-foreground">Projetos</div>
                  </div>
                </div>
                <div className="mt-6">
                  <Button variant="outline" className="w-full">
                    Editar Perfil
                  </Button>
                </div>
              </CardContent>
              <Separator />
              <CardContent className="p-6">
                <div className="text-sm text-muted-foreground">
                  <p>{bio}</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="secondary">Crochê</Badge>
                  <Badge variant="secondary">Amigurumi</Badge>
                  <Badge variant="secondary">Macramê</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <h3 className="font-medium">Links rápidos</h3>
              </CardHeader>
              <CardContent className="grid gap-2">
                <Button variant="ghost" className="justify-start" asChild>
                  <Link to="/configuracoes">
                    <Settings className="mr-2 h-4 w-4" />
                    Configurações
                  </Link>
                </Button>
                <Button variant="ghost" className="justify-start" asChild>
                  <Link to="/compras">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Minhas Compras
                  </Link>
                </Button>
                <Button variant="ghost" className="justify-start" asChild>
                  <Link to="/vendas">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Minhas Vendas
                  </Link>
                </Button>
                <Button variant="ghost" className="justify-start" asChild>
                  <Link to="/mensagens">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Mensagens
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            <Tabs defaultValue="projects">
              <TabsList className="grid grid-cols-4">
                <TabsTrigger value="projects">Meus Projetos</TabsTrigger>
                <TabsTrigger value="store">Minha Loja</TabsTrigger>
                <TabsTrigger value="favorites">Favoritos</TabsTrigger>
                <TabsTrigger value="account">Conta</TabsTrigger>
              </TabsList>
              
              {/* Projects Tab */}
              <TabsContent value="projects" className="pt-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium">Meus Projetos</h3>
                  <Button asChild>
                    <Link to="/projeto/novo">
                      Novo Projeto
                    </Link>
                  </Button>
                </div>
                
                {userProjects.length > 0 ? (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {userProjects.map(project => (
                      <Card key={project.id} className="overflow-hidden">
                        <div className="aspect-square relative">
                          <img 
                            src={project.image} 
                            alt={project.title}
                            className="object-cover w-full h-full"
                          />
                          <Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-black/20 hover:bg-black/40 text-white rounded-full">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                        <CardContent className="p-4">
                          <h4 className="font-medium line-clamp-1">{project.title}</h4>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center">
                                <Heart className="h-4 w-4 mr-1" />
                                <span className="text-sm">{project.likes}</span>
                              </div>
                              <div className="flex items-center">
                                <MessageCircle className="h-4 w-4 mr-1" />
                                <span className="text-sm">{project.comments}</span>
                              </div>
                            </div>
                            <Badge>Publicado</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="p-8 text-center">
                    <div className="mb-4 text-muted-foreground">
                      <BookOpen className="h-12 w-12 mx-auto mb-4" />
                      <h3 className="text-lg font-medium">Nenhum projeto publicado</h3>
                      <p className="mt-2">Compartilhe seus projetos de artesanato com a comunidade</p>
                    </div>
                    <Button asChild>
                      <Link to="/projeto/novo">
                        Publicar meu primeiro projeto
                      </Link>
                    </Button>
                  </Card>
                )}
              </TabsContent>
              
              {/* Store Tab */}
              <TabsContent value="store" className="pt-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium">Meus Produtos</h3>
                  <Button asChild>
                    <Link to="/mercado/produto/novo">
                      Novo Produto
                    </Link>
                  </Button>
                </div>
                
                {userProducts.length > 0 ? (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {userProducts.map(product => (
                      <Card key={product.id} className="overflow-hidden">
                        <div className="aspect-[4/3] relative">
                          <img 
                            src={product.image} 
                            alt={product.title}
                            className="object-cover w-full h-full"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white px-4 py-2">
                            <div className="font-bold">{product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
                          </div>
                          <Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-black/20 hover:bg-black/40 text-white rounded-full">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                        <CardContent className="p-4">
                          <h4 className="font-medium line-clamp-1">{product.title}</h4>
                          <div className="flex items-center justify-between mt-2">
                            <div className="text-sm text-muted-foreground">
                              {product.sales} vendas
                            </div>
                            <Badge variant="secondary">À venda</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="p-8 text-center">
                    <div className="mb-4 text-muted-foreground">
                      <ShoppingBag className="h-12 w-12 mx-auto mb-4" />
                      <h3 className="text-lg font-medium">Nenhum produto à venda</h3>
                      <p className="mt-2">Comece a vender seus produtos digitais para a comunidade</p>
                    </div>
                    <Button asChild>
                      <Link to="/mercado/produto/novo">
                        Criar meu primeiro produto
                      </Link>
                    </Button>
                  </Card>
                )}
              </TabsContent>
              
              {/* Favorites Tab */}
              <TabsContent value="favorites" className="pt-6">
                <Tabs defaultValue="projects-fav">
                  <TabsList>
                    <TabsTrigger value="projects-fav">Projetos</TabsTrigger>
                    <TabsTrigger value="tutorials-fav">Tutoriais</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="projects-fav" className="pt-6">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {favoriteProjects.map(project => (
                        <Card key={project.id} className="overflow-hidden">
                          <div className="aspect-square relative">
                            <img 
                              src={project.image} 
                              alt={project.title}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <CardContent className="p-4">
                            <h4 className="font-medium line-clamp-1">{project.title}</h4>
                            <p className="text-sm text-muted-foreground">por {project.author}</p>
                            <div className="flex items-center mt-2">
                              <Heart className="h-4 w-4 fill-primary text-primary mr-1" />
                              <span className="text-sm">{project.likes}</span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="tutorials-fav" className="pt-6">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {favoriteTutorials.map(tutorial => (
                        <Card key={tutorial.id} className="overflow-hidden">
                          <div className="aspect-video relative">
                            <img 
                              src={tutorial.image} 
                              alt={tutorial.title}
                              className="object-cover w-full h-full"
                            />
                            <Badge className="absolute top-2 right-2 bg-black/60 border-none">
                              {tutorial.type === 'vídeo' ? tutorial.duration : `${tutorial.pages} págs.`}
                            </Badge>
                            {tutorial.type === 'vídeo' && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center">
                                  <div className="w-0 h-0 border-y-8 border-y-transparent border-l-12 border-l-primary ml-1"></div>
                                </div>
                              </div>
                            )}
                          </div>
                          <CardContent className="p-4">
                            <h4 className="font-medium line-clamp-1">{tutorial.title}</h4>
                            <Badge variant="outline" className="mt-2 capitalize">
                              {tutorial.type}
                            </Badge>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </TabsContent>
              
              {/* Account Tab */}
              <TabsContent value="account" className="pt-6">
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-medium">Informações da Conta</h3>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleUpdateProfile} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="displayName">Nome de exibição</Label>
                        <Input
                          id="displayName"
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          value={user?.email || ''}
                          disabled
                        />
                        <p className="text-xs text-muted-foreground">
                          O email não pode ser alterado
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Biografia</Label>
                        <Textarea
                          id="bio"
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          rows={4}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button type="submit" disabled={isLoading}>
                          {isLoading ? "Salvando..." : "Salvar Alterações"}
                        </Button>
                        <Button type="button" variant="outline">
                          Cancelar
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
}
