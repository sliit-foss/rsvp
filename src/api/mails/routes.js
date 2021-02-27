import { Router } from 'express';
import MailController from './mail.controller';
const router = Router();

router.post('/', MailController.sendMail);

export default router;