
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Heart, MessageCircle, Send, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Designer {
  id: string;
  name: string;
  avatar?: string;
}

interface PostCardProps {
  id: string;
  title: string;
  designer: Designer;
  imageUrl: string;
  description: string;
  createdAt: string;
}

export default function PostCard({ id, title, designer, imageUrl, description, createdAt }: PostCardProps) {
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
    <Card key={id} className="border shadow-sm">
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>
                {designer.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <Link to={`/patterns/${id}`} className="font-semibold text-sm hover:underline">
                {designer.name}
              </Link>
              <p className="text-xs text-muted-foreground">{title}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <Link to={`/patterns/${id}`}>
          <img src={imageUrl} alt={title} className="w-full aspect-square object-cover" />
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
            <Link to={`/patterns/${id}`} className="font-semibold mr-2">
              {designer.name}
            </Link>
            {description.length > 80 
              ? description.substring(0, 80) + '...' 
              : description}
          </p>
          <Link to={`/patterns/${id}`} className="text-muted-foreground text-sm">
            Ver mais
          </Link>
          <p className="text-muted-foreground text-xs uppercase">
            {formatDate(createdAt)}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
