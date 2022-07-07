import { Router } from 'express';

import MonitorRoute from './MonitorRoute';

const router = Router();

router.use('/monitor', MonitorRoute);

export default router;
