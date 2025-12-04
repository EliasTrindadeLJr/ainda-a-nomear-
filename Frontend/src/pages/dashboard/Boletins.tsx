import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface Disciplina {
  id: string;
  nome: string;
  nota1: number;
  nota2: number;
  media: number;
  faltas: number;
}

const Boletins = () => {
  const { user, isAdmin } = useAuth();
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [periodo, setPeriodo] = useState<string>('2025/2');

  useEffect(() => {
    if (!user) return;

    const fetchBoletins = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3333/api/boletins/${user.id}`);
        if (!response.ok) {
          const text = await response.text();
          throw new Error(text || 'Erro ao buscar boletins');
        }
        const data: Disciplina[] = await response.json();
        setDisciplinas(data);
      } catch (err: any) {
        setError(err.message || 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchBoletins();
  }, [user, periodo]);

  if (!user) return <p>É necessário estar logado para acessar os boletins.</p>;
  if (loading) return <p>Carregando boletins...</p>;
  if (error) return <p className="text-red-500">Erro: {error}</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Minhas Disciplinas</h1>
          <p className="text-muted-foreground">Acompanhe suas notas e frequência</p>
        </div>
        <Select value={periodo} onValueChange={setPeriodo}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione o período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2025/2">2025/2</SelectItem>
            <SelectItem value="2025/1">2025/1</SelectItem>
            <SelectItem value="2024/2">2024/2</SelectItem>
          </SelectContent>
        </Select>
        
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {disciplinas.map((disciplina) => (
          <Card key={disciplina.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-muted rounded-lg">
                  <BookOpen className="h-5 w-5 text-muted-foreground" />
                </div>
                <CardTitle className="text-sm leading-tight">{disciplina.nome}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-muted-foreground">
                Não existe nenhuma publicação disponível
              </div>
              <div className="pt-2 border-t space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">N1:</span>
                  <span className="font-semibold">{disciplina.nota1.toFixed(1)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">N2:</span>
                  <span className="font-semibold">{disciplina.nota2.toFixed(1)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Média:</span>
                  <span className="font-semibold text-primary">{disciplina.media.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Faltas:</span>
                  <span className="font-semibold">{disciplina.faltas}</span>
                </div>
              </div>

              {isAdmin && (
                <Button className="w-full" variant="destructive">
                  Inserir/Editar Nota
                </Button>
              )}


              <Button className="w-full" variant="default">
                Acessar Disciplina
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Boletins;
