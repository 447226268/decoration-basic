import logger from './logger';

export default function log4j() {
    return async function (ctx, next) {
        if (!ctx.logger) ctx.logger = logger;
        ctx.logger.info(`Request: ${ctx.method} ${ctx.url}`);
        await next();
        ctx.logger.info(`Response Status: ${ctx.status}`);
    }
}
