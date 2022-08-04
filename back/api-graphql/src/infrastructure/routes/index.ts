import { Router } from 'express';
import Auth from './Auth';
import Public from './Public';

const router = Router();

router.use('/api/auth', Auth);
router.use('/api/public', Public)

export default router;
