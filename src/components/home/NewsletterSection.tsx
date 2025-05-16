
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulating API call
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail('');
      toast({
        title: "Inscrição confirmada!",
        description: "Você receberá novidades e padrões exclusivos em seu email.",
      });
    }, 1000);
  };

  return (
    <section className="py-12">
      <div className="container px-4 md:px-6">
        <div className="rounded-xl bg-muted/50 border shadow-sm p-6 md:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Fique por dentro das novidades
                </h2>
                <p className="max-w-[600px] text-muted-foreground">
                  Inscreva-se para receber padrões exclusivos, tutoriais e dicas de crochê diretamente na sua caixa de entrada.
                </p>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2">
                <div className="flex-1">
                  <Input 
                    type="email" 
                    placeholder="Seu email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-11"
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="h-11"
                >
                  {isSubmitting ? 'Inscrevendo...' : 'Inscrever-se'}
                </Button>
              </form>
              <p className="text-xs text-muted-foreground">
                Ao se inscrever, você concorda com nossa política de privacidade. Nós respeitamos sua privacidade.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
