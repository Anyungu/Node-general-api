
import express from 'express';
import UserController from './user.controller';
import passport from 'passport'

export const userRouter = express.Router();



userRouter.post('/signUp', UserController.signUp);
userRouter.post('/login', UserController.login);
userRouter.get('/me',passport.authenticate('jwt', {session: false}), UserController.authenticate)
