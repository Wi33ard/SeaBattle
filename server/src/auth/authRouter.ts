import { Router } from 'express';
import controller from './authController';
// import roleMiddleware from './middleware/roleMiddleware';

const router = Router();

// router.post('/registration', controller.registration);
router.post('/login', controller.login);
// router.get('/users', controller.getUsers);

console.log(router.stack);

export default router;
