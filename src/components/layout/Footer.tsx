
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t py-8 bg-muted/40">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-yarn-lavender via-yarn-sage to-yarn-terracotta flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-white"></div>
              </div>
              <span className="font-display text-lg font-bold">CrochêLab</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Uma plataforma para artesãos de crochê compartilharem e aprenderem padrões.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-sm mb-3">Explorar</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/patterns" className="text-muted-foreground hover:text-primary transition-colors">Catálogo</Link></li>
              <li><Link to="/categories" className="text-muted-foreground hover:text-primary transition-colors">Categorias</Link></li>
              <li><Link to="/designers" className="text-muted-foreground hover:text-primary transition-colors">Designers</Link></li>
              <li><Link to="/tutorials" className="text-muted-foreground hover:text-primary transition-colors">Tutoriais</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-sm mb-3">Recursos</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">Termos de Uso</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Política de Privacidade</Link></li>
              <li><Link to="/help" className="text-muted-foreground hover:text-primary transition-colors">Ajuda</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contato</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-sm mb-3">Mantenha-se Conectado</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Receba novidades e padrões exclusivos.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">Instagram</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">Pinterest</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide"><path d="M8 12a4 4 0 1 0 8 0 4 4 0 0 0-8 0z"/><path d="M12 2v2"/><path d="M12 16v6"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t text-center text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} CrochêLab. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
