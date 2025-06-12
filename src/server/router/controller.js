import Router from '@koa/router';
const router = new Router({
    prefix: "/api"
});

router.get("/a", async (ctx) => {
    ctx.body = "a!";
})

export default router;