
export interface Pattern {
  id: string;
  title: string;
  description: string;
  designer: string;
  category: string;
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  imageUrl: string;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Material {
  id: string;
  name: string;
  quantity: string;
  color?: string;
  brand?: string;
  alternatives?: string[];
}

export interface Step {
  id: string;
  description: string;
  imageUrl?: string;
  stitchCount?: number;
  notes?: string;
  isCompleted: boolean;
}

export interface PatternDetails extends Pattern {
  materials: Material[];
  steps: Step[];
  graph?: string; // URL to graph visualization
  symbols?: Record<string, string>; // Map of symbols used in the graph
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface Project {
  id: string;
  patternId: string;
  patternTitle: string;
  progress: number;
  currentStep: number;
  startedAt: string;
  lastUpdatedAt: string;
  notes?: string;
  isCompleted: boolean;
}

export interface Category {
  id: string;
  name: string;
  count: number;
  icon: React.ReactNode;
}
