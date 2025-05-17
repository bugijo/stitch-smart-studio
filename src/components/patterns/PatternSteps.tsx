import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Loader2 } from 'lucide-react';

interface Step {
  id: string;
  step_order: number;
  description: string;
  image_url: string | null;
  notes: string | null;
  stitch_count: number | null;
}

interface PatternStepsProps {
  steps?: Step[];
  patternId?: string;
  showPreview?: boolean;
  onStepComplete?: (step: number, totalSteps: number) => void;
}

export default function PatternSteps({ 
  steps: initialSteps, 
  patternId, 
  showPreview = false,
  onStepComplete 
}: PatternStepsProps) {
  const [steps, setSteps] = useState<Step[]>(initialSteps || []);
  const [isLoading, setIsLoading] = useState(!initialSteps && Boolean(patternId));

  useEffect(() => {
    // If steps were provided as props, use those
    if (initialSteps?.length) {
      setSteps(initialSteps);
      return;
    }
    
    // Otherwise, if patternId is provided, fetch steps
    if (patternId) {
      const fetchSteps = async () => {
        setIsLoading(true);
        
        try {
          const { data, error } = await supabase
            .from('steps')
            .select('*')
            .eq('pattern_id', patternId)
            .order('step_order', { ascending: true });
          
          if (error) throw error;
          
          if (data) {
            setSteps(data);
          }
        } catch (error) {
          console.error('Erro ao buscar passos:', error);
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchSteps();
    }
  }, [patternId, initialSteps]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (steps.length === 0) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground">Nenhuma instrução passo a passo encontrada para este padrão.</p>
      </Card>
    );
  }

  // If showPreview is true, only show a limited number of steps
  const stepsToShow = showPreview ? steps.slice(0, 2) : steps;

  return (
    <div className="space-y-6">
      {stepsToShow.map((step) => (
        <Card key={step.id} className="p-6">
          <h3 className="text-lg font-medium mb-2">Passo {step.step_order}</h3>
          {step.stitch_count && (
            <p className="text-sm text-muted-foreground mb-2">
              Total de pontos: {step.stitch_count}
            </p>
          )}
          <Separator className="my-3" />
          <div className="grid gap-4 md:grid-cols-2">
            {step.image_url && (
              <div className="aspect-square rounded-md overflow-hidden border">
                <img 
                  src={step.image_url} 
                  alt={`Passo ${step.step_order}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div>
              <p className="mb-4">{step.description}</p>
              {step.notes && (
                <div className="bg-muted p-3 rounded-md text-sm">
                  <p className="font-medium mb-1">Notas:</p>
                  <p>{step.notes}</p>
                </div>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
