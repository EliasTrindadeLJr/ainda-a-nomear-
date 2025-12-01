import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import DashboardLayout from "./components/DashboardLayout";
import InformacoesPessoais from "./pages/dashboard/InformacoesPessoais";
import Boletos from "./pages/dashboard/Boletos";
import Boletins from "./pages/dashboard/Boletins";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/dashboard/informacoes" replace />} />
              <Route path="informacoes" element={<InformacoesPessoais />} />
              <Route path="boletos" element={<Boletos />} />
              <Route path="boletins" element={<Boletins />} />
              <Route path="mensagem" element={<div className="text-center py-12 text-muted-foreground">Mensagens em desenvolvimento</div>} />
              <Route path="horarios" element={<div className="text-center py-12 text-muted-foreground">Horários em desenvolvimento</div>} />
              <Route path="historico" element={<div className="text-center py-12 text-muted-foreground">Histórico em desenvolvimento</div>} />
              <Route path="biblioteca" element={<div className="text-center py-12 text-muted-foreground">Biblioteca em desenvolvimento</div>} />
              <Route path="secretaria" element={<div className="text-center py-12 text-muted-foreground">Secretaria em desenvolvimento</div>} />
              <Route path="calendario" element={<div className="text-center py-12 text-muted-foreground">Calendário em desenvolvimento</div>} />
              <Route path="acompanhamento" element={<div className="text-center py-12 text-muted-foreground">Acompanhamento em desenvolvimento</div>} />
              <Route path="blog" element={<div className="text-center py-12 text-muted-foreground">Blog em desenvolvimento</div>} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
