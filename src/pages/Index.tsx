
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BookOpen, Users, ShoppingBag, ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-b from-background to-muted/30">
          {/* Decorative elements */}
          <div className="absolute top-20 right-[10%] w-20 h-20 rounded-full bg-yarn-lavender/20 animate-float" />
          <div className="absolute bottom-10 left-[5%] w-32 h-32 rounded-full bg-yarn-sage/20 animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute top-40 left-[15%] w-16 h-16 rounded-full bg-yarn-terracotta/20 animate-float" style={{ animationDelay: '2s' }} />
          
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-display">
                    Crie, Aprenda e Compartilhe sua Arte Manual
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl mt-4">
                    Uma comunidade para amantes de crochê, tricô, bordado e macramê, com tutoriais, projetos e produtos digitais.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row mt-6">
                  <Button size="lg" className="inline-flex items-center justify-center" asChild>
                    <Link to="/cadastro">Começar Agora</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="inline-flex items-center justify-center" asChild>
                    <Link to="/aprenda">Explorar Tutoriais</Link>
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

        {/* Three Main Areas */}
        <section className="py-16 bg-background">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl font-display">O que oferecemos</h2>
              <p className="mt-4 text-muted-foreground md:text-lg max-w-2xl mx-auto">
                Nossa plataforma é dedicada a criar um ecossistema completo para artesãos de todos os níveis
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {/* Aprenda */}
              <div className="bg-card rounded-xl p-6 shadow-sm border flex flex-col">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Aprenda do Zero</h3>
                <p className="text-muted-foreground flex-grow mb-6">
                  Tutoriais passo a passo para todos os níveis, desde o básico até técnicas avançadas de crochê, tricô e outras artes manuais.
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/aprenda" className="flex items-center justify-between">
                    Ver Tutoriais <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>

              {/* Comunidade */}
              <div className="bg-card rounded-xl p-6 shadow-sm border flex flex-col">
                <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Compartilhe Projetos</h3>
                <p className="text-muted-foreground flex-grow mb-6">
                  Mostre suas criações, receba feedback, inspire-se com projetos de outros artesãos e construa uma comunidade de criativos.
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/comunidade" className="flex items-center justify-between">
                    Explorar Comunidade <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>

              {/* Mercado */}
              <div className="bg-card rounded-xl p-6 shadow-sm border flex flex-col">
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <ShoppingBag className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">Venda seus Conhecimentos</h3>
                <p className="text-muted-foreground flex-grow mb-6">
                  Transforme suas habilidades em renda vendendo receitas, apostilas ou vídeos tutoriais para entusiastas de artesanato.
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/mercado" className="flex items-center justify-between">
                    Visitar Mercado <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Destaques da Comunidade */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl font-display">Destaques da Comunidade</h2>
                <p className="mt-2 text-muted-foreground md:text-lg">
                  Projetos que nossos artesãos estão compartilhando
                </p>
              </div>
              <Button variant="ghost" className="mt-4 md:mt-0" asChild>
                <Link to="/comunidade">Ver todos <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((project) => (
                <div key={project} className="rounded-xl overflow-hidden border bg-card shadow-sm transition-all hover:shadow-md">
                  <div className="aspect-square w-full overflow-hidden">
                    <img 
                      src={`https://images.unsplash.com/photo-${project === 1 ? '1582562124811-c09040d0a901' : project === 2 ? '1465146344425-f00d5f5c8f07' : '1618160702438-9b02ab6515c9'}`}
                      alt={`Projeto da comunidade ${project}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        U
                      </div>
                      <span className="font-medium text-sm">Usuário{project}</span>
                    </div>
                    <h3 className="font-bold mb-1">Projeto incrível #{project}</h3>
                    <p className="text-sm text-muted-foreground">Uma bela peça de crochê feita com linha especial e muita dedicação.</p>
                    <div className="flex items-center gap-2 mt-4">
                      <Button variant="ghost" size="sm">♥ 42</Button>
                      <Button variant="ghost" size="sm">💬 12</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tutoriais em Destaque */}
        <section className="py-16 bg-background">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl font-display">Tutoriais em Destaque</h2>
                <p className="mt-2 text-muted-foreground md:text-lg">
                  Aprenda com nossos tutoriais mais populares
                </p>
              </div>
              <Button variant="ghost" className="mt-4 md:mt-0" asChild>
                <Link to="/aprenda">Ver todos <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((tutorial) => (
                <div key={tutorial} className="rounded-xl overflow-hidden border bg-card shadow-sm hover:shadow-md transition-all">
                  <div className="aspect-video w-full overflow-hidden relative">
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center">
                        <div className="w-0 h-0 border-y-8 border-y-transparent border-l-12 border-l-primary ml-1"></div>
                      </div>
                    </div>
                    <img 
                      src={`https://images.unsplash.com/photo-${tutorial === 1 ? '1465146344425-f00d5f5c8f07' : tutorial === 2 ? '1618160702438-9b02ab6515c9' : '1582562124811-c09040d0a901'}`}
                      alt={`Tutorial ${tutorial}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-medium bg-primary/10 text-primary rounded-full px-2 py-1">Nível: Iniciante</span>
                      <span className="text-xs text-muted-foreground">15 min</span>
                    </div>
                    <h3 className="font-bold mb-1">Como fazer um lindo {tutorial === 1 ? 'amigurumi' : tutorial === 2 ? 'cachecol' : 'porta-copos'}</h3>
                    <p className="text-sm text-muted-foreground">Aprenda passo a passo como criar esta peça incrível de forma simples e rápida.</p>
                    <div className="mt-4">
                      <Button size="sm" asChild>
                        <Link to={`/aprenda/tutorial-${tutorial}`}>Começar Tutorial</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mercado em Destaque */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl font-display">Produtos em Destaque</h2>
                <p className="mt-2 text-muted-foreground md:text-lg">
                  Produtos digitais criados pela nossa comunidade
                </p>
              </div>
              <Button variant="ghost" className="mt-4 md:mt-0" asChild>
                <Link to="/mercado">Ver todos <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((product) => (
                <div key={product} className="rounded-xl overflow-hidden border bg-card shadow-sm hover:shadow-md transition-all">
                  <div className="aspect-[4/5] w-full overflow-hidden">
                    <img 
                      src={`https://images.unsplash.com/photo-${product === 1 ? '1582562124811-c09040d0a901' : product === 2 ? '1465146344425-f00d5f5c8f07' : product === 3 ? '1618160702438-9b02ab6515c9' : '1721322800607-8c38375eef04'}`}
                      alt={`Produto ${product}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-medium bg-secondary/10 text-secondary rounded-full px-2 py-1">
                        {product === 1 ? 'PDF' : product === 2 ? 'Vídeo' : product === 3 ? 'Curso' : 'Apostila'}
                      </span>
                      <span className="flex items-center text-xs">
                        ★★★★☆
                      </span>
                    </div>
                    <h3 className="font-bold mb-1">
                      {product === 1 ? 'Receita Amigurumi Coelho' : product === 2 ? 'Curso Básico de Tricô' : product === 3 ? 'Apostila Macramê' : 'Guia de Bordados'}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">Por: Artesão{product}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">R$ {10 + product * 5},00</span>
                      <Button size="sm" className="text-xs">Comprar</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary/10">
          <div className="container px-4 md:px-6 mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl font-display mb-4">
              Faça parte da nossa comunidade
            </h2>
            <p className="md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Junte-se a milhares de artesãos, compartilhe suas criações, aprenda novas técnicas e até mesmo venda seus conhecimentos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/cadastro">Criar Conta</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/aprenda">Explorar Tutoriais</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
