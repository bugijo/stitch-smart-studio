
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Zoom } from '@/components/ui/zoom';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface PatternGraphProps {
  patternId: string;
}

export default function PatternGraph({ patternId }: PatternGraphProps) {
  const [activeView, setActiveView] = useState<'simple' | 'advanced'>('simple');
  
  // Sample data - in a real application, this would come from the API
  const stitchData = [
    { name: 'Ponto Baixo', value: 60, color: '#4f46e5' },
    { name: 'Ponto Alto', value: 25, color: '#ef4444' },
    { name: 'Correntinha', value: 15, color: '#10b981' },
  ];
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Visualização do Gráfico</h3>
        <Tabs value={activeView} onValueChange={(v) => setActiveView(v as 'simple' | 'advanced')}>
          <TabsList>
            <TabsTrigger value="simple">Simples</TabsTrigger>
            <TabsTrigger value="advanced">Avançado</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <Card className="overflow-hidden">
        <TabsContent value="simple" className="m-0">
          <div className="p-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stitchData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {stitchData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-muted-foreground text-center mt-2">
              Distribuição de pontos neste padrão
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="advanced" className="m-0">
          <div className="relative">
            <div className="h-[400px] border-t flex justify-center items-center">
              <Zoom>
                <div className="p-6">
                  <img 
                    src="https://images.unsplash.com/photo-1582562124811-c09040d0a901"
                    alt="Gráfico avançado"
                    className="max-w-full h-auto"
                  />
                </div>
              </Zoom>
            </div>
            <div className="absolute bottom-4 right-4 space-x-2">
              <Button variant="outline" size="sm">-</Button>
              <Button variant="outline" size="sm">+</Button>
              <Button variant="outline" size="sm">↻</Button>
            </div>
          </div>
          <div className="p-4 border-t">
            <h4 className="font-medium mb-2">Legenda</h4>
            <div className="flex flex-wrap gap-3">
              {['Ponto Baixo', 'Ponto Alto', 'Correntinha', 'Aumento', 'Diminuição'].map((symbol) => (
                <div key={symbol} className="flex items-center">
                  <div className="w-4 h-4 bg-primary mr-2" />
                  <span className="text-sm">{symbol}</span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Card>
    </div>
  );
}
