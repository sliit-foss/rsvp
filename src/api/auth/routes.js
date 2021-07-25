import { Router } from 'express';
import AuthController from './auth.controller';

const router = new Router();

router.post('/signup', AuthController.adminRegister);
router.post('/login', AuthController.adminLogin);
router.get('/logout', AuthController.adminLogout);

export default router;
