import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Eye } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const mockBoletos = [
  { id: 1, vencimento: '10/01/2025', valor: 'R$ 850,00', status: 'Pendente' },
  { id: 2, vencimento: '10/12/2024', valor: 'R$ 850,00', status: 'Pago' },
  { id: 3, vencimento: '10/11/2024', valor: 'R$ 850,00', status: 'Pago' },
  { id: 4, vencimento: '10/10/2024', valor: 'R$ 850,00', status: 'Pago' },
];

const Boletos = () => {
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
              {mockBoletos.map((boleto) => (
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
