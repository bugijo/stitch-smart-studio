
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Pattern {
  id: string;
  title: string;
  designer: string;
  category: string;
  difficulty: "Iniciante" | "Intermediário" | "Avançado";
  imageUrl: string;
  isFavorite: boolean;
}

const popularPatterns: Pattern[] = [
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
    isFavorite: true
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

export default function PopularPatterns() {
  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Iniciante': return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'Intermediário': return 'bg-amber-100 text-amber-800 hover:bg-amber-200';
      case 'Avançado': return 'bg-red-100 text-red-800 hover:bg-red-200';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

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
          {popularPatterns.map((pattern) => (
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
                    onClick={(e) => {
                      e.preventDefault();
                      // Toggle favorite logic would go here
                    }}
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
