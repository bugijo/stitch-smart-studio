
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

export interface PatternMaterialsProps {
  materials?: Material[];
  patternId?: string;
}

export default function PatternMaterials({ materials: initialMaterials, patternId }: PatternMaterialsProps) {
  const [materials, setMaterials] = useState<Material[]>(initialMaterials || []);
  const [isLoading, setIsLoading] = useState(!initialMaterials && Boolean(patternId));

  useEffect(() => {
    // If materials were provided as props, use those
    if (initialMaterials?.length) {
      setMaterials(initialMaterials);
      return;
    }
    
    // Otherwise, if patternId is provided, fetch materials
    if (patternId) {
      const fetchMaterials = async () => {
        setIsLoading(true);
        
        try {
          const { data, error } = await supabase
            .from('materials')
            .select('*')
            .eq('pattern_id', patternId);
          
          if (error) throw error;
          
          if (data) {
            // Type assertion to ensure data matches our Material interface
            const typedMaterials: Material[] = data.map(item => ({
              id: item.id,
              name: item.name,
              quantity: item.quantity,
              brand: item.brand,
              color: item.color,
              alternatives: item.alternatives
            }));
            setMaterials(typedMaterials);
          }
        } catch (error) {
          console.error('Erro ao buscar materiais:', error);
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchMaterials();
    }
  }, [patternId, initialMaterials]);

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
