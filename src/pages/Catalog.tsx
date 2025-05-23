
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import PatternCard from '@/components/patterns/PatternCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import Layout from '@/components/layout/Layout';
import { toast } from 'sonner';

interface Pattern {
  id: string;
  title: string;
  designer: {
    id: string;
    name: string;
  };
  category: string;
  difficulty: string;
  imageUrl: string;
  isFavorite: boolean;
}

const Catalog = () => {
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [difficulties, setDifficulties] = useState<{ id: string; name: string }[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase
        .from('categories')
        .select('id, name');
      
      if (data) setCategories(data);
    };

    const fetchDifficulties = async () => {
      const { data } = await supabase
        .from('difficulty_levels')
        .select('id, name');
      
      if (data) setDifficulties(data);
    };

    fetchCategories();
    fetchDifficulties();
  }, []);

  useEffect(() => {
    const fetchPatterns = async () => {
      setIsLoading(true);
      
      try {
        const { data, error } = await supabase
          .from('patterns')
          .select(`
            id,
            title,
            cover_image_url,
            category_id,
            difficulty_id,
            designer_id,
            categories (name),
            difficulty_levels (name)
          `)
          .eq('is_public', true);
        
        if (error) throw error;

        let favorites: string[] = [];
        if (user) {
          const { data: favoritesData } = await supabase
            .from('favorites')
            .select('pattern_id')
            .eq('user_id', user.id);
          
          if (favoritesData) {
            favorites = favoritesData.map(fav => fav.pattern_id);
          }
        }
        
        if (data) {
          const designerIds = [...new Set(data.map(p => p.designer_id).filter(Boolean))];
          
          const { data: designersData } = await supabase
            .from('profiles')
            .select('id, name')
            .in('id', designerIds);
          
          const designersMap = new Map();
          if (designersData) {
            designersData.forEach(designer => {
              designersMap.set(designer.id, {
                id: designer.id,
                name: designer.name || 'Designer desconhecido',
              });
            });
          }

          const formattedPatterns: Pattern[] = data.map(pattern => {
            let designer = { id: '', name: 'Designer desconhecido' };
            if (pattern.designer_id && designersMap.has(pattern.designer_id)) {
              designer = designersMap.get(pattern.designer_id);
            }
            
            return {
              id: pattern.id,
              title: pattern.title,
              designer: designer,
              category: pattern.categories?.name || 'Sem categoria',
              difficulty: pattern.difficulty_levels?.name || 'Iniciante',
              imageUrl: pattern.cover_image_url || 'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
              isFavorite: favorites.includes(pattern.id)
            };
          });
          
          setPatterns(formattedPatterns);
        }
      } catch (error) {
        console.error("Erro ao buscar padrões:", error);
        toast.error("Não foi possível carregar os padrões.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPatterns();
  }, [user]);

  const handleToggleFavorite = async (patternId: string) => {
    if (!user) {
      toast.error("Você precisa fazer login para adicionar favoritos");
      return;
    }
    
    const pattern = patterns.find(p => p.id === patternId);
    if (!pattern) return;
    
    try {
      if (pattern.isFavorite) {
        await supabase
          .from('favorites')
          .delete()
          .match({ user_id: user.id, pattern_id: patternId });
        
        toast.success("Removido dos favoritos");
      } else {
        await supabase
          .from('favorites')
          .insert({ user_id: user.id, pattern_id: patternId });
        
        toast.success("Adicionado aos favoritos");
      }
      
      setPatterns(patterns.map(p => 
        p.id === patternId ? { ...p, isFavorite: !p.isFavorite } : p
      ));
    } catch (error) {
      console.error("Erro ao atualizar favorito:", error);
      toast.error("Ocorreu um erro ao atualizar favorito");
    }
  };

  const filteredPatterns = patterns.filter(pattern => {
    const matchesSearch = pattern.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          pattern.designer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' ? true : pattern.category === categoryFilter;
    const matchesDifficulty = difficultyFilter === 'all' ? true : pattern.difficulty === difficultyFilter;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <Layout>
      <div className="container py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h1 className="text-2xl font-bold">Catálogo de Padrões</h1>
          
          <div className="w-full md:w-auto">
            <Input
              placeholder="Pesquisar padrões..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="md:w-[300px]"
            />
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-64 space-y-4">
            <div>
              <h3 className="font-medium mb-2">Categorias</h3>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas categorias" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas categorias</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Dificuldade</h3>
              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos níveis" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos níveis</SelectItem>
                  {difficulties.map((difficulty) => (
                    <SelectItem key={difficulty.id} value={difficulty.name}>
                      {difficulty.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {(categoryFilter !== 'all' || difficultyFilter !== 'all' || searchTerm) && (
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setCategoryFilter('all');
                  setDifficultyFilter('all');
                }}
              >
                Limpar filtros
              </Button>
            )}
          </div>
          
          <Separator orientation="vertical" className="hidden md:block h-auto" />
          
          <div className="flex-1">
            {isLoading ? (
              <p className="text-center py-8">Carregando padrões...</p>
            ) : filteredPatterns.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredPatterns.map((pattern) => (
                  <PatternCard 
                    key={pattern.id} 
                    pattern={pattern} 
                    onFavoriteToggle={() => handleToggleFavorite(pattern.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">Nenhum padrão encontrado para os filtros aplicados.</p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm('');
                    setCategoryFilter('all');
                    setDifficultyFilter('all');
                  }}
                >
                  Limpar filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Catalog;
