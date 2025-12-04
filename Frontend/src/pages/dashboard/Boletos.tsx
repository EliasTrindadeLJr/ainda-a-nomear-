import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Eye } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Boleto {
  id: string;
  vencimento: string;
  valor: string;
  status: 'Pago' | 'Pendente';
}

const Boletos = () => {
  const { user } = useAuth();
  const [boletos, setBoletos] = useState<Boleto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // só busca se houver usuário logado
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchBoletos = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3333/boletos/${user.id}`);
        if (!response.ok) {
          const text = await response.text();
          throw new Error(text || 'Erro ao buscar boletos');
        }
        const data: Boleto[] = await response.json();
        setBoletos(data);
      } catch (err: any) {
        setError(err.message || 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchBoletos();
  }, [user]);

  if (!user) return <p>Você precisa estar logado para ver seus boletos.</p>;
  if (loading) return <p>Carregando boletos...</p>;
  if (error) return <p className="text-red-500">Erro: {error}</p>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Boletos e Extrato</h1>
        <p className="text-muted-foreground">Visualize e faça download dos seus boletos</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Boletos Disponíveis</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vencimento</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {boletos.map((boleto) => (
                <TableRow key={boleto.id}>
                  <TableCell>{boleto.vencimento}</TableCell>
                  <TableCell className="font-medium">{boleto.valor}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        boleto.status === 'Pago'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {boleto.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      Visualizar
                    </Button>
                    <Button size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Baixar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Boletos;