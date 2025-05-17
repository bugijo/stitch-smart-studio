
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { ChevronLeft, ChevronRight, Home, CheckCircle, XCircle } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';

interface Pattern {
  id: string;
  title: string;
}

interface Step {
  id: string;
  step_order: number;
  description: string;
  image_url: string | null;
  notes: string | null;
  stitch_count: number | null;
}

interface UserProject {
  id: string;
  current_step: number;
  progress: number;
  notes: string | null;
}

export default function PatternStepByStep() {
  const { id } = useParams();
  const { user } = useAuth();
  const [pattern, setPattern] = useState<Pattern | null>(null);
  const [steps, setSteps] = useState<Step[]>([]);
  const [userProject, setUserProject] = useState<UserProject | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [userNotes, setUserNotes] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Calculate progress percentage
  const progressPercentage = steps.length > 0 
    ? Math.round(((currentStepIndex + 1) / steps.length) * 100) 
    : 0;

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      toast.error('Você precisa fazer login para acessar o modo passo a passo');
      window.location.href = `/patterns/${id}`;
      return;
    }
    
    const fetchData = async () => {
      setIsLoading(true);
      
      try {
        // Fetch pattern details
        const { data: patternData, error: patternError } = await supabase
          .from('patterns')
          .select('id, title')
          .eq('id', id)
          .single();
        
        if (patternError) throw patternError;
        
        if (patternData) {
          setPattern(patternData);
        }
        
        // Fetch steps
        const { data: stepsData, error: stepsError } = await supabase
          .from('steps')
          .select('*')
          .eq('pattern_id', id)
          .order('step_order', { ascending: true });
        
        if (stepsError) throw stepsError;
        
        if (stepsData) {
          setSteps(stepsData);
        }
        
        // Check if user has an existing project
        const { data: projectData, error: projectError } = await supabase
          .from('user_projects')
          .select('*')
          .match({ user_id: user.id, pattern_id: id })
          .maybeSingle();
        
        if (projectError) throw projectError;
        
        if (projectData) {
          setUserProject(projectData);
          setCurrentStepIndex(projectData.current_step || 0);
          
          // Fetch user notes for the current step
          if (stepsData && stepsData[projectData.current_step || 0]) {
            const currentStepId = stepsData[projectData.current_step || 0].id;
            
            const { data: notesData } = await supabase
              .from('user_notes')
              .select('content')
              .match({ 
                user_id: user.id, 
                pattern_id: id, 
                step_id: currentStepId 
              })
              .maybeSingle();
            
            if (notesData) {
              setUserNotes(notesData.content);
            }
          }
        } else {
          // Create a new user project
          const { data: newProject, error: newProjectError } = await supabase
            .from('user_projects')
            .insert({
              user_id: user.id,
              pattern_id: id,
              current_step: 0,
              progress: 0,
              started_at: new Date().toISOString(),
              last_updated_at: new Date().toISOString()
            })
            .select()
            .single();
          
          if (newProjectError) throw newProjectError;
          
          if (newProject) {
            setUserProject(newProject);
          }
        }
      } catch (error) {
        console.error('Erro ao carregar projeto:', error);
        toast.error('Ocorreu um erro ao carregar o projeto');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [id, user]);

  const navigateStep = async (direction: 'prev' | 'next') => {
    if (!user || !userProject) return;
    
    const newIndex = direction === 'next' 
      ? Math.min(currentStepIndex + 1, steps.length - 1)
      : Math.max(currentStepIndex - 1, 0);
    
    if (newIndex === currentStepIndex) return;
    
    setIsSaving(true);
    
    try {
      // Save user notes for the current step if they exist
      if (userNotes.trim() && steps[currentStepIndex]) {
        await supabase
          .from('user_notes')
          .upsert({
            user_id: user.id,
            pattern_id: id,
            step_id: steps[currentStepIndex].id,
            content: userNotes
          })
          .select();
      }
      
      // Update user project progress
      await supabase
        .from('user_projects')
        .update({
          current_step: newIndex,
          progress: Math.round(((newIndex + 1) / steps.length) * 100),
          last_updated_at: new Date().toISOString()
        })
        .eq('id', userProject.id);
      
      // Update state
      setCurrentStepIndex(newIndex);
      setUserProject({
        ...userProject,
        current_step: newIndex,
        progress: Math.round(((newIndex + 1) / steps.length) * 100)
      });
      
      // Clear and load notes for the new step
      setUserNotes('');
      
      if (steps[newIndex]) {
        const { data: notesData } = await supabase
          .from('user_notes')
          .select('content')
          .match({ 
            user_id: user.id, 
            pattern_id: id, 
            step_id: steps[newIndex].id 
          })
          .maybeSingle();
        
        if (notesData) {
          setUserNotes(notesData.content);
        }
      }
    } catch (error) {
      console.error('Erro ao atualizar progresso:', error);
      toast.error('Ocorreu um erro ao atualizar seu progresso');
    } finally {
      setIsSaving(false);
    }
  };

  const saveUserNotes = async () => {
    if (!user || !userProject || !steps[currentStepIndex]) return;
    
    setIsSaving(true);
    
    try {
      await supabase
        .from('user_notes')
        .upsert({
          user_id: user.id,
          pattern_id: id,
          step_id: steps[currentStepIndex].id,
          content: userNotes
        })
        .select();
      
      toast.success('Anotações salvas com sucesso');
    } catch (error) {
      console.error('Erro ao salvar anotações:', error);
      toast.error('Ocorreu um erro ao salvar suas anotações');
    } finally {
      setIsSaving(false);
    }
  };

  const markAsComplete = async () => {
    if (!user || !userProject) return;
    
    setIsSaving(true);
    
    try {
      await supabase
        .from('user_projects')
        .update({
          is_completed: true,
          progress: 100,
          last_updated_at: new Date().toISOString()
        })
        .eq('id', userProject.id);
      
      toast.success('Parabéns! Projeto marcado como concluído');
      
      // Update state
      setUserProject({
        ...userProject,
        is_completed: true,
        progress: 100
      });
    } catch (error) {
      console.error('Erro ao marcar como concluído:', error);
      toast.error('Ocorreu um erro ao marcar o projeto como concluído');
    } finally {
      setIsSaving(false);
    }
  };

  const getCurrentStep = () => {
    if (!steps.length || currentStepIndex >= steps.length) {
      return null;
    }
    
    return steps[currentStepIndex];
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container px-4 py-8 md:px-6 flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  const currentStep = getCurrentStep();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container px-4 py-8 md:px-6">
        {/* Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div>
            <Button variant="ghost" asChild className="pl-2 mb-2">
              <Link to={`/patterns/${id}`}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Voltar aos detalhes
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">{pattern?.title}</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" asChild>
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Página Inicial
              </Link>
            </Button>
            {userProject?.is_completed ? (
              <Button variant="outline" disabled className="bg-green-50 text-green-700 border-green-200">
                <CheckCircle className="mr-2 h-4 w-4" />
                Concluído
              </Button>
            ) : (
              <Button 
                variant="outline" 
                onClick={markAsComplete}
                disabled={isSaving}
                className={isSaving ? 'opacity-50' : ''}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Marcar como Concluído
              </Button>
            )}
          </div>
        </div>
        
        {/* Progress */}
        <Card className="p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progresso</span>
            <span className="text-sm font-medium">{progressPercentage}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>Passo {currentStepIndex + 1}</span>
            <span>Total: {steps.length} passos</span>
          </div>
        </Card>
        
        {/* Step Content */}
        {currentStep ? (
          <div className="mb-8">
            <Card className="p-6">
              <h2 className="text-xl font-medium mb-2">
                Passo {currentStep.step_order}: {steps.length} de {steps.length}
              </h2>
              {currentStep.stitch_count && (
                <p className="text-sm text-muted-foreground mb-2">
                  Total de pontos: {currentStep.stitch_count}
                </p>
              )}
              <Separator className="my-4" />
              <div className="grid gap-6 md:grid-cols-2">
                {currentStep.image_url && (
                  <div className="aspect-square rounded-md overflow-hidden border">
                    <img 
                      src={currentStep.image_url} 
                      alt={`Passo ${currentStep.step_order}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <p className="mb-4">{currentStep.description}</p>
                  {currentStep.notes && (
                    <div className="bg-muted p-3 rounded-md text-sm mb-4">
                      <p className="font-medium mb-1">Notas:</p>
                      <p>{currentStep.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
            
            {/* User Notes */}
            <Card className="mt-6 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Suas Anotações</h3>
                <Button 
                  onClick={saveUserNotes}
                  disabled={isSaving}
                  size="sm"
                >
                  {isSaving ? 'Salvando...' : 'Salvar Anotações'}
                </Button>
              </div>
              <Textarea 
                value={userNotes} 
                onChange={(e) => setUserNotes(e.target.value)}
                placeholder="Adicione suas anotações para este passo..."
                className="min-h-[120px]"
              />
            </Card>
          </div>
        ) : (
          <Card className="p-6 text-center">
            <XCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-xl font-medium mb-2">Nenhum passo encontrado</p>
            <p className="text-muted-foreground mb-4">
              Este padrão não possui instruções passo a passo.
            </p>
            <Button asChild>
              <Link to={`/patterns/${id}`}>Voltar aos detalhes</Link>
            </Button>
          </Card>
        )}
        
        {/* Navigation Buttons */}
        {steps.length > 0 && (
          <div className="flex justify-between mt-8">
            <Button
              onClick={() => navigateStep('prev')}
              disabled={currentStepIndex === 0 || isSaving}
              variant="outline"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Passo Anterior
            </Button>
            <Button
              onClick={() => navigateStep('next')}
              disabled={currentStepIndex === steps.length - 1 || isSaving}
            >
              Próximo Passo
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
