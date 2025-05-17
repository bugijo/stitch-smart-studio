import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Send, Bookmark } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';

interface Pattern {
  id: string;
  title: string;
  designer: {
    id: string;
    name: string;
    avatar?: string;
  };
  imageUrl: string;
  description: string;
  createdAt: string;
}

export default function Home() {
  const [featuredPatterns, setFeaturedPatterns] = useState<Pattern[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchFeaturedPatterns = async () => {
      setIsLoading(true);
      
      try {
        // Modify the query to not include profiles join since there's an error with the relation
        const { data, error } = await supabase
          .from('patterns')
          .select(`
            id,
            title,
            description,
            cover_image_url,
            created_at,
            designer_id
          `)
          .order('created_at', { ascending: false })
          .limit(10);
        
        if (error) throw error;
        
        if (data) {
          // Get unique designer IDs to fetch their profiles separately
          const designerIds = [...new Set(data.map(p => p.designer_id).filter(Boolean))];
          
          // Fetch designer profiles separately
          const { data: designersData } = await supabase
            .from('profiles')
            .select('id, name, avatar_url')
            .in('id', designerIds);
          
          // Create a map of designer profiles for easy lookup
          const designersMap = new Map();
          if (designersData) {
            designersData.forEach(designer => {
              designersMap.set(designer.id, {
                id: designer.id,
                name: designer.name || 'Designer desconhecido',
                avatar: designer.avatar_url
              });
            });
          }
          
          // Map patterns with their designers
          const formattedPatterns = data.map(pattern => {
            // Find the designer for this pattern
            let designer = { id: '', name: 'Designer desconhecido', avatar: '' };
            if (pattern.designer_id && designersMap.has(pattern.designer_id)) {
              designer = designersMap.get(pattern.designer_id);
            }
            
            return {
              id: pattern.id,
              title: pattern.title,
              designer: designer,
              imageUrl: pattern.cover_image_url || 'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
              description: pattern.description || '',
              createdAt: pattern.created_at
            };
          });
          
          setFeaturedPatterns(formattedPatterns);
        }
      } catch (error) {
        console.error('Erro ao buscar padrões em destaque:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFeaturedPatterns();
  }, []);
  
  // Formatação da data no estilo Instagram
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} segundos atrás`;
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} minutos atrás`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} horas atrás`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} dias atrás`;
    
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <Layout>
      <div className="container max-w-2xl px-4 py-6">
        {/* Stories section (simplified) */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex gap-4 py-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-600 p-0.5 flex items-center justify-center">
                  <div className="w-full h-full rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-lg font-bold text-white">
                    {String.fromCharCode(65 + i)}
                  </div>
                </div>
                <span className="text-xs mt-1">User{i+1}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Feed */}
        <div className="space-y-6">
          {isLoading ? (
            <p className="text-center py-8">Carregando padrões em destaque...</p>
          ) : (
            featuredPatterns.map(pattern => (
              <Card key={pattern.id} className="border shadow-sm">
                <CardHeader className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {pattern.designer.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <Link to={`/patterns/${pattern.id}`} className="font-semibold text-sm hover:underline">
                          {pattern.designer.name}
                        </Link>
                        <p className="text-xs text-muted-foreground">{pattern.title}</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-0">
                  <Link to={`/patterns/${pattern.id}`}>
                    <img src={pattern.imageUrl} alt={pattern.title} className="w-full aspect-square object-cover" />
                  </Link>
                </CardContent>
                
                <CardFooter className="flex flex-col items-start p-4">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-4">
                      <Heart className="h-6 w-6 cursor-pointer" />
                      <MessageCircle className="h-6 w-6 cursor-pointer" />
                      <Send className="h-6 w-6 cursor-pointer" />
                    </div>
                    <Bookmark className="h-6 w-6 cursor-pointer" />
                  </div>
                  
                  <div className="mt-3 space-y-2 w-full">
                    <p className="font-semibold text-sm">42 curtidas</p>
                    <p className="text-sm">
                      <Link to={`/patterns/${pattern.id}`} className="font-semibold mr-2">
                        {pattern.designer.name}
                      </Link>
                      {pattern.description.length > 80 
                        ? pattern.description.substring(0, 80) + '...' 
                        : pattern.description}
                    </p>
                    <Link to={`/patterns/${pattern.id}`} className="text-muted-foreground text-sm">
                      Ver mais
                    </Link>
                    <p className="text-muted-foreground text-xs uppercase">
                      {formatDate(pattern.createdAt)}
                    </p>
                  </div>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}
