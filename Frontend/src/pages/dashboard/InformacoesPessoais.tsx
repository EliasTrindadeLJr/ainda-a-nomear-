import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';

const InformacoesPessoais = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Informações Pessoais</h1>
        <p className="text-muted-foreground">Visualize e gerencie suas informações cadastrais</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dados Cadastrais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Matrícula</Label>
              <Input value={user?.matricula} disabled />
            </div>
            <div className="space-y-2">
              <Label>Nome Completo</Label>
              <Input value={user?.nome} disabled />
            </div>
            <div className="space-y-2">
              <Label>Curso</Label>
              <Input value={user?.curso} disabled />
            </div>
            <div className="space-y-2">
              <Label>Situação</Label>
              <Input value="Ativo" disabled className="text-green-600" />
            </div>
            <div className="space-y-2">
              <Label>CPF</Label>
              <Input value="000.000.000-00" disabled />
            </div>
            <div className="space-y-2">
              <Label>Data de Nascimento</Label>
              <Input value="01/01/2000" disabled />
            </div>
            <div className="space-y-2">
              <Label>E-mail</Label>
              <Input value="aluno@meta.edu.br" disabled />
            </div>
            <div className="space-y-2">
              <Label>Telefone</Label>
              <Input value="(00) 00000-0000" disabled />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Endereço</Label>
            <Input value="Rua Exemplo, 123 - Bairro - Cidade/UF" disabled />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InformacoesPessoais;
