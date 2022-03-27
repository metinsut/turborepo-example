import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

const router = Router();
const { OK } = StatusCodes;

router.get('/', (_, res) => {
  res.status(OK).json({ name: 'HELLO WORLD' });
});

export default router;
