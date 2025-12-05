import { Router } from 'express';
import * as NotasController from '../controllers/notas.controller';
import { Authentication } from '../middleware/auth.middleware';
import { AdminOnly } from '@/middleware/authAdmin';

const router = Router();

router.get('/detalhe/:disciplinaId/:userId', NotasController.detalhe);
router.get('/:userId', NotasController.listarPorUsuario);
router.get('/alunos', Authentication(), AdminOnly, NotasController.listarAlunos);

// Apenas admin pode criar notas
router.post("/nome", Authentication(), AdminOnly, NotasController.criarPorNome);
router.post('/', Authentication(), AdminOnly, NotasController.criar);
router.put('/:id', Authentication(), AdminOnly, NotasController.atualizar);

export default router;
