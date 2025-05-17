
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter } from 'lucide-react';

// Sample model types for filtering
const CRAFT_TYPES = [
  { id: 'all', name: 'Todos' },
  { id: 'croche', name: 'Crochê' },
  { id: 'macrame', name: 'Macramê' },
  { id: 'trico', name: 'Tricô' },
  { id: 'bordado', name: 'Bordado' },
  { id: 'amigurumi', name: 'Amigurumi' }
];

// Sample price ranges
const PRICE_RANGES = [
  { id: 'all', name: 'Todos os preços' },
  { id: 'free', name: 'Grátis' },
  { id: 'under_15', name: 'Até R$15' },
  { id: '15_30', name: 'R$15 - R$30' },
  { id: '30_50', name: 'R$30 - R$50' },
  { id: 'over_50', name: 'Acima de R$50' }
];

// Sample difficulty levels
const DIFFICULTY_LEVELS = [
  { id: 'all', name: 'Todos os níveis' },
  { id: 'beginner', name: 'Iniciante' },
  { id: 'intermediate', name: 'Intermediário' },
  { id: 'advanced', name: 'Avançado' }
];

// Sample model data
const SAMPLE_MODELS = [
  {
    id: 1,
    title: "Amigurumi de Coelho",
    image: "https://images.unsplash.com/photo-1566454825481-9c931ab01065",
    price: 19.90,
    designer: "Maria Craft",
    type: "croche",
    difficulty: "beginner",
    rating: 4.8
  },
  {
    id: 2,
    title: "Bolsa de Praia Macramê",
    image: "https://images.unsplash.com/photo-1528312635006-8ea0bc49ec63",
    price: 35.00,
    designer: "Lucas Artesanato",
    type: "macrame",
    difficulty: "intermediate",
    rating: 4.5
  },
  {
    id: 3,
    title: "Cachecol Trançado",
    image: "https://images.unsplash.com/photo-1551740132-49fadd215272",
    price: 15.00,
    designer: "Ana Tricot",
    type: "trico",
    difficulty: "beginner",
    rating: 4.2
  },
  {
    id: 4,
    title: "Kit Bordado Flores",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    price: 45.00,
    designer: "Clara Bordados",
    type: "bordado",
    difficulty: "advanced",
    rating: 4.9
  },
  {
    id: 5,
    title: "Urso Amigurumi",
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    price: 0,
    designer: "Paula Crochet",
    type: "amigurumi",
    difficulty: "intermediate",
    rating: 4.7
  },
  {
    id: 6,
    title: "Tapete Círculo",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    price: 27.50,
    designer: "Roberto Artesão",
    type: "croche",
    difficulty: "beginner",
    rating: 4.4
  }
];

export default function Models() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  // Filter models based on selected filters
  const filteredModels = SAMPLE_MODELS.filter(model => {
    // Search filter
    const matchesSearch = model.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         model.designer.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Type filter
    const matchesType = selectedType === 'all' || model.type === selectedType;
    
    // Price filter
    let matchesPrice = true;
    if (selectedPrice === 'free') {
      matchesPrice = model.price === 0;
    } else if (selectedPrice === 'under_15') {
      matchesPrice = model.price > 0 && model.price <= 15;
    } else if (selectedPrice === '15_30') {
      matchesPrice = model.price > 15 && model.price <= 30;
    } else if (selectedPrice === '30_50') {
      matchesPrice = model.price > 30 && model.price <= 50;
    } else if (selectedPrice === 'over_50') {
      matchesPrice = model.price > 50;
    }
    
    // Difficulty filter
    const matchesDifficulty = selectedDifficulty === 'all' || model.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesType && matchesPrice && matchesDifficulty;
  });

  // Format price display
  const formatPrice = (price) => {
    if (price === 0) return "Grátis";
    return `R$ ${price.toFixed(2)}`.replace('.', ',');
  };

  // Format rating display with stars
  const formatRating = (rating) => {
    return `${rating.toFixed(1)} ★`;
  };

  return (
    <Layout>
      <div className="container px-4 py-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Modelos & Receitas</h1>
          <p className="text-muted-foreground">
            Encontre o modelo perfeito para o seu próximo projeto
          </p>
        </header>

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar modelos, designers..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'bg-primary/10' : ''}
              >
                <div className="grid grid-cols-2 gap-1">
                  <div className="w-2 h-2 bg-current"></div>
                  <div className="w-2 h-2 bg-current"></div>
                  <div className="w-2 h-2 bg-current"></div>
                  <div className="w-2 h-2 bg-current"></div>
                </div>
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'bg-primary/10' : ''}
              >
                <div className="flex flex-col gap-1 w-5">
                  <div className="w-full h-1 bg-current"></div>
                  <div className="w-full h-1 bg-current"></div>
                  <div className="w-full h-1 bg-current"></div>
                </div>
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 md:gap-4">
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                {CRAFT_TYPES.map(type => (
                  <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedPrice} onValueChange={setSelectedPrice}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Preço" />
              </SelectTrigger>
              <SelectContent>
                {PRICE_RANGES.map(range => (
                  <SelectItem key={range.id} value={range.id}>{range.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Nível" />
              </SelectTrigger>
              <SelectContent>
                {DIFFICULTY_LEVELS.map(level => (
                  <SelectItem key={level.id} value={level.id}>{level.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button 
              variant="outline"
              className="flex-1 md:flex-none"
              onClick={() => {
                setSelectedType('all');
                setSelectedPrice('all');
                setSelectedDifficulty('all');
                setSearchTerm('');
              }}
            >
              Limpar Filtros
            </Button>
          </div>
        </div>

        {/* Tab navigation for categories */}
        <Tabs defaultValue="all" className="mb-6">
          <TabsList className="mb-4 flex overflow-x-auto">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="croche">Crochê</TabsTrigger>
            <TabsTrigger value="macrame">Macramê</TabsTrigger>
            <TabsTrigger value="trico">Tricô</TabsTrigger>
            <TabsTrigger value="bordado">Bordado</TabsTrigger>
            <TabsTrigger value="amigurumi">Amigurumi</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Results count */}
        <p className="text-muted-foreground mb-6">
          {filteredModels.length} {filteredModels.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
        </p>

        {/* Models Grid/List View */}
        {filteredModels.length === 0 ? (
          <div className="text-center py-10">
            <h3 className="text-xl font-medium mb-2">Nenhum modelo encontrado</h3>
            <p className="text-muted-foreground">Tente ajustar seus filtros ou termos de busca</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredModels.map(model => (
              <Card key={model.id} className="overflow-hidden">
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={model.image}
                    alt={model.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-3">
                  <h3 className="font-medium text-sm md:text-base line-clamp-1">{model.title}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{model.designer}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm md:text-base">{formatPrice(model.price)}</span>
                    <span className="text-xs text-amber-500">{formatRating(model.rating)}</span>
                  </div>
                </CardContent>
                <CardFooter className="p-3 pt-0">
                  <Button size="sm" className="w-full">Ver detalhes</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredModels.map(model => (
              <Card key={model.id} className="overflow-hidden">
                <div className="flex">
                  <div className="w-24 h-24 md:w-32 md:h-32">
                    <img
                      src={model.image}
                      alt={model.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 flex-1">
                    <h3 className="font-medium">{model.title}</h3>
                    <p className="text-sm text-muted-foreground">{model.designer}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-bold">{formatPrice(model.price)}</span>
                      <span className="text-sm text-amber-500">{formatRating(model.rating)}</span>
                    </div>
                    <Button size="sm" className="mt-2">Ver detalhes</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
