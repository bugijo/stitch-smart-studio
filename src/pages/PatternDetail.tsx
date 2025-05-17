
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/layout/Layout';
import PatternMaterials from '@/components/patterns/PatternMaterials';
import PatternSteps from '@/components/patterns/PatternSteps';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Heart, Share2, Bookmark } from 'lucide-react';
import { toast } from 'sonner';

export default function PatternDetail() {
  const { id } = useParams<{ id: string }>();
  const [patternData, setPatternData] = useState<any>(null);
  const [materials, setMaterials] = useState([]);
  const [steps, setSteps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const { user } = useAuth();
  
  useEffect(() => {
    const fetchPatternData = async () => {
      setIsLoading(true);
      
      try {
        // Fetch pattern details
        const { data: patternData, error: patternError } = await supabase
          .from('patterns')
          .select(`
            *,
            categories (*),
            difficulty_levels (*),
            profiles (*)
          `)
          .eq('id', id)
          .single();
        
        if (patternError) throw patternError;
        
        // Fetch materials for this pattern
        const { data: materialsData, error: materialsError } = await supabase
          .from('materials')
          .select('*')
          .eq('pattern_id', id);
        
        if (materialsError) throw materialsError;
        
        // Fetch steps for this pattern
        const { data: stepsData, error: stepsError } = await supabase
          .from('steps')
          .select('*')
          .eq('pattern_id', id)
          .order('step_order', { ascending: true });
        
        if (stepsError) throw stepsError;
        
        // Check if the pattern is in user's favorites
        let isFav = false;
        if (user) {
          const { data: favData } = await supabase
            .from('favorites')
            .select('id')
            .eq('pattern_id', id)
            .eq('user_id', user.id)
            .maybeSingle();
          
          isFav = Boolean(favData);
        }
        
        setPatternData(patternData);
        setMaterials(materialsData || []);
        setSteps(stepsData || []);
        setIsFavorite(isFav);
      } catch (error) {
        console.error('Erro ao carregar os dados do padrão:', error);
        toast.error('Não foi possível carregar os detalhes do padrão');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (id) {
      fetchPatternData();
    }
  }, [id, user]);
  
  const handleToggleFavorite = async () => {
    if (!user) {
      toast.error('Você precisa fazer login para adicionar favoritos');
      return;
    }
    
    try {
      if (isFavorite) {
        // Remover dos favoritos
        await supabase
          .from('favorites')
          .delete()
          .match({ user_id: user.id, pattern_id: id });
        
        toast.success('Removido dos favoritos');
      } else {
        // Adicionar aos favoritos
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
  
  if (isLoading) {
    return (
      <Layout>
        <div className="container py-8 flex flex-col items-center">
          <p>Carregando detalhes do padrão...</p>
        </div>
      </Layout>
    );
  }
  
  if (!patternData) {
    return (
      <Layout>
        <div className="container py-8 flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-4">Padrão não encontrado</h1>
          <p className="mb-6">O padrão que você está procurando não existe ou foi removido.</p>
          <Button asChild>
            <Link to="/patterns">Voltar para o catálogo</Link>
          </Button>
        </div>
      </Layout>
    );
  }
  
  const designerName = patternData.profiles ? patternData.profiles.name || 'Designer desconhecido' : 'Designer desconhecido';
  
  return (
    <Layout>
      <div className="container max-w-4xl py-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Pattern image */}
          <div className="w-full md:w-1/2">
            <div className="aspect-square rounded-md overflow-hidden border bg-muted">
              <img 
                src={patternData.cover_image_url || 'https://images.unsplash.com/photo-1582562124811-c09040d0a901'} 
                alt={patternData.title} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Pattern info */}
          <div className="w-full md:w-1/2">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-2xl sm:text-3xl font-bold">{patternData.title}</h1>
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handleToggleFavorite}
                  className={isFavorite ? 'text-red-500' : ''}
                >
                  <Heart className={isFavorite ? "fill-current" : ""} />
                </Button>
                <Button variant="ghost" size="icon">
                  <Share2 />
                </Button>
              </div>
            </div>
            
            {/* Designer info */}
            <div className="flex items-center gap-3 mb-6">
              <Avatar>
                <AvatarFallback>
                  {designerName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{designerName}</p>
                <p className="text-sm text-muted-foreground">Designer</p>
              </div>
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {patternData.categories && (
                <Badge variant="secondary">
                  {patternData.categories.name}
                </Badge>
              )}
              {patternData.difficulty_levels && (
                <Badge variant="outline">
                  {patternData.difficulty_levels.name}
                </Badge>
              )}
            </div>
            
            {/* Description */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Descrição</h2>
              <p className="text-muted-foreground">{patternData.description || 'Sem descrição disponível'}</p>
            </div>
            
            {/* Action buttons */}
            <div className="flex flex-col gap-3">
              <Button asChild>
                <Link to={`/patterns/${id}/steps`}>Iniciar Projeto</Link>
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Bookmark size={18} /> Salvar para mais tarde
              </Button>
            </div>
          </div>
        </div>
        
        {/* Tabs for materials and steps preview */}
        <Tabs defaultValue="materials" className="mt-12">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="materials">Materiais</TabsTrigger>
            <TabsTrigger value="instructions">Instruções</TabsTrigger>
          </TabsList>
          <TabsContent value="materials" className="py-4">
            <PatternMaterials materials={materials} />
          </TabsContent>
          <TabsContent value="instructions" className="py-4">
            <PatternSteps steps={steps.slice(0, 2)} showPreview={true} />
            {steps.length > 2 && (
              <div className="text-center mt-8">
                <Button asChild>
                  <Link to={`/patterns/${id}/steps`}>Ver todas as instruções</Link>
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
