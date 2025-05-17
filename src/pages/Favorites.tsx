
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import PatternCard from '@/components/patterns/PatternCard';
import { Loader2, Heart } from 'lucide-react';

interface Pattern {
  id: string;
  title: string;
  designer: string;
  category: string;
  difficulty: string;
  imageUrl: string;
  isFavorite: boolean;
}

export default function Favorites() {
  const [favorites, setFavorites] = useState<Pattern[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      window.location.href = '/auth';
      return;
    }
    
    const fetchFavorites = async () => {
      setIsLoading(true);
      
      try {
        const { data, error } = await supabase
          .from('favorites')
          .select(`
            pattern_id,
            patterns (
              id,
              title,
              cover_image_url,
              designer_id,
              category_id,
              difficulty_id,
              categories (name),
              difficulty_levels (name),
              profiles (name)
            )
          `)
          .eq('user_id', user.id);
        
        if (error) throw error;
        
        if (data) {
          const formattedFavorites = data.map(item => {
            const pattern = item.patterns;
            return {
              id: pattern.id,
              title: pattern.title,
              designer: pattern.profiles?.name || "Designer desconhecido",
              category: pattern.categories?.name || "Sem categoria",
              difficulty: pattern.difficulty_levels?.name || "Iniciante",
              imageUrl: pattern.cover_image_url || "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
              isFavorite: true
            };
          });
          
          setFavorites(formattedFavorites);
        }
      } catch (error) {
        console.error('Erro ao buscar favoritos:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFavorites();
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container px-4 py-8 md:px-6">
        <h1 className="text-3xl font-bold mb-8">Seus Favoritos</h1>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : favorites.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-xl font-medium mb-2">Nenhum favorito encontrado</p>
            <p className="text-muted-foreground mb-6">
              Adicione padrões aos seus favoritos para encontrá-los facilmente aqui.
            </p>
            <Button asChild>
              <Link to="/patterns">Explorar Padrões</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map(pattern => (
              <PatternCard key={pattern.id} pattern={pattern} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
