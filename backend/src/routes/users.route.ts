import { Router } from 'express';
import * as UsersController from '../controllers/users.controller.js';

const router = Router();

router.get('/', UsersController.list);
router.get('/:id', UsersController.getById);
router.post('/', UsersController.create);
router.put('/:id', UsersController.update);
router.delete('/:id', UsersController.remove);
router.get('/', UsersController.buscarAlunos);

export default router;
