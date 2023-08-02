import { Router } from 'express';
import MailController from '../controllers/mail.controller';
import { joiValidator } from '../middleware/requestValidator';
import { sendMailSchema } from '../requests/mail.request';

const router = Router();

router.post('/', joiValidator(sendMailSchema), MailController.sendMail);
router.get('/availability', MailController.checkAvailability);

export default router;
