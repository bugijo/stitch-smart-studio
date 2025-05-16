
import React from 'react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="relative py-12 md:py-24 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-[10%] w-20 h-20 rounded-full bg-yarn-lavender/20 animate-float" />
      <div className="absolute bottom-10 left-[5%] w-32 h-32 rounded-full bg-yarn-sage/20 animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-40 left-[15%] w-16 h-16 rounded-full bg-yarn-terracotta/20 animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl/none">
                Crie, Aprenda e Compartilhe Padrões de Crochê
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                A plataforma ideal para artesãos de todos os níveis, com instruções passo a passo, gráficos interativos e uma comunidade colaborativa.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="inline-flex items-center justify-center">
                Explorar Catálogo
              </Button>
              <Button size="lg" variant="outline" className="inline-flex items-center justify-center">
                Importar Padrão PDF
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-xl bg-yarn-cream border shadow-lg">
              <div className="flex items-center justify-center w-full h-full p-6">
                <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                  <div className="aspect-square rounded-lg bg-yarn-lavender/30 animate-pulse-gentle p-3 flex items-center justify-center">
                    <img src="https://images.unsplash.com/photo-1582562124811-c09040d0a901" alt="Crochê colorido" className="rounded object-cover" />
                  </div>
                  <div className="aspect-square rounded-lg bg-yarn-sage/30 animate-pulse-gentle p-3 flex items-center justify-center" style={{ animationDelay: '0.5s' }}>
                    <img src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07" alt="Trabalho em andamento" className="rounded object-cover" />
                  </div>
                  <div className="aspect-square rounded-lg bg-yarn-terracotta/30 animate-pulse-gentle p-3 flex items-center justify-center" style={{ animationDelay: '1s' }}>
                    <img src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9" alt="Amostra de crochê" className="rounded object-cover" />
                  </div>
                  <div className="aspect-square rounded-lg bg-yarn-violet/30 animate-pulse-gentle p-3 flex items-center justify-center" style={{ animationDelay: '1.5s' }}>
                    <img src="https://images.unsplash.com/photo-1721322800607-8c38375eef04" alt="Projeto finalizado" className="rounded object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
