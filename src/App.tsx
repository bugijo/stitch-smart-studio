
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Catalog from "./pages/Catalog";
import PatternDetail from "./pages/PatternDetail";
import PatternStepByStep from "./pages/PatternStepByStep";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Páginas
import Learn from "./pages/Learn";
import Community from "./pages/Community";
import Market from "./pages/Market";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";
import Models from "./pages/Models";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/home" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/cadastro" element={<Register />} />
              <Route path="/search" element={<Search />} />
              <Route path="/patterns" element={<Catalog />} />
              <Route path="/models" element={<Models />} />
              <Route path="/patterns/:id" element={<PatternDetail />} />
              <Route path="/patterns/:id/steps" element={
                <ProtectedRoute>
                  <PatternStepByStep />
                </ProtectedRoute>
              } />
              <Route path="/favorites" element={
                <ProtectedRoute>
                  <Favorites />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              
              {/* Rotas */}
              <Route path="/aprenda" element={<Learn />} />
              <Route path="/aprenda/:id" element={<PatternDetail />} />
              <Route path="/comunidade" element={<Community />} />
              <Route path="/mercado" element={<Market />} />
              <Route path="/mercado/produto/:id" element={<PatternDetail />} />
              <Route path="/perfil" element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              } />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
