
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import PostCard from './PostCard';

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

export default function FeedSection() {
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

  return (
    <div className="space-y-6">
      {isLoading ? (
        <p className="text-center py-8">Carregando padrões em destaque...</p>
      ) : (
        featuredPatterns.map(pattern => (
          <PostCard 
            key={pattern.id}
            id={pattern.id}
            title={pattern.title}
            designer={pattern.designer}
            imageUrl={pattern.imageUrl}
            description={pattern.description}
            createdAt={pattern.createdAt}
          />
        ))
      )}
    </div>
  );
}
