import Router from '@koa/router';
const router = new Router();

import pageRouter from './page';
import apiRouter from './controller';

router
    .use(pageRouter.routes())
    .use(apiRouter.routes())

export default router;