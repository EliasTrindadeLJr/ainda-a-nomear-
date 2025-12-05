import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import debounce from 'lodash.debounce';

interface Disciplina {
  id: string;
  nome: string;
  nota1?: number;
  nota2?: number;
  media?: number;
  faltas?: number;
}

interface Aluno {
  id: string;
  name: string;
}

const Boletins = () => {
  const { user, isAdmin } = useAuth();
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [periodo, setPeriodo] = useState<string>('2025/2');

  // Modal e campos
  const [open, setOpen] = useState(false);
  const [disciplinaNome, setDisciplinaNome] = useState("");
  const [nota1, setNota1] = useState("");
  const [nota2, setNota2] = useState("");
  const [faltas, setFaltas] = useState("");

  // Autocomplete de alunos
  const [buscaAluno, setBuscaAluno] = useState("");
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [alunoSelecionado, setAlunoSelecionado] = useState<Aluno | null>(null);
  const autocompleteRef = useRef<HTMLDivElement>(null);

  // Fetch boletins
  const fetchBoletins = async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3333/api/boletins/${user.id}`, {
        headers: { Authorization: token ? `Bearer ${token}` : '' }
      });
      if (!response.ok) throw new Error(await response.text() || "Erro ao buscar boletins");
      const data: Disciplina[] = await response.json();
      setDisciplinas(data);
    } catch (err: any) {
      setError(err.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoletins();
  }, [user, periodo]);

  // Buscar alunos com debounce
  const fetchAlunos = async (query: string) => {
    if (!query) return setAlunos([]);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3333/api/alunos?search=${query}`, {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });
      if (!response.ok) throw new Error("Erro ao buscar alunos");
      const data: Aluno[] = await response.json();
      setAlunos(data);
    } catch (err) {
      console.error(err);
    }
  };

  const debouncedFetchAlunos = debounce(fetchAlunos, 300);

  useEffect(() => {
    debouncedFetchAlunos(buscaAluno);
  }, [buscaAluno]);

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(event.target as Node)) {
        setAlunos([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Enviar nota
  const enviarNota = async () => {
    if (!isAdmin || !alunoSelecionado) {
      alert("Selecione um aluno válido para cadastrar a nota.");
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Você precisa estar logado.");
      return;
    }
    try {
      const response = await fetch("http://localhost:3333/api/boletins/nome", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          alunoNome: alunoSelecionado.name,
          disciplinaNome: disciplinaNome.trim(),
          nota1: Number(nota1),
          nota2: Number(nota2),
          faltas: Number(faltas)
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Erro ao criar nota");
      alert("Nota cadastrada com sucesso!");
      setOpen(false);
      setAlunoSelecionado(null);
      setDisciplinaNome("");
      setNota1("");
      setNota2("");
      setFaltas("");
      setBuscaAluno("");
      fetchBoletins();
    } catch (err: any) {
      alert("Erro ao cadastrar nota: " + (err.message || "Erro desconhecido"));
      console.error(err);
    }
  };

  if (!user) return <p>É necessário estar logado para acessar os boletins.</p>;
  if (loading) return <p>Carregando boletins...</p>;
  if (error) return <p className="text-red-500">Erro: {error}</p>;

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold">Minhas Disciplinas</h1>
          <p className="text-muted-foreground">Acompanhe suas notas e frequência</p>
        </div>

        {isAdmin && (
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
            {/* Autocomplete */}
            <div className="relative" ref={autocompleteRef}>
              <Input
                placeholder="Buscar aluno..."
                value={buscaAluno}
                onChange={(e) => {
                  setBuscaAluno(e.target.value);
                  setAlunoSelecionado(null);
                }}
              />
              {alunos.length > 0 && (
                <div className="absolute z-50 mt-1 w-full bg-white border rounded shadow max-h-48 overflow-y-auto">
                  {alunos.map((aluno) => (
                    <div
                      key={aluno.id}
                      className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => {
                        setAlunoSelecionado(aluno);
                        setBuscaAluno(aluno.name);
                        setAlunos([]);
                      }}
                    >
                      {aluno.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal para inserir nota */}
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="flex gap-2">
                  <Plus size={18} /> Inserir Nota
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Inserir Nota</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                  <div>
                    <Label>Disciplina</Label>
                    <Input
                      value={disciplinaNome}
                      onChange={(e) => setDisciplinaNome(e.target.value)}
                      placeholder="Ex: Matemática"
                    />
                  </div>
                  <div>
                    <Label>Nota 1</Label>
                    <Input
                      type="number"
                      value={nota1}
                      onChange={(e) => setNota1(e.target.value)}
                      placeholder="0.0"
                    />
                  </div>
                  <div>
                    <Label>Nota 2</Label>
                    <Input
                      type="number"
                      value={nota2}
                      onChange={(e) => setNota2(e.target.value)}
                      placeholder="0.0"
                    />
                  </div>
                  <div>
                    <Label>Faltas</Label>
                    <Input
                      type="number"
                      value={faltas}
                      onChange={(e) => setFaltas(e.target.value)}
                      placeholder="0"
                    />
                  </div>
                  <Button className="w-full" onClick={enviarNota}>
                    Salvar Nota
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>

      {/* Lista de disciplinas */}
      {disciplinas.length === 0 ? (
        <div className="p-6 text-center text-muted-foreground border rounded-lg">
          Nenhuma disciplina encontrada para este período.
        </div>
      ) : (
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
                    <span className="font-semibold">{disciplina.nota1?.toFixed(1) ?? '-'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">N2:</span>
                    <span className="font-semibold">{disciplina.nota2?.toFixed(1) ?? '-'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Média:</span>
                    <span className="font-semibold text-primary">{disciplina.media?.toFixed(2) ?? '-'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Faltas:</span>
                    <span className="font-semibold">{disciplina.faltas ?? '-'}</span>
                  </div>
                </div>

                <Button className="w-full" variant="default">
                  Acessar Disciplina
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Boletins;
