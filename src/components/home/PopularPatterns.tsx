
import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

interface Pattern {
  id: string;
  title: string;
  designer: string;
  category: string;
  difficulty: "Iniciante" | "Intermediário" | "Avançado";
  imageUrl: string;
  isFavorite: boolean;
}

export default function PopularPatterns() {
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPatterns = async () => {
      try {
        // Buscar padrões populares (por enquanto todos os públicos)
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
            difficulty_levels (name)
          `)
          .eq('is_public', true)
          .limit(4);
        
        if (patternsError) throw patternsError;

        // Buscar informações dos designers (profiles) separadamente
        let designerData = {};
        if (patternsData) {
          const designerIds = patternsData
            .filter(pattern => pattern.designer_id)
            .map(pattern => pattern.designer_id);
            
          if (designerIds.length > 0) {
            const { data: designersData, error: designersError } = await supabase
              .from('profiles')
              .select('id, name')
              .in('id', designerIds);
            
            if (!designersError && designersData) {
              designerData = designersData.reduce((acc, profile) => {
                acc[profile.id] = profile.name;
                return acc;
              }, {});
            }
          }
        }

        // Se o usuário estiver logado, buscar favoritos
        let favorites: string[] = [];
        if (user) {
          const { data: favoritesData, error: favoritesError } = await supabase
            .from('favorites')
            .select('pattern_id')
            .eq('user_id', user.id);
          
          if (!favoritesError && favoritesData) {
            favorites = favoritesData.map(fav => fav.pattern_id);
          }
        }

        // Transformar dados
        if (patternsData) {
          const formattedPatterns: Pattern[] = patternsData.map(pattern => ({
            id: pattern.id,
            title: pattern.title,
            designer: pattern.designer_id ? (designerData[pattern.designer_id] || "Designer desconhecido") : "Designer desconhecido",
            category: pattern.categories?.name || "Sem categoria",
            difficulty: (pattern.difficulty_levels?.name as "Iniciante" | "Intermediário" | "Avançado") || "Iniciante",
            imageUrl: pattern.cover_image_url || "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
            isFavorite: favorites.includes(pattern.id)
          }));
          
          setPatterns(formattedPatterns);
        }
      } catch (error) {
        console.error("Erro ao buscar padrões:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPatterns();
  }, [user]);

  const toggleFavorite = async (e: React.MouseEvent, patternId: string) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Você precisa fazer login para adicionar favoritos");
      return;
    }
    
    const pattern = patterns.find(p => p.id === patternId);
    if (!pattern) return;
    
    try {
      if (pattern.isFavorite) {
        // Remover dos favoritos
        await supabase
          .from('favorites')
          .delete()
          .match({ user_id: user.id, pattern_id: patternId });
        
        toast.success("Removido dos favoritos");
      } else {
        // Adicionar aos favoritos
        await supabase
          .from('favorites')
          .insert({ user_id: user.id, pattern_id: patternId });
        
        toast.success("Adicionado aos favoritos");
      }
      
      // Atualizar estado local
      setPatterns(patterns.map(p => 
        p.id === patternId ? { ...p, isFavorite: !p.isFavorite } : p
      ));
    } catch (error) {
      console.error("Erro ao atualizar favorito:", error);
      toast.error("Ocorreu um erro ao atualizar favorito");
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Iniciante': return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'Intermediário': return 'bg-amber-100 text-amber-800 hover:bg-amber-200';
      case 'Avançado': return 'bg-red-100 text-red-800 hover:bg-red-200';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  if (isLoading) {
    return (
      <section className="py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Padrões Populares</h2>
              <p className="text-muted-foreground">Carregando padrões populares...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Se não encontramos padrões, mostrar dados de exemplo
  const patternsToDisplay = patterns.length > 0 ? patterns : [
    {
      id: "1",
      title: "Bolsa Floral",
      designer: "Maria Silva",
      category: "Bolsas",
      difficulty: "Intermediário",
      imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
      isFavorite: false
    },
    {
      id: "2",
      title: "Amigurumi Gatinho",
      designer: "João Pereira",
      category: "Amigurumi",
      difficulty: "Iniciante",
      imageUrl: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
      isFavorite: false
    },
    {
      id: "3",
      title: "Xale Rendado",
      designer: "Ana Torres",
      category: "Vestuário",
      difficulty: "Avançado",
      imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
      isFavorite: false
    },
    {
      id: "4",
      title: "Tapete Circular",
      designer: "Carlos Mendes",
      category: "Decoração",
      difficulty: "Intermediário",
      imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      isFavorite: false
    }
  ];

  return (
    <section className="py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Padrões Populares</h2>
            <p className="text-muted-foreground">Explore os padrões mais amados pela nossa comunidade</p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/patterns">Ver todos os padrões</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {patternsToDisplay.map((pattern) => (
            <Link to={`/patterns/${pattern.id}`} key={pattern.id}>
              <Card className="overflow-hidden pattern-card h-full">
                <div className="relative aspect-square">
                  <img
                    src={pattern.imageUrl}
                    alt={pattern.title}
                    className="object-cover w-full h-full"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`absolute top-2 right-2 rounded-full bg-white/80 backdrop-blur-sm ${pattern.isFavorite ? 'text-red-500' : 'text-gray-500'}`}
                    onClick={(e) => toggleFavorite(e, pattern.id)}
                  >
                    <Heart className={pattern.isFavorite ? "fill-current" : ""} size={18} />
                  </Button>
                  <Badge className={`absolute bottom-2 left-2 ${getDifficultyColor(pattern.difficulty)}`}>
                    {pattern.difficulty}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-1 line-clamp-1">{pattern.title}</h3>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{pattern.designer}</span>
                    <Badge variant="outline" className="font-normal">
                      {pattern.category}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
