import { NextFunction, Request, Response, Router } from 'express';

import { asyncMap } from 'src/commons/utils/ArrayUtils';

import { getLogger } from '../libs/Logger';

import { createWebsite, findWebsites } from '../models/WebsiteModel';
import { createProject } from '../services/ProjectService';

const logger = getLogger('Monitor API');

const router = Router();

async function createMonitor(req: Request, res: Response, next: NextFunction) {
  try {
    const { websiteUrls } = req.body;
    const project = await createProject(req.body);

    const websites = await asyncMap(websiteUrls, async (websiteUrl: string) =>
      createWebsite({
        url: websiteUrl,
      })
    );

    await createWebsite({
      projectId: project.id,
    });

    return res.json({
      message: 'Monitor successfully setup',
      body: {
        project,
        websites,
      },
    });
  } catch (e: any) {
    logger.error(e);
    next(e);
  }
}

async function getMonitor(req: Request, res: Response, next: NextFunction) {
  try {
    const { results: websites } = await findWebsites({
      projectId: req.query.projectId as string,
    });

    return res.json(websites);
  } catch (e: any) {
    logger.error(e);
    next(e);
  }
}

router.get('/:id', getMonitor);
router.post('/:id', createMonitor);

export default router;
