import Router from '@koa/router';
const router = new Router();

router.get("/", async (ctx) => {
    ctx.redirect("/home");
})

router.get("/home", async (ctx) => {
    await ctx.render("mobile");
})

export default router;