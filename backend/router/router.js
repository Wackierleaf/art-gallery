import {Router} from 'express';
import userController from '../user/user.controller.js';
import {body} from 'express-validator';
import authMiddleware from '../auth/auth-middleware.js';
import artWorkController from '../art-work/art-work.controller';

const router = new Router();

/**
 * Auth/registration routes
 */
router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);

/**
 * Art works routes
 */
router.post('/art-works', artWorkController.createArtWork);
router.get('/art-works', artWorkController.getAllArtWork);

export default router;
