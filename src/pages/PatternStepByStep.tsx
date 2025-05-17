import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useProtectedRoute } from '@/hooks/use-protected-route';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';
import StitchCounter from '@/components/patterns/StitchCounter';
import { ArrowLeft, ArrowRight, Check, Flag, Home, ListChecks, Pencil, Save } from 'lucide-react';
import { Loader2 } from 'lucide-react';

interface Pattern {
  id: string;
  title: string;
  imageUrl: string;
}

interface Step {
  id: string;
  description: string;
  step_order: number;
  image_url: string | null;
  notes: string | null;
  stitch_count: number | null;
}

interface UserProject {
  id: string;
  current_step: number;
  progress: number;
  notes: string | null;
  started_at: string;
  last_updated_at: string;
  is_completed: boolean;
}

interface UserNote {
  id: string;
  content: string;
  step_id: string;
}

export default function PatternStepByStep() {
  useProtectedRoute(); // Protect this route
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  
  // State
  const [pattern, setPattern] = useState<Pattern | null>(null);
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [project, setProject] = useState<UserProject | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userNotes, setUserNotes] = useState<Record<string, string>>({});
  const [editingNote, setEditingNote] = useState(false);
  const [currentNote, setCurrentNote] = useState('');
  const [stitchCount, setStitchCount] = useState(0);

  // Current step
  const currentStep = steps[currentStepIndex];
  
  useEffect(() => {
    const fetchPatternAndSteps = async () => {
      if (!id || !user) return;
      setIsLoading(true);
      
      try {
        // Fetch pattern details
        const { data: patternData, error: patternError } = await supabase
          .from('patterns')
          .select('id, title, cover_image_url')
          .eq('id', id)
          .single();
        
        if (patternError) throw patternError;
        
        if (patternData) {
          setPattern({
            id: patternData.id,
            title: patternData.title,
            imageUrl: patternData.cover_image_url || ''
          });
          
          // Fetch steps
          const { data: stepsData, error: stepsError } = await supabase
            .from('steps')
            .select('*')
            .eq('pattern_id', id)
            .order('step_order', { ascending: true });
          
          if (stepsError) throw stepsError;
          
          if (stepsData && stepsData.length > 0) {
            setSteps(stepsData);
            
            // Fetch or create user project
            const { data: projectData, error: projectError } = await supabase
              .from('user_projects')
              .select('*')
              .match({ user_id: user.id, pattern_id: id })
              .maybeSingle();
            
            if (projectError) throw projectError;
            
            if (projectData) {
              // Existing project
              setProject(projectData);
              setCurrentStepIndex(projectData.current_step || 0);
              
              // Set stitch count from the current step
              const step = stepsData[projectData.current_step || 0];
              if (step && step.stitch_count !== null) {
                setStitchCount(step.stitch_count);
              }
            } else {
              // Create new project
              const { data: newProject, error: newProjectError } = await supabase
                .from('user_projects')
                .insert({
                  user_id: user.id,
                  pattern_id: id,
                  current_step: 0,
                  progress: 0,
                  is_completed: false,
                })
                .select()
                .single();
              
              if (newProjectError) throw newProjectError;
              
              if (newProject) {
                setProject(newProject);
                
                // Set stitch count from the first step
                const firstStep = stepsData[0];
                if (firstStep && firstStep.stitch_count !== null) {
                  setStitchCount(firstStep.stitch_count);
                }
              }
            }
            
            // Fetch user notes
            const { data: notesData, error: notesError } = await supabase
              .from('user_notes')
              .select('*')
              .match({ user_id: user.id, pattern_id: id });
            
            if (notesError) throw notesError;
            
            if (notesData) {
              const notesMap: Record<string, string> = {};
              notesData.forEach(note => {
                if (note.step_id) {
                  notesMap[note.step_id] = note.content;
                }
              });
              setUserNotes(notesMap);
              
              // Set current note
              if (stepsData[currentStepIndex] && notesMap[stepsData[currentStepIndex].id]) {
                setCurrentNote(notesMap[stepsData[currentStepIndex].id]);
              }
            }
          }
        }
      } catch (error) {
        console.error('Erro ao carregar dados do padrão:', error);
        toast.error('Erro ao carregar o padrão');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPatternAndSteps();
  }, [id, user]);
  
  useEffect(() => {
    // Update current note when step changes
    if (currentStep) {
      setCurrentNote(userNotes[currentStep.id] || '');
      if (currentStep.stitch_count !== null) {
        setStitchCount(currentStep.stitch_count);
      }
    }
  }, [currentStepIndex, currentStep, userNotes]);
  
  const nextStep = async () => {
    if (currentStepIndex < steps.length - 1) {
      const newIndex = currentStepIndex + 1;
      setCurrentStepIndex(newIndex);
      
      // Update project progress
      if (project) {
        const progress = Math.round((newIndex / (steps.length - 1)) * 100);
        
        await supabase
          .from('user_projects')
          .update({ 
            current_step: newIndex,
            progress,
            last_updated_at: new Date().toISOString()
          })
          .eq('id', project.id);
        
        setProject({
          ...project,
          current_step: newIndex,
          progress,
          last_updated_at: new Date().toISOString()
        });
        
        // Show toast for progress
        if (progress % 25 === 0) {
          toast.success(`Progresso: ${progress}% concluído!`);
        }
      }
    }
  };
  
  const prevStep = async () => {
    if (currentStepIndex > 0) {
      const newIndex = currentStepIndex - 1;
      setCurrentStepIndex(newIndex);
      
      // Update project
      if (project) {
        const progress = Math.round((newIndex / (steps.length - 1)) * 100);
        
        await supabase
          .from('user_projects')
          .update({ 
            current_step: newIndex,
            progress,
            last_updated_at: new Date().toISOString()
          })
          .eq('id', project.id);
        
        setProject({
          ...project,
          current_step: newIndex,
          progress,
          last_updated_at: new Date().toISOString()
        });
      }
    }
  };
  
  const saveNote = async () => {
    if (!currentStep || !user || !id) return;
    
    try {
      // Check if note exists
      const { data: existingNote } = await supabase
        .from('user_notes')
        .select('id')
        .match({
          user_id: user.id,
          pattern_id: id,
          step_id: currentStep.id
        })
        .maybeSingle();
      
      if (existingNote) {
        // Update existing note
        await supabase
          .from('user_notes')
          .update({ content: currentNote })
          .eq('id', existingNote.id);
      } else {
        // Create new note
        await supabase
          .from('user_notes')
          .insert({
            user_id: user.id,
            pattern_id: id,
            step_id: currentStep.id,
            content: currentNote
          });
      }
      
      // Update local state
      setUserNotes({
        ...userNotes,
        [currentStep.id]: currentNote
      });
      
      setEditingNote(false);
      toast.success('Anotação salva');
    } catch (error) {
      console.error('Erro ao salvar anotação:', error);
      toast.error('Erro ao salvar anotação');
    }
  };
  
  const completeProject = async () => {
    if (!project) return;
    
    try {
      await supabase
        .from('user_projects')
        .update({ 
          is_completed: true,
          progress: 100,
          last_updated_at: new Date().toISOString()
        })
        .eq('id', project.id);
      
      setProject({
        ...project,
        is_completed: true,
        progress: 100,
        last_updated_at: new Date().toISOString()
      });
      
      toast.success('Projeto concluído! Parabéns!');
    } catch (error) {
      console.error('Erro ao concluir projeto:', error);
      toast.error('Erro ao concluir projeto');
    }
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
  
  if (!pattern || steps.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container px-4 py-8 md:px-6">
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">Padrão não encontrado ou sem passos definidos</p>
            <Button asChild className="mt-4">
              <Link to="/patterns">Voltar para o catálogo</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container px-4 py-8 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <Button variant="ghost" asChild className="pl-2 mb-2">
              <Link to={`/patterns/${id}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar ao padrão
              </Link>
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold">{pattern.title}</h1>
          </div>
          
          <div className="flex items-center mt-4 md:mt-0">
            <Button variant="outline" asChild className="mr-2">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                <span className="hidden md:inline">Página Inicial</span>
              </Link>
            </Button>
            
            {project && !project.is_completed && (
              <Button onClick={completeProject}>
                <Check className="mr-2 h-4 w-4" />
                <span className="hidden md:inline">Concluir Projeto</span>
              </Button>
            )}
            
            {project && project.is_completed && (
              <Button disabled variant="secondary">
                <Flag className="mr-2 h-4 w-4" />
                <span className="hidden md:inline">Projeto Concluído</span>
              </Button>
            )}
          </div>
        </div>
        
        {project && (
          <div className="mb-6">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Progresso</span>
              <span>{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-2" />
          </div>
        )}
        
        <div className="grid gap-6 md:grid-cols-3">
          {/* Left column - Step details */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium text-muted-foreground">
                    Passo {currentStepIndex + 1} de {steps.length}
                  </span>
                  {currentStep.stitch_count && (
                    <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">
                      {currentStep.stitch_count} pontos
                    </span>
                  )}
                </div>
                
                <p className="text-lg mb-6">{currentStep.description}</p>
                
                {currentStep.image_url && (
                  <div className="aspect-video rounded-md overflow-hidden bg-muted mb-6">
                    <img 
                      src={currentStep.image_url} 
                      alt={`Passo ${currentStepIndex + 1}`} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                
                <div className="bg-muted/40 rounded-md p-4 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Suas anotações</h3>
                    {!editingNote ? (
                      <Button variant="ghost" size="sm" onClick={() => setEditingNote(true)}>
                        <Pencil className="h-4 w-4 mr-1" />
                        Editar
                      </Button>
                    ) : (
                      <Button variant="ghost" size="sm" onClick={saveNote}>
                        <Save className="h-4 w-4 mr-1" />
                        Salvar
                      </Button>
                    )}
                  </div>
                  
                  {editingNote ? (
                    <Textarea 
                      value={currentNote} 
                      onChange={(e) => setCurrentNote(e.target.value)}
                      placeholder="Adicione suas anotações aqui..."
                      rows={3}
                    />
                  ) : (
                    <div className="text-sm text-muted-foreground min-h-[60px]">
                      {currentNote ? (
                        <p>{currentNote}</p>
                      ) : (
                        <p className="italic">Sem anotações. Clique em editar para adicionar.</p>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between">
                  <Button 
                    onClick={prevStep}
                    disabled={currentStepIndex === 0}
                    variant="outline"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Anterior
                  </Button>
                  
                  {currentStepIndex < steps.length - 1 ? (
                    <Button onClick={nextStep}>
                      Próximo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button onClick={completeProject} disabled={project?.is_completed}>
                      <Check className="mr-2 h-4 w-4" />
                      Concluir
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Steps list for quick navigation */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <ListChecks className="h-5 w-5 mr-2" />
                  <h3 className="font-medium">Todos os Passos</h3>
                </div>
                
                <div className="space-y-1">
                  {steps.map((step, index) => (
                    <Button 
                      key={step.id}
                      variant={index === currentStepIndex ? "default" : "ghost"}
                      className="w-full justify-start h-auto py-2"
                      onClick={() => setCurrentStepIndex(index)}
                    >
                      <span className="w-6 text-sm font-medium">{index + 1}.</span>
                      <span className="text-left truncate">
                        {step.description.length > 60 
                          ? step.description.substring(0, 60) + '...' 
                          : step.description}
                      </span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right column - Tools */}
          <div className="space-y-6">
            <StitchCounter 
              initialCount={stitchCount}
              onCountChange={(count) => setStitchCount(count)}
            />
            
            {/* Pattern image */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">Visualização</h3>
                <div className="aspect-square rounded-md overflow-hidden bg-muted">
                  <img 
                    src={pattern.imageUrl} 
                    alt={pattern.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
