
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MinusCircle, PlusCircle, RotateCcw } from 'lucide-react';

interface StitchCounterProps {
  initialCount?: number;
  onCountChange?: (count: number) => void;
}

export default function StitchCounter({ initialCount = 0, onCountChange }: StitchCounterProps) {
  const [count, setCount] = useState(initialCount);
  const [targetCount, setTargetCount] = useState(0);
  const [showTarget, setShowTarget] = useState(false);
  const [history, setHistory] = useState<number[]>([initialCount]);
  
  useEffect(() => {
    if (onCountChange) {
      onCountChange(count);
    }
  }, [count, onCountChange]);
  
  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    setHistory([...history, newCount]);
  };
  
  const decrement = () => {
    if (count > 0) {
      const newCount = count - 1;
      setCount(newCount);
      setHistory([...history, newCount]);
    }
  };
  
  const reset = () => {
    setCount(initialCount);
    setHistory([initialCount]);
  };
  
  const undo = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setCount(newHistory[newHistory.length - 1]);
      setHistory(newHistory);
    }
  };
  
  const toggleTarget = () => {
    setShowTarget(!showTarget);
    if (!showTarget) {
      setTargetCount(count);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contador de Pontos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center">
          <div className="text-6xl font-bold">{count}</div>
          {showTarget && (
            <div className="text-sm text-muted-foreground mt-1">
              Meta: {targetCount} | Faltam: {targetCount - count > 0 ? targetCount - count : "0"}
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          <Button 
            variant="outline" 
            size="lg" 
            className="h-16 text-2xl" 
            onClick={decrement}
          >
            <MinusCircle className="h-6 w-6" />
          </Button>
          <Button 
            variant="default" 
            size="lg" 
            className="h-16 text-2xl"
            onClick={increment}
          >
            <PlusCircle className="h-6 w-6" />
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="h-16"
            onClick={undo}
          >
            <RotateCcw className="h-5 w-5" />
          </Button>
        </div>
        
        {showTarget && (
          <div className="space-y-2 mt-4">
            <Label htmlFor="target-count">Meta de pontos</Label>
            <Input 
              id="target-count"
              type="number"
              min="0"
              value={targetCount}
              onChange={(e) => setTargetCount(parseInt(e.target.value) || 0)}
            />
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" onClick={toggleTarget}>
            {showTarget ? "Esconder Meta" : "Definir Meta"}
          </Button>
          <Button variant="outline" onClick={reset}>
            Reiniciar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
