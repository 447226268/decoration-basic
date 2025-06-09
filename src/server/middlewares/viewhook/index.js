import html from './html';

export default function viewhook() {
    return async function (ctx, next) {
        if (!ctx.render) {
            ctx.render = async function (entryPoint, customEntry) {
                ctx.type = 'html';
                ctx.body = await html(entryPoint);
            }
        }
        await next();
    }
}