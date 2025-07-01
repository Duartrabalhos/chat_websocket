import cors from 'cors';
import express from 'express';
import usersRouter from './routes/users';
import roomsRouter from './routes/rooms';
import { errorHandler } from './middlewares/error.middleware';
import { authHandler } from './middlewares/auth.middleware';

const app = express();

app.use(cors());


app.use(express.json());

app.use('/rooms', authHandler, roomsRouter);
app.use('/user', usersRouter);

app.use(errorHandler);

export default app;
