import { Router } from 'express';
import MailController from './mail.controller';
import { sendMailSchema } from './mail.request';
import { joiValidator } from '../../middleware/requestValidator';

const router = Router();

router.post('/', joiValidator(sendMailSchema), MailController.sendMail);
router.get('/availability', MailController.checkAvailability);

export default router;
