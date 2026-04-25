import 'reflect-metadata';
import 'express-async-errors';
import { errors } from 'celebrate';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import { AppDataSource } from '@shared/typeorm/data-source';


const app = express();

app.use(errors());
app.use(cors());
app.use(express.json());
app.use(routes);

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message
        });
    }
    console.error(error);
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
});

AppDataSource.initialize()
    .then(() => {
        console.log('✅ Data Source initialized');
        app.listen(3333, () => {
            console.log('🚀 Server started on port 3333!');
        });
    })
    .catch((err) => {
        console.error('❌ Error during Data Source initialization', err);
    });