import { Router } from 'express';
import UserController from '../controllers/UserController';


const userRouter = Router();
const userController = new UserController();
userRouter.get('/', async (req, res, next) => {
    try {
        await userController.index(req, res, next);
    } catch (err) {
        next(err);
    }
});

userRouter.get('/:id', async (req, res, next) => {
    try {
        await userController.show(req, res, next);
    } catch (err) {
        next(err);
    }
});

userRouter.post('/', async (req, res, next) => {
    try {
        await userController.create(req, res, next);
    } catch (err) {
        next(err);
    }
});

userRouter.put('/:id', async (req, res, next) => {
    try {
        await userController.update(req, res, next);
    } catch (err) {
        next(err);
    }
});

userRouter.delete('/:id', async (req, res, next) => {
    try {
        await userController.delete(req, res, next);
    } catch (err) {
        next(err);
    }
});

export default userRouter;