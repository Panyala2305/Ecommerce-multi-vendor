import express from 'express';
import authControllers from '../controllers/authControllers.js';
const router = express.Router();

router.post('/admin-login', authControllers.admin_login);

export default router;
