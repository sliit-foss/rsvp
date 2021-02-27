import { Router } from 'express';
import MailController from './mail.controller';
import bodyParser from 'body-parser';

const router = Router();
var jsonParser = bodyParser.json()

router.post('/',jsonParser, MailController.sendMail);
router.get('/availability',MailController.checkAvailability);

export default router;