
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, Share2, BookmarkPlus, MoreHorizontal } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';

const projectsData = [
  {
    id: 1,
    title: "Bolsa de crochê estilo verão",
    description: "Minha primeira bolsa de praia feita de crochê usando linha de algodão e alça de madeira. Estou muito feliz com o resultado final!",
    images: ["https://images.unsplash.com/photo-1582562124811-c09040d0a901"],
    tags: ["croche", "bolsa", "verao"],
    likes: 128,
    comments: 24,
    createdAt: "2023-07-15T14:32:00Z",
    user: {
      id: "user1",
      name: "Maria Silva",
      avatar: "",
    }
  },
  {
    id: 2,
    title: "Amigurumi de urso para minha sobrinha",
    description: "Fiz esse ursinho de amigurumi para minha sobrinha que vai nascer próximo mês. Usei fio 100% algodão e enchimento antialérgico.",
    images: ["https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07"],
    tags: ["amigurumi", "urso", "bebe"],
    likes: 256,
    comments: 42,
    createdAt: "2023-07-12T09:45:00Z",
    user: {
      id: "user2",
      name: "João Costa",
      avatar: "",
    }
  },
  {
    id: 3,
    title: "Tapete de macramê para sala",
    description: "Finalizei este tapete de macramê depois de 3 semanas de trabalho. Ficou perfeito na minha sala! Cordas 5mm e base de madeira.",
    images: ["https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"],
    tags: ["macrame", "tapete", "decoracao"],
    likes: 348,
    comments: 53,
    createdAt: "2023-07-10T16:20:00Z",
    user: {
      id: "user3",
      name: "Ana Oliveira",
      avatar: "",
    }
  },
  {
    id: 4,
    title: "Bordado botânico em bastidor",
    description: "Meu projeto de bordado botânico inspirado em flores do meu jardim. Usei linha de algodão e técnicas mistas de ponto cheio e matiz.",
    images: ["https://images.unsplash.com/photo-1721322800607-8c38375eef04"],
    tags: ["bordado", "botanico", "flores"],
    likes: 189,
    comments: 32,
    createdAt: "2023-07-08T11:15:00Z",
    user: {
      id: "user4",
      name: "Carla Santos",
      avatar: "",
    }
  },
];

export default function Community() {
  const [activeTab, setActiveTab] = useState("recentes");
  const [sortBy, setSortBy] = useState("recent");
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} segundos atrás`;
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} minutos atrás`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} horas atrás`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} dias atrás`;
    
    return new Intl.DateTimeFormat('pt-BR').format(date);
  };

  const sortedProjects = [...projectsData].sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (sortBy === "popular") {
      return b.likes - a.likes;
    }
    if (sortBy === "commented") {
      return b.comments - a.comments;
    }
    return 0;
  });

  return (
    <Layout>
      <div className="container py-8 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold font-display">Comunidade</h1>
            <p className="text-muted-foreground mt-2">
              Compartilhe seus projetos e conecte-se com outros artesãos
            </p>
          </div>
          <Button className="mt-4 md:mt-0">
            Compartilhar Projeto
          </Button>
        </div>

        {/* Tabs and filters */}
        <div className="bg-card shadow-sm border rounded-lg p-4 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <Tabs defaultValue="recentes" className="w-full sm:w-auto" onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="recentes">Recentes</TabsTrigger>
                <TabsTrigger value="seguindo">Seguindo</TabsTrigger>
                <TabsTrigger value="populares">Populares</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex gap-2 w-full sm:w-auto">
              <Input placeholder="Pesquisar projetos..." className="w-full sm:w-auto" />
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Mais recentes</SelectItem>
                  <SelectItem value="popular">Mais curtidos</SelectItem>
                  <SelectItem value="commented">Mais comentados</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="space-y-6">
          {activeTab === "seguindo" && sortedProjects.length === 0 ? (
            <Card className="p-8 text-center">
              <div className="mb-4 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-lg font-medium">Ainda não está seguindo ninguém</h3>
                <p className="mt-2">Comece a seguir artesãos para ver seus projetos aqui</p>
              </div>
              <Button variant="outline" asChild>
                <Link to="/explorar">Explorar Artesãos</Link>
              </Button>
            </Card>
          ) : (
            sortedProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden">
                <CardHeader className="p-4 pb-0">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={project.user.avatar} />
                        <AvatarFallback>
                          {project.user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{project.user.name}</div>
                        <div className="text-xs text-muted-foreground">{formatDate(project.createdAt)}</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-5 w-5" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="p-4 pt-3">
                  <h3 className="font-bold text-lg mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="hover:bg-secondary/10 cursor-pointer">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="rounded-lg overflow-hidden">
                    <img 
                      src={project.images[0]} 
                      alt={project.title}
                      className="w-full aspect-[4/3] object-cover hover:opacity-95 transition-opacity cursor-pointer"
                    />
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col p-4 pt-0">
                  <div className="flex justify-between w-full">
                    <div className="flex gap-6">
                      <Button variant="ghost" size="sm" className="flex items-center gap-1.5">
                        <Heart className="h-5 w-5" />
                        <span>{project.likes}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center gap-1.5">
                        <MessageCircle className="h-5 w-5" />
                        <span>{project.comments}</span>
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-5 w-5" />
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm">
                      <BookmarkPlus className="h-5 w-5" />
                    </Button>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex gap-3 w-full">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="relative flex-1">
                      <Textarea 
                        placeholder="Adicionar comentário..." 
                        className="min-h-[60px] resize-none pb-10"
                      />
                      <Button 
                        size="sm" 
                        className="absolute bottom-2 right-2"
                      >
                        Publicar
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))
          )}
        </div>

        {sortedProjects.length > 0 && (
          <div className="flex justify-center mt-8">
            <Button variant="outline">
              Carregar mais
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}
