
import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import PatternCard from '@/components/patterns/PatternCard';
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

export default function Favorites() {
  const [favoritePatterns, setFavoritePatterns] = useState<Pattern[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) return;
      
      setIsLoading(true);
      
      try {
        const { data: favorites, error: favoritesError } = await supabase
          .from('favorites')
          .select('pattern_id')
          .eq('user_id', user.id);
        
        if (favoritesError) throw favoritesError;
        
        if (favorites && favorites.length > 0) {
          const patternIds = favorites.map(fav => fav.pattern_id);
          
          const { data: patternsData, error: patternsError } = await supabase
            .from('patterns')
            .select(`
              id,
              title,
              cover_image_url,
              designer_id,
              category_id,
              difficulty_id,
              categories (name),
              difficulty_levels (name),
              profiles (id, name)
            `)
            .in('id', patternIds);
          
          if (patternsError) throw patternsError;
          
          if (patternsData) {
            const formattedPatterns: Pattern[] = patternsData.map(pattern => ({
              id: pattern.id,
              title: pattern.title,
              designer: {
                id: pattern.designer_id || '',
                // Safely handle potentially null profiles
                name: pattern.profiles ? pattern.profiles.name || 'Designer desconhecido' : 'Designer desconhecido'
              },
              category: pattern.categories?.name || 'Sem categoria',
              difficulty: pattern.difficulty_levels?.name || 'Iniciante',
              imageUrl: pattern.cover_image_url || 'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
              isFavorite: true
            }));
            
            setFavoritePatterns(formattedPatterns);
          }
        } else {
          setFavoritePatterns([]);
        }
      } catch (error) {
        console.error('Erro ao carregar favoritos:', error);
        toast.error('Não foi possível carregar seus favoritos.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFavorites();
  }, [user]);

  const handleRemoveFavorite = async (patternId: string) => {
    if (!user) return;
    
    try {
      await supabase
        .from('favorites')
        .delete()
        .match({ user_id: user.id, pattern_id: patternId });
      
      setFavoritePatterns(favoritePatterns.filter(pattern => pattern.id !== patternId));
      toast.success('Removido dos favoritos');
    } catch (error) {
      console.error('Erro ao remover favorito:', error);
      toast.error('Não foi possível remover dos favoritos');
    }
  };

  return (
    <Layout>
      <div className="container px-4 py-6">
        <h1 className="text-2xl font-bold mb-8">Meus Favoritos</h1>
        
        {isLoading ? (
          <p className="text-center py-8">Carregando seus favoritos...</p>
        ) : favoritePatterns.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favoritePatterns.map((pattern) => (
              <PatternCard
                key={pattern.id}
                pattern={pattern}
                onFavoriteToggle={() => handleRemoveFavorite(pattern.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Você ainda não tem nenhum padrão favorito.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
