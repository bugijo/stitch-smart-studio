
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function ImportCTA() {
  return (
    <section className="py-16 bg-primary/5">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-72 h-96 bg-white rounded-lg shadow-lg border p-4 transform rotate-3">
                <div className="h-6 w-full bg-gray-100 rounded mb-4"></div>
                <div className="h-4 w-3/4 bg-gray-100 rounded mb-2"></div>
                <div className="h-4 w-1/2 bg-gray-100 rounded mb-4"></div>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="aspect-square bg-gray-100 rounded"></div>
                  <div className="aspect-square bg-gray-100 rounded"></div>
                </div>
                <div className="h-4 w-full bg-gray-100 rounded mb-2"></div>
                <div className="h-4 w-full bg-gray-100 rounded mb-2"></div>
                <div className="h-4 w-3/4 bg-gray-100 rounded"></div>
              </div>
              <div className="absolute top-6 -left-6 transform -rotate-6 w-72 h-96 bg-white rounded-lg shadow-lg border p-4">
                <div className="h-40 w-full bg-gray-100 rounded mb-4"></div>
                <div className="h-4 w-3/4 bg-gray-100 rounded mb-2"></div>
                <div className="h-4 w-1/2 bg-gray-100 rounded mb-4"></div>
                <div className="h-4 w-full bg-gray-100 rounded mb-2"></div>
                <div className="h-4 w-full bg-gray-100 rounded mb-2"></div>
                <div className="h-4 w-3/4 bg-gray-100 rounded"></div>
              </div>
              <div className="absolute -top-6 left-6 w-20 h-20 rounded-full bg-yarn-lavender/30 animate-float"></div>
              <div className="absolute bottom-4 -right-8 w-16 h-16 rounded-full bg-yarn-sage/30 animate-float" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                Novo
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Importe seus PDFs com nossa tecnologia de IA
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Transforme facilmente seus padrões em PDF em guias interativos com um simples upload. Nossa tecnologia de IA identifica materiais, instruções e gráficos automaticamente.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" asChild>
                <Link to="/import">Importar PDF agora</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/how-it-works">Saiba como funciona</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
