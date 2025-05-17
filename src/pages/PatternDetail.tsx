
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Heart, ArrowLeft, Book, ListOrdered, Share } from 'lucide-react';
import PatternMaterials from '@/components/patterns/PatternMaterials';
import PatternSteps from '@/components/patterns/PatternSteps';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface Pattern {
  id: string;
  title: string;
  description: string;
  designer: {
    id: string;
    name: string;
  };
  category: {
    id: string;
    name: string;
  };
  difficulty: {
    id: string;
    name: string;
  };
  imageUrl: string;
  isFavorite: boolean;
}

export default function PatternDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [pattern, setPattern] = useState<Pattern | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchPattern = async () => {
      setIsLoading(true);
      
      try {
        // Fetch pattern details
        const { data: patternData, error: patternError } = await supabase
          .from('patterns')
          .select(`
            id,
            title,
            description,
            cover_image_url,
            designer_id,
            category_id,
            difficulty_id,
            categories (id, name),
            difficulty_levels (id, name),
            profiles (id, name)
          `)
          .eq('id', id)
          .single();
        
        if (patternError) throw patternError;
        
        // Check if pattern is favorited by current user
        if (user) {
          const { data: favoriteData } = await supabase
            .from('favorites')
            .select('id')
            .match({ user_id: user.id, pattern_id: id })
            .single();
          
          setIsFavorite(!!favoriteData);
        }
        
        if (patternData) {
          setPattern({
            id: patternData.id,
            title: patternData.title,
            description: patternData.description || '',
            designer: {
              id: patternData.designer_id || '',
              name: patternData.profiles?.name || 'Designer desconhecido'
            },
            category: {
              id: patternData.category_id || '',
              name: patternData.categories?.name || 'Sem categoria'
            },
            difficulty: {
              id: patternData.difficulty_id || '',
              name: patternData.difficulty_levels?.name || 'Iniciante'
            },
            imageUrl: patternData.cover_image_url || 'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
            isFavorite: false
          });
        }
      } catch (error) {
        console.error('Erro ao buscar detalhes do padrão:', error);
        toast.error('Não foi possível carregar os detalhes do padrão');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (id) {
      fetchPattern();
    }
  }, [id, user]);

  const toggleFavorite = async () => {
    if (!user) {
      toast.error('Você precisa fazer login para adicionar favoritos');
      return;
    }
    
    try {
      if (isFavorite) {
        // Remove from favorites
        await supabase
          .from('favorites')
          .delete()
          .match({ user_id: user.id, pattern_id: id });
        
        toast.success('Removido dos favoritos');
      } else {
        // Add to favorites
        await supabase
          .from('favorites')
          .insert({ user_id: user.id, pattern_id: id });
        
        toast.success('Adicionado aos favoritos');
      }
      
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Erro ao atualizar favorito:', error);
      toast.error('Ocorreu um erro ao atualizar favorito');
    }
  };

  const startProject = () => {
    if (!user) {
      toast.error('Você precisa fazer login para iniciar um projeto');
      return;
    }
    
    window.location.href = `/patterns/${id}/steps`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Iniciante': return 'bg-green-100 text-green-800';
      case 'Intermediário': return 'bg-amber-100 text-amber-800';
      case 'Avançado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container px-4 py-8 md:px-6 flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!pattern) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container px-4 py-8 md:px-6">
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">Padrão não encontrado</p>
            <Button asChild className="mt-4">
              <Link to="/patterns">Voltar para o catálogo</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container px-4 py-8 md:px-6">
        <div className="mb-6">
          <Button variant="ghost" asChild className="pl-2 mb-2">
            <Link to="/patterns">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao catálogo
            </Link>
          </Button>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="aspect-square rounded-lg overflow-hidden border">
              <img
                src={pattern.imageUrl}
                alt={pattern.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold">{pattern.title}</h1>
              
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="secondary">
                  Por {pattern.designer.name}
                </Badge>
                <Badge variant="outline">
                  {pattern.category.name}
                </Badge>
                <Badge className={getDifficultyColor(pattern.difficulty.name)}>
                  {pattern.difficulty.name}
                </Badge>
              </div>
              
              <p className="mt-4 text-muted-foreground">
                {pattern.description || "Nenhuma descrição disponível."}
              </p>
              
              <div className="mt-auto flex flex-col sm:flex-row gap-3 pt-6">
                <Button onClick={startProject} className="flex-1">
                  <ListOrdered className="mr-2 h-4 w-4" />
                  Iniciar passo a passo
                </Button>
                <Button 
                  variant="outline" 
                  onClick={toggleFavorite}
                  className={`flex-1 ${isFavorite ? 'text-red-500 border-red-200' : ''}`}
                >
                  <Heart className={`mr-2 h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                  {isFavorite ? 'Favorito' : 'Favoritar'}
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share className="mr-2 h-4 w-4" />
                  Compartilhar
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <Tabs defaultValue="materials">
          <TabsList className="mb-6">
            <TabsTrigger value="materials">Materiais</TabsTrigger>
            <TabsTrigger value="instructions">Instruções</TabsTrigger>
          </TabsList>
          <TabsContent value="materials">
            <PatternMaterials patternId={pattern.id} />
          </TabsContent>
          <TabsContent value="instructions">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Instruções</h2>
              <Button variant="outline" onClick={startProject}>
                <Book className="mr-2 h-4 w-4" />
                Iniciar passo a passo
              </Button>
            </div>
            <p className="text-muted-foreground mb-4">
              Esse padrão possui um guia passo a passo interativo. Clique em "Iniciar passo a passo" para começar.
            </p>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}
