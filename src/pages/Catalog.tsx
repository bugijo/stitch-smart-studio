import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Loader2, Search } from 'lucide-react';
import PatternCard from '@/components/patterns/PatternCard';

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
  const navigate = useNavigate();
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);
  
  useEffect(() => {
    const fetchPatterns = async () => {
      setIsLoading(true);
      try {
        // Fetch favorites if user is logged in
        let userFavorites: string[] = [];
        if (user) {
          const { data: favoritesData } = await supabase
            .from('favorites')
            .select('pattern_id')
            .eq('user_id', user.id);
          
          userFavorites = favoritesData ? favoritesData.map(fav => fav.pattern_id) : [];
          setFavorites(userFavorites);
        }
        
        // Fetch patterns
        let query = supabase
          .from('patterns')
          .select(`
            *,
            categories (name),
            difficulty_levels (name),
            profiles (name)
          `)
          .order('created_at', { ascending: false });
        
        if (selectedCategory !== 'all') {
          query = query.eq('category_id', selectedCategory);
        }
        
        if (selectedDifficulty !== 'all') {
          query = query.eq('difficulty_id', selectedDifficulty);
        }
        
        if (searchQuery) {
          query = query.ilike('title', `%${searchQuery}%`);
        }
        
        const { data: patternsData, error } = await query;
        
        if (error) throw error;
        
        if (patternsData) {
          const formattedPatterns: Pattern[] = patternsData.map(pattern => ({
            id: pattern.id,
            title: pattern.title,
            designer: pattern.profiles && typeof pattern.profiles === 'object' && pattern.profiles !== null && 'name' in pattern.profiles ? 
              pattern.profiles.name || "Designer desconhecido" : "Designer desconhecido",
            category: pattern.categories ? 
              (typeof pattern.categories === 'object' && pattern.categories !== null && 'name' in pattern.categories ? 
                pattern.categories.name || "Sem categoria" : "Sem categoria") : 
              "Sem categoria",
            difficulty: pattern.difficulty_levels ? 
              (typeof pattern.difficulty_levels === 'object' && pattern.difficulty_levels !== null && 'name' in pattern.difficulty_levels ? 
                pattern.difficulty_levels.name || "Iniciante" : "Iniciante") : 
              "Iniciante",
            imageUrl: pattern.cover_image_url || "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
            isFavorite: userFavorites.includes(pattern.id)
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
  }, [selectedCategory, selectedDifficulty, searchQuery, user]);
  
  const handleFavoriteToggle = async (patternId: string) => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    const isFavorite = favorites.includes(patternId);
    
    try {
      if (isFavorite) {
        // Remove from favorites
        await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('pattern_id', patternId);
          
        setFavorites(favorites.filter(id => id !== patternId));
      } else {
        // Add to favorites
        await supabase
          .from('favorites')
          .insert({ user_id: user.id, pattern_id: patternId });
          
        setFavorites([...favorites, patternId]);
      }
      
      // Update patterns state
      setPatterns(patterns.map(pattern => 
        pattern.id === patternId 
          ? { ...pattern, isFavorite: !isFavorite } 
          : pattern
      ));
      
    } catch (error) {
      console.error('Erro ao atualizar favoritos:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container px-4 py-8 md:px-6">
        <h1 className="text-3xl font-bold mb-8">Catálogo de Padrões</h1>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Input
            type="text"
            placeholder="Buscar padrões..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow"
          />
          
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="select select-bordered w-full max-w-xs"
            >
              <option value="all">Todas as Categorias</option>
              <option value="1">Amigurumi</option>
              <option value="2">Roupas</option>
              <option value="3">Acessórios</option>
              <option value="4">Decoração</option>
            </select>
            
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="select select-bordered w-full max-w-xs"
            >
              <option value="all">Todas as Dificuldades</option>
              <option value="1">Iniciante</option>
              <option value="2">Fácil</option>
              <option value="3">Médio</option>
              <option value="4">Avançado</option>
            </select>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : patterns.length === 0 ? (
          <div className="text-center py-12">
            <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-xl font-medium mb-2">Nenhum padrão encontrado</p>
            <p className="text-muted-foreground mb-6">
              Tente ajustar os filtros ou a busca para encontrar o que procura.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {patterns.map(pattern => (
              <PatternCard 
                key={pattern.id} 
                pattern={pattern} 
                onFavoriteToggle={() => handleFavoriteToggle(pattern.id)}
                isFavorite={favorites.includes(pattern.id)}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
