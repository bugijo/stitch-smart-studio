
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <div className="container px-4 py-16 text-center">
          <div className="relative mx-auto w-40 h-40 mb-8">
            <div className="w-full h-full rounded-full bg-muted animate-pulse-gentle"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-display text-6xl font-bold text-foreground/80">404</div>
            <div className="absolute -bottom-4 -right-4 w-12 h-12 rounded-full bg-yarn-lavender/30 animate-float"></div>
            <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-yarn-sage/30 animate-float" style={{ animationDelay: '1s' }}></div>
          </div>
          <h1 className="font-display text-3xl font-bold mb-4">Página não encontrada</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
            Ops! Parece que você se perdeu em alguns pontos de crochê. Vamos voltar ao início?
          </p>
          <Button asChild size="lg">
            <Link to="/">Voltar para a página inicial</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
