import { Router } from 'express';

/* controllers */
import SessionController from './controllers/SessionController';
import TaskController from './controllers/TaskController';
import UserController from './controllers/UserController';

/* middlewares */
import authMiddleware from './middleware/auth';
import TaskValidation from './middleware/TaskValidation';

const router = new Router();

/* session */
router.post('/sessions', SessionController.store);

/* task */
router.post('/task', TaskController.store);

router.put('/task/:task/:id', TaskValidation, TaskController.update);
router.get('/task/:id', TaskController.show);
router.delete('/task/:task', TaskController.delete);
router.put('/task/:id/:done', TaskController.done);

/* task - filters */
router.get('/task/filter/all/:id', TaskController.all);
router.get('/task/filter/late/:id', TaskController.late);
router.get('/task/filter/today/:id', TaskController.today);
router.get('/task/filter/week/:id', TaskController.week);
router.get('/task/filter/month/:id', TaskController.month);
router.get('/task/filter/year/:id', TaskController.year);

/* user */
router.post('/register', UserController.store);
// router.use(authMiddleware);
router.get('/user/all', UserController.all);
router.get('/user/:id', UserController.show);

export default router;
