
import express from 'express';
import {songRouter} from './moduleSong';
import {userRouter} from './moduleUser';
const swaggerUi = require('swagger-ui-express');
import swaggerDocument from '../config/swagger.json';



export const restRouter = express.Router();


restRouter.use('/songs', songRouter);
restRouter.use('/users', userRouter);
restRouter.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

