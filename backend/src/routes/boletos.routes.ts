import { Router, Request, Response } from 'express';
import * as BoletosService from '../services/boleto.service';

const router = Router();

// Detalhe de um boleto
router.get('/detalhe/:id', (req: Request, res: Response) => {
  const boleto = BoletosService.listarPorUsuario('').find(b => b.id === req.params.id);
  if (!boleto) return res.status(404).json({ message: 'Boleto não encontrado' });
  res.json(boleto);
});

// Listar boletos por usuário (gera automaticamente se não existir)
router.get('/:userId', (req: Request, res: Response) => {
  const { userId } = req.params;
  const boletos = BoletosService.listarPorUsuario(userId);
  res.json(boletos);
});

export default router;
