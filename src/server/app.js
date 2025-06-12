require("./env");
import path from "path";
import Koa from 'koa';
import chalk from 'chalk';

import router from './router';
import viewhook from './middlewares/viewhook';
import log4j from './middlewares/log4j';
import koaStatic from "koa-static";
import koaCompress from 'koa-compress';
import koaBodyParser from "koa-bodyparser";

const app = new Koa();
app
    .use(log4j())
    .use(viewhook())
    .use(koaCompress())
    .use(koaBodyParser({ enableTypes: ['json'], jsonLimit: '10mb' }))
    .use(router.routes())
    .use(router.allowedMethods())
    .use(koaStatic(path.resolve("static")));
app.listen(process.env.HTTP_SERVER_PORT);

console.log(chalk.green(`------------------------------------启动成功---------------------------------`));
const info = `🚀 server started: 127.0.0.1:${process.env.HTTP_SERVER_PORT}`;
console.log(chalk.yellow.bold(info));
console.log(chalk.green(`-----------------------------------------------------------------------------`));