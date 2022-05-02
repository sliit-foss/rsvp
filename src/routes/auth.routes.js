import { Router } from 'express';
import AuthController from '../controllers/auth.controller';

const router = new Router();

router.post('/login', AuthController.userLogin);
router.get('/logout', AuthController.userLogout);

export default router;
