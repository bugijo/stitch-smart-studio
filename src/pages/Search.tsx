
import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search as SearchIcon, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';

interface SearchResult {
  id: string;
  title: string;
  imageUrl: string;
  type: 'pattern' | 'designer' | 'category';
}

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    // Load recent searches from localStorage
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim().length > 2) {
        performSearch();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const performSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    
    try {
      // Search patterns
      const { data: patterns, error: patternsError } = await supabase
        .from('patterns')
        .select('id, title, cover_image_url')
        .ilike('title', `%${searchQuery}%`)
        .limit(5);
      
      if (patternsError) throw patternsError;
      
      const formattedResults: SearchResult[] = patterns?.map(pattern => ({
        id: pattern.id,
        title: pattern.title,
        imageUrl: pattern.cover_image_url || 'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
        type: 'pattern'
      })) || [];

      // Here you could add more search queries for designers, categories, etc.
      
      setResults(formattedResults);
    } catch (error) {
      console.error('Erro ao buscar resultados:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    // Save search to recent searches
    if (!recentSearches.includes(searchQuery)) {
      const updatedSearches = [searchQuery, ...recentSearches].slice(0, 5);
      setRecentSearches(updatedSearches);
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    }
    
    performSearch();
  };

  const clearSearch = () => {
    setSearchQuery('');
    setResults([]);
  };

  const removeRecentSearch = (search: string) => {
    const updatedSearches = recentSearches.filter(item => item !== search);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };

  return (
    <Layout>
      <div className="container max-w-2xl px-4 py-6">
        <div className="mb-6">
          <div className="relative">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar padrões, designers, categorias..."
              className="pl-10 pr-10"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            {searchQuery && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-1" 
                onClick={clearSearch}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-12 w-12 rounded-md" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            ))}
          </div>
        ) : results.length > 0 ? (
          <div className="space-y-4">
            {results.map((result) => (
              <Link key={result.id} to={`/patterns/${result.id}`} className="flex items-center gap-3 p-2 hover:bg-accent rounded-md transition-colors">
                <img src={result.imageUrl} alt={result.title} className="h-12 w-12 rounded-md object-cover" />
                <div>
                  <p className="font-medium">{result.title}</p>
                  <p className="text-sm text-muted-foreground capitalize">{result.type}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : searchQuery ? (
          <p className="text-center text-muted-foreground py-8">Nenhum resultado encontrado para "{searchQuery}"</p>
        ) : (
          <div>
            <h3 className="font-medium mb-3">Buscas recentes</h3>
            {recentSearches.length > 0 ? (
              <div className="space-y-1">
                {recentSearches.map((search, index) => (
                  <div key={index} className="flex items-center justify-between p-2 hover:bg-accent rounded-md transition-colors">
                    <button 
                      onClick={() => {
                        setSearchQuery(search);
                        performSearch();
                      }}
                      className="flex-1 text-left"
                    >
                      {search}
                    </button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6" 
                      onClick={() => removeRecentSearch(search)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">Nenhuma busca recente</p>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
