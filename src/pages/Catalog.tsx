
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination } from '@/components/ui/pagination';
import PatternCard from '@/components/patterns/PatternCard';
import { Loader2, Search } from 'lucide-react';

interface Pattern {
  id: string;
  title: string;
  designer: string;
  category: string;
  difficulty: string;
  imageUrl: string;
  isFavorite: boolean;
}

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<{id: string, name: string}[]>([]);
  const [difficulties, setDifficulties] = useState<{id: string, name: string}[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedDifficulty, setSelectedDifficulty] = useState(searchParams.get('difficulty') || '');
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '1'));
  const pageSize = 12;

  useEffect(() => {
    // Fetch categories and difficulties for filters
    const fetchMetadata = async () => {
      const { data: categoriesData } = await supabase
        .from('categories')
        .select('id, name')
        .order('name');
      
      const { data: difficultiesData } = await supabase
        .from('difficulty_levels')
        .select('id, name')
        .order('name');
      
      if (categoriesData) setCategories(categoriesData);
      if (difficultiesData) setDifficulties(difficultiesData);
    };
    
    fetchMetadata();
  }, []);

  useEffect(() => {
    const fetchPatterns = async () => {
      setIsLoading(true);
      
      try {
        let query = supabase
          .from('patterns')
          .select(`
            id,
            title,
            cover_image_url,
            designer_id,
            category_id,
            difficulty_id,
            categories (id, name),
            difficulty_levels (id, name),
            profiles (id, name)
          `, { count: 'exact' })
          .eq('is_public', true)
          .range((currentPage - 1) * pageSize, currentPage * pageSize - 1);
        
        // Apply filters
        if (searchQuery) {
          query = query.ilike('title', `%${searchQuery}%`);
        }
        
        if (selectedCategory) {
          query = query.eq('category_id', selectedCategory);
        }
        
        if (selectedDifficulty) {
          query = query.eq('difficulty_id', selectedDifficulty);
        }
        
        const { data: patternsData, count } = await query;
        
        // Calculate total pages
        if (count !== null) {
          setTotalPages(Math.ceil(count / pageSize));
        }
        
        // Transform data for display
        if (patternsData) {
          const formattedPatterns: Pattern[] = patternsData.map(pattern => ({
            id: pattern.id,
            title: pattern.title,
            designer: pattern.profiles ? pattern.profiles.name || "Designer desconhecido" : "Designer desconhecido",
            category: pattern.categories ? pattern.categories.name || "Sem categoria" : "Sem categoria",
            difficulty: pattern.difficulty_levels ? pattern.difficulty_levels.name || "Iniciante" : "Iniciante",
            imageUrl: pattern.cover_image_url || "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
            isFavorite: false // Will be updated later
          }));
          
          setPatterns(formattedPatterns);
        }
      } catch (error) {
        console.error('Erro ao buscar padrões:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPatterns();
    
    // Update URL search params
    const params: Record<string, string> = {};
    if (searchQuery) params.q = searchQuery;
    if (selectedCategory) params.category = selectedCategory;
    if (selectedDifficulty) params.difficulty = selectedDifficulty;
    if (currentPage > 1) params.page = currentPage.toString();
    setSearchParams(params);
    
  }, [searchQuery, selectedCategory, selectedDifficulty, currentPage, pageSize, setSearchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  const handleDifficultyChange = (value: string) => {
    setSelectedDifficulty(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container px-4 py-8 md:px-6">
        <h1 className="text-3xl font-bold mb-8">Catálogo de Padrões</h1>
        
        {/* Filters */}
        <div className="mb-8 bg-muted/50 p-4 rounded-lg border">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder="Buscar padrões..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            </div>
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todas categorias</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedDifficulty} onValueChange={handleDifficultyChange}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Dificuldade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todas dificuldades</SelectItem>
                {difficulties.map(difficulty => (
                  <SelectItem key={difficulty.id} value={difficulty.id}>{difficulty.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button type="submit" className="md:w-[100px]">Filtrar</Button>
          </form>
        </div>
        
        {/* Results */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : patterns.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">Nenhum padrão encontrado</p>
            <p className="mt-2">Tente ajustar seus filtros de busca</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {patterns.map(pattern => (
              <PatternCard key={pattern.id} pattern={pattern} />
            ))}
          </div>
        )}
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={handlePageChange} 
            />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
