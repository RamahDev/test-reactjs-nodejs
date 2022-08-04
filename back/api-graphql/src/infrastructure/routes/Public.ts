import { Router } from 'express';
import PublicController from '../controllers/Public';

const router = Router();

router.get('/test', PublicController.getTest);

export default router;
