import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

const mockDisciplinas = [
  {
    nome: 'ALGORITMOS E PROGRAMAÇÃO',
    nota1: 8.5,
    nota2: 7.0,
    media: 7.75,
    faltas: 2,
  },
  {
    nome: 'HUMANIDADES E DIVERSIDADES',
    nota1: 9.0,
    nota2: 8.5,
    media: 8.75,
    faltas: 0,
  },
  {
    nome: 'INTRODUÇÃO À ENGENHARIA DE COMPUTAÇÃO',
    nota1: 7.5,
    nota2: 8.0,
    media: 7.75,
    faltas: 1,
  },
];

const Boletins = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Minhas Disciplinas</h1>
          <p className="text-muted-foreground">Acompanhe suas notas e frequência</p>
        </div>
        <Select defaultValue="2025/2">
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
        {mockDisciplinas.map((disciplina, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
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
