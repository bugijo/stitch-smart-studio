import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, Send, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export default function Community() {
  const { toast } = useToast();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("trending");

  useEffect(() => {
    // Aqui seria feita a busca dos posts da comunidade
    // Utilizando dados simulados para demonstração
    setTimeout(() => {
      setPosts([
        {
          id: 1,
          user: {
            name: 'Maria Silva',
            avatar: '',
            username: 'mariacroche'
          },
          title: 'Meu primeiro amigurumi!',
          description: 'Depois de muitas tentativas, consegui fazer esse ursinho para minha sobrinha. Utilizei a técnica X e Y.',
          image: 'https://images.unsplash.com/photo-1566454825481-9c931ab01065',
          likes: 89,
          comments: 12,
          tags: ['amigurumi', 'urso', 'iniciante'],
          date: '2023-12-10T15:32:00Z'
        },
        {
          id: 2,
          user: {
            name: 'Carlos Mendes',
            avatar: '',
            username: 'carlosartesanato'
          },
          title: 'Bolsa de praia em macramê',
          description: 'Desenvolvi essa bolsa com cordas de algodão. Perfeita para o verão! Aceitando encomendas.',
          image: 'https://images.unsplash.com/photo-1528312635006-8ea0bc49ec63',
          likes: 154,
          comments: 28,
          tags: ['macramê', 'bolsa', 'verão', 'intermediário'],
          date: '2023-12-05T09:15:00Z'
        },
        {
          id: 3,
          user: {
            name: 'Ana Ferreira',
            avatar: '',
            username: 'anacrocheart'
          },
          title: 'Cobertor em squares coloridos',
          description: 'Projeto de 3 meses finalizado! Utilizei restos de lã e criei esse cobertor em squares joinados.',
          image: 'https://images.unsplash.com/photo-1551740132-49fadd215272',
          likes: 223,
          comments: 45,
          tags: ['cobertor', 'squares', 'colorido', 'avançado'],
          date: '2023-12-01T14:20:00Z'
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  const handleLike = (postId) => {
    toast({
      title: "Curtido!",
      description: "Você curtiu este projeto.",
    });
    // Aqui seria a lógica para curtir um post
  };

  const handleComment = (postId) => {
    // Aqui seria a lógica para abrir os comentários
    toast({
      title: "Comentários",
      description: "Funcionalidade de comentários em desenvolvimento.",
    });
  };

  return (
    <Layout>
      <div className="container max-w-4xl px-4 py-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Comunidade</h1>
          <p className="text-muted-foreground">
            Compartilhe seus projetos ou encontre inspiração nas criações da comunidade
          </p>
        </header>

        <div className="flex items-center justify-between mb-6">
          <Tabs defaultValue="trending" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="trending">Em alta</TabsTrigger>
              <TabsTrigger value="recent">Recentes</TabsTrigger>
              <TabsTrigger value="following">Seguindo</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Button className="ml-4">Compartilhar Projeto</Button>
        </div>

        <div className="space-y-6">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <p>Carregando projetos da comunidade...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <User className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhum projeto encontrado</h3>
              <p className="text-muted-foreground">
                {activeTab === "following" ? "Siga mais pessoas para ver seus projetos aqui." : "Seja o primeiro a compartilhar um projeto!"}
              </p>
            </div>
          ) : (
            posts.map(post => (
              <Card key={post.id} className="overflow-hidden">
                <CardHeader className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                      <AvatarImage src={post.user.avatar} />
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{post.user.name}</h3>
                      <p className="text-sm text-muted-foreground">@{post.user.username}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full aspect-square object-cover"
                  />
                </CardContent>
                <CardFooter className="flex flex-col items-start p-4">
                  <div className="flex items-center justify-between w-full mb-2">
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => handleLike(post.id)}
                        className="flex items-center gap-1"
                      >
                        <Heart className="h-6 w-6" />
                        <span>{post.likes}</span>
                      </button>
                      <button 
                        onClick={() => handleComment(post.id)}
                        className="flex items-center gap-1"
                      >
                        <MessageCircle className="h-6 w-6" />
                        <span>{post.comments}</span>
                      </button>
                      <Send className="h-6 w-6" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(post.date)}
                    </span>
                  </div>
                  
                  <h4 className="font-semibold text-lg mb-1">{post.title}</h4>
                  <p className="mb-2">{post.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    {post.tags.map(tag => (
                      <Badge key={tag} variant="outline">#{tag}</Badge>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}
