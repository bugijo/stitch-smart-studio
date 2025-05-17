
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, BookOpen, Video } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const tutorialsData = [
  {
    id: 1,
    title: "Crochê básico para iniciantes",
    description: "Aprenda os pontos básicos de crochê para começar seus projetos.",
    coverImage: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    level: "iniciante",
    type: "video",
    category: "croche",
    duration: "25 min",
    isFree: true,
  },
  {
    id: 2,
    title: "Como fazer amigurumi de urso",
    description: "Tutorial passo a passo para criar um urso de amigurumi perfeito.",
    coverImage: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    level: "intermediario",
    type: "pdf",
    category: "amigurumi",
    duration: "2h",
    isFree: false,
    price: "R$ 19,90"
  },
  {
    id: 3,
    title: "Bolsa de macramê estilo boho",
    description: "Crie sua própria bolsa de macramê com este tutorial completo.",
    coverImage: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    level: "avancado",
    type: "curso",
    category: "macrame",
    duration: "3h20min",
    isFree: false,
    price: "R$ 39,90"
  },
  {
    id: 4,
    title: "Técnicas de bordado básicas",
    description: "Domine as técnicas essenciais de bordado para qualquer projeto.",
    coverImage: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    level: "iniciante",
    type: "video",
    category: "bordado",
    duration: "45 min",
    isFree: true,
  },
  {
    id: 5,
    title: "Tricô para iniciantes: cachecol",
    description: "Aprenda a fazer seu primeiro cachecol usando tricô básico.",
    coverImage: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    level: "iniciante",
    type: "pdf",
    category: "trico",
    duration: "1h",
    isFree: true,
  },
  {
    id: 6,
    title: "Tapete de crochê redondo",
    description: "Crie um lindo tapete de crochê para decorar sua casa.",
    coverImage: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    level: "intermediario",
    type: "video",
    category: "croche",
    duration: "1h30min",
    isFree: false,
    price: "R$ 24,90"
  },
];

const categories = [
  { id: 'todos', name: 'Todos' },
  { id: 'croche', name: 'Crochê' },
  { id: 'trico', name: 'Tricô' },
  { id: 'bordado', name: 'Bordado' },
  { id: 'macrame', name: 'Macramê' },
  { id: 'amigurumi', name: 'Amigurumi' },
];

const levels = [
  { id: 'todos', name: 'Todos' },
  { id: 'iniciante', name: 'Iniciante' },
  { id: 'intermediario', name: 'Intermediário' },
  { id: 'avancado', name: 'Avançado' },
];

const formats = [
  { id: 'todos', name: 'Todos' },
  { id: 'video', name: 'Vídeo' },
  { id: 'pdf', name: 'PDF' },
  { id: 'curso', name: 'Curso' },
];

export default function Learn() {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [selectedLevel, setSelectedLevel] = useState('todos');
  const [selectedFormat, setSelectedFormat] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredTutorials = tutorialsData.filter(tutorial => {
    return (selectedCategory === 'todos' || tutorial.category === selectedCategory) &&
           (selectedLevel === 'todos' || tutorial.level === selectedLevel) &&
           (selectedFormat === 'todos' || tutorial.type === selectedFormat) &&
           (searchQuery === '' || tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            tutorial.description.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold font-display">Aprenda Artesanato</h1>
            <p className="text-muted-foreground mt-2">
              Tutoriais passo a passo para todos os níveis e técnicas
            </p>
          </div>
        </div>

        {/* Search and filters */}
        <div className="bg-card rounded-lg p-4 shadow-sm border mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Pesquisar tutoriais..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-[160px]">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-full sm:w-[160px]">
                  <SelectValue placeholder="Nível" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((level) => (
                    <SelectItem key={level.id} value={level.id}>
                      {level.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                <SelectTrigger className="w-full sm:w-[160px]">
                  <SelectValue placeholder="Formato" />
                </SelectTrigger>
                <SelectContent>
                  {formats.map((format) => (
                    <SelectItem key={format.id} value={format.id}>
                      {format.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active filters */}
          {(selectedCategory !== 'todos' || selectedLevel !== 'todos' || selectedFormat !== 'todos') && (
            <div className="flex flex-wrap gap-2 mt-4">
              <div className="text-sm text-muted-foreground mr-2 flex items-center">
                <Filter className="h-4 w-4 mr-1" /> Filtros:
              </div>
              {selectedCategory !== 'todos' && (
                <Badge variant="outline" className="flex items-center gap-1">
                  Categoria: {categories.find(c => c.id === selectedCategory)?.name}
                  <button onClick={() => setSelectedCategory('todos')} className="ml-1">×</button>
                </Badge>
              )}
              {selectedLevel !== 'todos' && (
                <Badge variant="outline" className="flex items-center gap-1">
                  Nível: {levels.find(l => l.id === selectedLevel)?.name}
                  <button onClick={() => setSelectedLevel('todos')} className="ml-1">×</button>
                </Badge>
              )}
              {selectedFormat !== 'todos' && (
                <Badge variant="outline" className="flex items-center gap-1">
                  Formato: {formats.find(f => f.id === selectedFormat)?.name}
                  <button onClick={() => setSelectedFormat('todos')} className="ml-1">×</button>
                </Badge>
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  setSelectedCategory('todos');
                  setSelectedLevel('todos');
                  setSelectedFormat('todos');
                }}
                className="text-xs"
              >
                Limpar Filtros
              </Button>
            </div>
          )}
        </div>

        {/* Tabs for different views */}
        <Tabs defaultValue="grid" className="mb-6">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="grid">Grade</TabsTrigger>
              <TabsTrigger value="list">Lista</TabsTrigger>
            </TabsList>
            <div className="text-sm text-muted-foreground">
              {filteredTutorials.length} tutoriais encontrados
            </div>
          </div>

          <TabsContent value="grid" className="mt-6">
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredTutorials.map((tutorial) => (
                <Card key={tutorial.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={tutorial.coverImage} 
                      alt={tutorial.title}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant={tutorial.isFree ? "secondary" : "default"}>
                        {tutorial.isFree ? "Grátis" : tutorial.price}
                      </Badge>
                    </div>
                    <div className="absolute bottom-2 right-2">
                      <Badge variant="outline" className="bg-black/60 text-white border-none">
                        {tutorial.duration}
                      </Badge>
                    </div>
                    {tutorial.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center">
                          <div className="w-0 h-0 border-y-8 border-y-transparent border-l-12 border-l-primary ml-1"></div>
                        </div>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="capitalize">
                        {tutorial.type === 'pdf' ? (
                          <BookOpen className="w-3 h-3 mr-1" />
                        ) : tutorial.type === 'video' ? (
                          <Video className="w-3 h-3 mr-1" />
                        ) : null}
                        {tutorial.type}
                      </Badge>
                      <Badge variant="secondary">{levels.find(l => l.id === tutorial.level)?.name}</Badge>
                    </div>
                    <h3 className="font-semibold mb-2 line-clamp-1">{tutorial.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{tutorial.description}</p>
                    <Button className="w-full" asChild>
                      <Link to={`/aprenda/${tutorial.id}`}>
                        {tutorial.isFree ? "Ver Tutorial" : "Comprar"}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="list" className="mt-6">
            <div className="space-y-4">
              {filteredTutorials.map((tutorial) => (
                <Card key={tutorial.id} className="overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-48 aspect-video relative">
                      <img 
                        src={tutorial.coverImage} 
                        alt={tutorial.title}
                        className="object-cover w-full h-full"
                      />
                      {tutorial.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center">
                            <div className="w-0 h-0 border-y-6 border-y-transparent border-l-8 border-l-primary ml-1"></div>
                          </div>
                        </div>
                      )}
                    </div>
                    <CardContent className="flex-1 p-4">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold">{tutorial.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{tutorial.description}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge variant={tutorial.isFree ? "secondary" : "default"}>
                            {tutorial.isFree ? "Grátis" : tutorial.price}
                          </Badge>
                          <div className="text-xs text-muted-foreground">{tutorial.duration}</div>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center justify-between mt-4">
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="capitalize">
                            {tutorial.type === 'pdf' ? (
                              <BookOpen className="w-3 h-3 mr-1" />
                            ) : tutorial.type === 'video' ? (
                              <Video className="w-3 h-3 mr-1" />
                            ) : null}
                            {tutorial.type}
                          </Badge>
                          <Badge variant="secondary">{levels.find(l => l.id === tutorial.level)?.name}</Badge>
                          <Badge variant="outline">{categories.find(c => c.id === tutorial.category)?.name}</Badge>
                        </div>
                        <Button size="sm" className="mt-2 sm:mt-0" asChild>
                          <Link to={`/aprenda/${tutorial.id}`}>
                            {tutorial.isFree ? "Ver Tutorial" : "Comprar"}
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
