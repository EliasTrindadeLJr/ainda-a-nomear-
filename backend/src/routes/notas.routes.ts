import { Router } from 'express';
import * as NotasController from '../controllers/notas.controller';
import { AdminOnly, authAdmin } from '../middleware/authAdmin';
import { Authentication } from '@/middleware/auth.middleware';


const router = Router();

router.get('/detalhe/:disciplinaId/:userId', NotasController.detalhe);
router.get('/:userId', NotasController.listarPorUsuario);

// Apenas admin pode criar ou atualizar
router.post('/', Authentication(), AdminOnly, NotasController.criar);
router.put('/:id', Authentication(), AdminOnly, NotasController.atualizar);

export default router;
