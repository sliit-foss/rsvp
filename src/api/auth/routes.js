import { Router } from 'express';
const {adminRegister , adminLogin} = require('./auth.controller')
const router = new Router();

router.post('/signup' , adminRegister);
router.get('/login' , adminLogin);

module.exports = router;