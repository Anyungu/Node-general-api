
import express from 'express';
import {songRouter} from './moduleSong';


export const restRouter = express.Router();


restRouter.use('/songs', songRouter);