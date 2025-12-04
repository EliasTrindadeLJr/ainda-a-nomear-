import { Router } from 'express';
import * as NotasController from '../controllers/notas.controller';

const router = Router();

router.get('/:userId', NotasController.listarPorUsuario);
router.get('/detalhe/:disciplinaId/:userId', NotasController.detalhe);
router.post('/', NotasController.criar);
router.put('/:id', NotasController.atualizar);

export default router;
