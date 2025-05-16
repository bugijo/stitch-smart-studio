
import { Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function FeaturesSection() {
  const features = [
    {
      title: "Instruções Passo a Passo",
      description: "Tutorial interativo que guia você ponto a ponto com contador integrado e opção de fazer anotações.",
      icon: (
        <div className="rounded-lg p-2 bg-primary/10 text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>
        </div>
      )
    },
    {
      title: "Modo Gráfico Avançado",
      description: "Visualize gráficos vetoriais interativos com zoom e legendas detalhadas dos símbolos de crochê.",
      icon: (
        <div className="rounded-lg p-2 bg-secondary/10 text-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-grid-2x2"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 12h18"/><path d="M12 3v18"/></svg>
        </div>
      )
    },
    {
      title: "Importação de PDF com IA",
      description: "Transforme seus PDFs em padrões interativos automaticamente com nossa tecnologia de extração inteligente.",
      icon: (
        <div className="rounded-lg p-2 bg-accent/10 text-accent-foreground">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
        </div>
      )
    },
    {
      title: "Sincronização Multi-dispositivo",
      description: "Continue seu projeto em qualquer lugar, com sincronização perfeita entre todos os seus dispositivos.",
      icon: (
        <div className="rounded-lg p-2 bg-primary/10 text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
        </div>
      )
    }
  ];

  return (
    <section className="py-12 bg-muted/30 border-y">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              Recursos Exclusivos
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Transforme a maneira como você cria e aprende crochê
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              CrochêLab combina tecnologia avançada com uma experiência intuitiva para artesãos de todos os níveis
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-10">
          <div className="mx-auto aspect-square w-full max-w-md overflow-hidden rounded-xl border bg-yarn-cream shadow">
            <div className="p-6 h-full flex flex-col justify-between">
              <div className="space-y-2 mb-4">
                <h3 className="font-display text-xl font-medium">Modo Passo a Passo</h3>
                <p className="text-sm text-muted-foreground">
                  Acompanhe facilmente cada etapa do seu projeto
                </p>
              </div>
              <div className="flex flex-col space-y-4 flex-grow">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Passo 1</h4>
                    <p className="text-xs text-muted-foreground">Faça um nó e crie 10 correntes.</p>
                    <div className="mt-1 flex items-center space-x-2">
                      <button className="stitch-btn bg-muted w-6 h-6">-</button>
                      <span className="text-xs font-medium">8</span>
                      <button className="stitch-btn bg-muted w-6 h-6">+</button>
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <input type="checkbox" className="step-checkbox" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Passo 2</h4>
                    <p className="text-xs text-muted-foreground">Faça 1 ponto baixo em cada corrente (10 pontos).</p>
                    <div className="mt-1 flex items-center space-x-2">
                      <button className="stitch-btn bg-muted w-6 h-6">-</button>
                      <span className="text-xs font-medium">5</span>
                      <button className="stitch-btn bg-muted w-6 h-6">+</button>
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <input type="checkbox" className="step-checkbox" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Passo 3</h4>
                    <p className="text-xs text-muted-foreground">Faça 2 correntes, vire o trabalho.</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-8">
                <button className="text-xs flex items-center justify-center bg-muted hover:bg-muted/80 text-muted-foreground px-3 py-1.5 rounded">Anterior</button>
                <span className="text-xs text-muted-foreground">2/15</span>
                <button className="text-xs flex items-center justify-center bg-primary hover:bg-primary/80 text-primary-foreground px-3 py-1.5 rounded">Próximo</button>
              </div>
            </div>
          </div>
          <div className="grid gap-6">
            {features.map((feature, i) => (
              <Card key={i} className="overflow-hidden border">
                <CardContent className="p-6 flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
