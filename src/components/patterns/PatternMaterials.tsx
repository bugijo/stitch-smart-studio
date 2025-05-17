
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import { Json } from '@/integrations/supabase/types';

interface Material {
  id: string;
  name: string;
  quantity: string;
  brand: string | null;
  color: string | null;
  alternatives: Json | null;
}

interface PatternMaterialsProps {
  patternId: string;
}

export default function PatternMaterials({ patternId }: PatternMaterialsProps) {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMaterials = async () => {
      setIsLoading(true);
      
      try {
        const { data, error } = await supabase
          .from('materials')
          .select('*')
          .eq('pattern_id', patternId);
        
        if (error) throw error;
        
        if (data) {
          setMaterials(data as Material[]);
        }
      } catch (error) {
        console.error('Erro ao buscar materiais:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMaterials();
  }, [patternId]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (materials.length === 0) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground">Nenhum material encontrado para este padrão.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Lista de Materiais</h3>
        <ul className="space-y-3">
          {materials.map((material) => (
            <li key={material.id} className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-3">
              <div className="flex-1">
                <p className="font-medium">{material.name}</p>
                <p className="text-sm text-muted-foreground">
                  {material.brand && `${material.brand}${material.color ? ', ' : ''}`}
                  {material.color && `${material.color}`}
                </p>
              </div>
              <div className="mt-2 sm:mt-0">
                <Badge variant="outline">{material.quantity}</Badge>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
