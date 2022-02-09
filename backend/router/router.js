import {Router} from 'express';
import userController from '../user/user.controller.js';
import {body} from 'express-validator';
import authMiddleware from '../auth/auth-middleware.js';
import artWorkController from '../art-work/art-work.controller.js';
import multer from 'multer';

const DIR = './public/';

const storage = multer.diskStorage({
  destination : (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + '-' + file.originalname.toLowerCase();
    cb(null, fileName);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});

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
router.post('/art-works', upload.array('images', 4), artWorkController.createArtWork);
router.get('/art-works', artWorkController.getAllArtWork);
router.get('/image', artWorkController.getImage)

export default router;
