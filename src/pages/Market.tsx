
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { ShoppingBag, BookOpen, Video, FileText, Folder, Star, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const productsData = [
  {
    id: 1,
    title: "Kit de Amigurumis para Iniciantes",
    description: "Coleção de 5 padrões de amigurumi para quem está começando, com tutoriais detalhados.",
    price: 39.9,
    coverImage: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    type: "pdf",
    category: "amigurumi",
    rating: 4.8,
    ratingCount: 124,
    author: {
      id: "user1",
      name: "Maria Silva",
      avatar: "",
    }
  },
  {
    id: 2,
    title: "Vídeo Tutorial - Bolsa de Crochê Verão",
    description: "Aprenda a fazer uma linda bolsa de crochê para o verão em vídeo tutorial completo.",
    price: 24.9,
    coverImage: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    type: "video",
    category: "croche",
    rating: 4.5,
    ratingCount: 87,
    author: {
      id: "user2",
      name: "João Costa",
      avatar: "",
    }
  },
  {
    id: 3,
    title: "Curso Completo de Macramê",
    description: "Do básico ao avançado: aprenda mais de 30 técnicas de macramê com projetos práticos.",
    price: 79.9,
    coverImage: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    type: "curso",
    category: "macrame",
    rating: 4.9,
    ratingCount: 212,
    author: {
      id: "user3",
      name: "Ana Oliveira",
      avatar: "",
    }
  },
  {
    id: 4,
    title: "Apostila de Bordado Botânico",
    description: "Padrões e técnicas para bordar flores e folhas em bastidores diversos.",
    price: 19.9,
    coverImage: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    type: "apostila",
    category: "bordado",
    rating: 4.7,
    ratingCount: 65,
    author: {
      id: "user4",
      name: "Carla Santos",
      avatar: "",
    }
  },
  {
    id: 5,
    title: "Receitas de Tricô para Casa",
    description: "10 padrões de tricô para decorar sua casa: almofadas, mantas e mais.",
    price: 29.9,
    coverImage: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    type: "pdf",
    category: "trico",
    rating: 4.6,
    ratingCount: 93,
    author: {
      id: "user5",
      name: "Roberto Lima",
      avatar: "",
    }
  },
  {
    id: 6,
    title: "Masterclass: Técnicas Avançadas de Crochê",
    description: "Vídeo aulas com técnicas profissionais de crochê para levar seus projetos ao próximo nível.",
    price: 49.9,
    coverImage: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    type: "curso",
    category: "croche",
    rating: 4.9,
    ratingCount: 176,
    author: {
      id: "user6",
      name: "Fernanda Torres",
      avatar: "",
    }
  },
  {
    id: 7,
    title: "Coleção de Amigurumis Safári",
    description: "8 padrões de amigurumis de animais da savana com tutoriais detalhados.",
    price: 34.9,
    coverImage: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    type: "pdf",
    category: "amigurumi",
    rating: 4.7,
    ratingCount: 108,
    author: {
      id: "user7",
      name: "Juliana Mendes",
      avatar: "",
    }
  },
  {
    id: 8,
    title: "eBook Completo: Tudo sobre Bordado Moderno",
    description: "Um guia completo de bordado contemporâneo com mais de 50 padrões.",
    price: 44.9,
    coverImage: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    type: "pdf",
    category: "bordado",
    rating: 4.8,
    ratingCount: 89,
    author: {
      id: "user8",
      name: "Paulo Henrique",
      avatar: "",
    }
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

const types = [
  { id: 'todos', name: 'Todos' },
  { id: 'pdf', name: 'PDF' },
  { id: 'video', name: 'Vídeo' },
  { id: 'curso', name: 'Curso' },
  { id: 'apostila', name: 'Apostila' },
];

const formatPrice = (price: number) => {
  return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

export default function Market() {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [selectedType, setSelectedType] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [minRating, setMinRating] = useState(0);
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-4 w-4 mr-1" />;
      case 'video':
        return <Video className="h-4 w-4 mr-1" />;
      case 'curso':
        return <Folder className="h-4 w-4 mr-1" />;
      case 'apostila':
        return <BookOpen className="h-4 w-4 mr-1" />;
      default:
        return <FileText className="h-4 w-4 mr-1" />;
    }
  };

  const filteredProducts = productsData.filter(product => {
    const matchesCategory = selectedCategory === 'todos' || product.category === selectedCategory;
    const matchesType = selectedType === 'todos' || product.type === selectedType;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1] * 2;
    const matchesRating = product.rating >= minRating;
    const matchesSearch = searchQuery === '' || 
                          product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesType && matchesPrice && matchesRating && matchesSearch;
  });

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-500 fill-yellow-500' : 
                   i < rating ? 'text-yellow-500 fill-yellow-500 opacity-50' : 
                   'text-muted-foreground'}`} 
      />
    ));
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold font-display">Mercado</h1>
            <p className="text-muted-foreground mt-2">
              Encontre produtos digitais criados por nossa comunidade
            </p>
          </div>
          <Button className="mt-4 md:mt-0" asChild>
            <Link to="/mercado/vender">
              <Upload className="h-4 w-4 mr-2" /> Vender Produto
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          {/* Filtros */}
          <div className="space-y-6">
            <Card className="p-4">
              <h3 className="font-medium mb-4">Filtros</h3>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    Categoria
                  </label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas as categorias" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    Tipo de Produto
                  </label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos os tipos" />
                    </SelectTrigger>
                    <SelectContent>
                      {types.map(type => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    Preço (R$)
                  </label>
                  <div className="pt-4 px-2">
                    <Slider
                      value={priceRange}
                      max={100}
                      step={1}
                      onValueChange={setPriceRange}
                    />
                    <div className="flex justify-between mt-2 text-sm">
                      <span>R$ {priceRange[0]}</span>
                      <span>R$ {priceRange[1] * 2}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    Avaliação mínima
                  </label>
                  <div className="flex items-center gap-2">
                    {[0, 1, 2, 3, 4].map(rating => (
                      <button
                        key={rating}
                        onClick={() => setMinRating(rating + 1)}
                        className={`rounded-full p-1 ${minRating > rating ? 'text-yellow-500' : 'text-muted'}`}
                      >
                        <Star className={`h-5 w-5 ${minRating > rating ? 'fill-yellow-500' : ''}`} />
                      </button>
                    ))}
                    {minRating > 0 && (
                      <button
                        onClick={() => setMinRating(0)}
                        className="ml-2 text-xs text-muted-foreground hover:underline"
                      >
                        Limpar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-medium mb-4">Categorias Populares</h3>
              <div className="space-y-2">
                {categories.filter(c => c.id !== 'todos').map(category => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "ghost"}
                    className="w-full justify-start h-9"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="relative flex-grow">
                <ShoppingBag className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Pesquisar produtos..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <Tabs defaultValue="grade" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="grade">Grade</TabsTrigger>
                    <TabsTrigger value="lista">Lista</TabsTrigger>
                  </TabsList>
                </Tabs>

                <Select defaultValue="popular">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Mais populares</SelectItem>
                    <SelectItem value="recent">Mais recentes</SelectItem>
                    <SelectItem value="price-asc">Preço: menor para maior</SelectItem>
                    <SelectItem value="price-desc">Preço: maior para menor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Tabs defaultValue="grade">
              <TabsContent value="grade" className="mt-0">
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                  {filteredProducts.map(product => (
                    <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="aspect-[3/2] relative overflow-hidden">
                        <img 
                          src={product.coverImage} 
                          alt={product.title}
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-black/60 hover:bg-black/70 border-none">
                            {formatPrice(product.price)}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className="flex items-center">
                            {getTypeIcon(product.type)}
                            <span className="capitalize">{product.type}</span>
                          </Badge>
                          <div className="flex items-center gap-1">
                            {renderStars(product.rating)}
                          </div>
                        </div>
                        
                        <h3 className="font-semibold line-clamp-1 mb-1">{product.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{product.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback>{product.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-muted-foreground">{product.author.name}</span>
                          </div>
                          
                          <span className="text-xs text-muted-foreground">
                            {product.ratingCount} avaliações
                          </span>
                        </div>
                        
                        <Button className="w-full mt-4" asChild>
                          <Link to={`/mercado/produto/${product.id}`}>
                            Ver Detalhes
                          </Link>
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="lista" className="mt-0">
                <div className="space-y-4">
                  {filteredProducts.map(product => (
                    <Card key={product.id} className="overflow-hidden">
                      <div className="flex flex-col sm:flex-row">
                        <div className="sm:w-48">
                          <div className="aspect-square sm:h-full relative">
                            <img 
                              src={product.coverImage} 
                              alt={product.title}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col flex-1 p-4">
                          <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                            <h3 className="font-semibold">{product.title}</h3>
                            <Badge className="bg-primary hover:bg-primary/80">
                              {formatPrice(product.price)}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex">
                              {renderStars(product.rating)}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              ({product.ratingCount})
                            </span>
                            <Badge variant="outline" className="flex items-center ml-2">
                              {getTypeIcon(product.type)}
                              <span className="capitalize">{product.type}</span>
                            </Badge>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                          
                          <div className="flex flex-wrap items-center justify-between mt-auto pt-2">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback>{product.author.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="text-xs text-muted-foreground">{product.author.name}</span>
                            </div>
                            
                            <Button size="sm" className="mt-2 sm:mt-0" asChild>
                              <Link to={`/mercado/produto/${product.id}`}>
                                Ver Detalhes
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12 border rounded-lg">
                <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium">Nenhum produto encontrado</h3>
                <p className="text-muted-foreground mt-2 mb-4">Tente ajustar seus filtros de pesquisa</p>
                <Button variant="outline" onClick={() => {
                  setSelectedCategory('todos');
                  setSelectedType('todos');
                  setPriceRange([0, 100]);
                  setMinRating(0);
                  setSearchQuery('');
                }}>
                  Limpar Filtros
                </Button>
              </div>
            )}

            {filteredProducts.length > 0 && (
              <div className="flex justify-center mt-8">
                <Button variant="outline">
                  Carregar mais
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
