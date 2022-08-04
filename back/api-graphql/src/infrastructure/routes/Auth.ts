import { Router } from 'express';
import passport from 'passport';
import { STRATEGY_NAME_TWITCH, STRATEGY_NAME_DEFAULT } from '../../data/constants';
import AuthController from '../controllers/Auth';

const router = Router();

router.get('/', [
  passport.authenticate(STRATEGY_NAME_DEFAULT),
  AuthController.User,
]);

router.get('/failure', AuthController.Unauthorized);

router.get('/logout', [
  passport.authenticate(STRATEGY_NAME_DEFAULT),
  AuthController.Logout,
]);

router.get('/twitch', passport.authenticate(STRATEGY_NAME_TWITCH));

router.get('/twitch/callback', [
  passport.authenticate(STRATEGY_NAME_TWITCH, { failureRedirect: '/api/auth/failure' }),
  AuthController.Login,
]);

export default router;
