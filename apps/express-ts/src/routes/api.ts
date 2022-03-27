import { Router } from 'express';
import userRouter from './user-router';
import restRouter from './rest-router';

// Export the base-router
const baseRouter = Router();

// Setup routers
baseRouter.use('/users', userRouter);
baseRouter.use('/api', restRouter);

// Export default.
export default baseRouter;
