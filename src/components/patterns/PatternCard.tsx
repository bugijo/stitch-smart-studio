
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Pattern {
  id: string;
  title: string;
  designer: string;
  category: string;
  difficulty: string;
  imageUrl: string;
  isFavorite: boolean;
}

interface PatternCardProps {
  pattern: Pattern;
  onFavoriteToggle?: (patternId: string) => Promise<void>;
}

export default function PatternCard({ pattern, onFavoriteToggle }: PatternCardProps) {
  const [isFavorite, setIsFavorite] = useState(pattern.isFavorite);
  const { user } = useAuth();
  
  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Iniciante': return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'Intermediário': return 'bg-amber-100 text-amber-800 hover:bg-amber-200';
      case 'Avançado': return 'bg-red-100 text-red-800 hover:bg-red-200';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Você precisa fazer login para adicionar favoritos");
      return;
    }
    
    try {
      if (onFavoriteToggle) {
        // Use parent component's handler if provided
        await onFavoriteToggle(pattern.id);
      } else {
        // Default behavior
        if (isFavorite) {
          // Remove from favorites
          await supabase
            .from('favorites')
            .delete()
            .match({ user_id: user.id, pattern_id: pattern.id });
          
          toast.success("Removido dos favoritos");
        } else {
          // Add to favorites
          await supabase
            .from('favorites')
            .insert({ user_id: user.id, pattern_id: pattern.id });
          
          toast.success("Adicionado aos favoritos");
        }
        
        setIsFavorite(!isFavorite);
      }
    } catch (error) {
      console.error("Erro ao atualizar favorito:", error);
      toast.error("Ocorreu um erro ao atualizar favorito");
    }
  };

  return (
    <Link to={`/patterns/${pattern.id}`}>
      <Card className="overflow-hidden pattern-card h-full hover:shadow-md transition-all">
        <div className="relative aspect-square">
          <img
            src={pattern.imageUrl}
            alt={pattern.title}
            className="object-cover w-full h-full"
          />
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-2 right-2 rounded-full bg-white/80 backdrop-blur-sm ${isFavorite ? 'text-red-500' : 'text-gray-500'}`}
            onClick={toggleFavorite}
          >
            <Heart className={isFavorite ? "fill-current" : ""} size={18} />
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
  );
}
