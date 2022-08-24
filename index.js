require('dotenv').config();

const Koa = require('koa');
const mount = require('koa-mount');

const { getOidcProvider } = require('./oidc');

new Koa()
    .use(errorHandler)
    .use(httpLogger)
    .use(mount(getOidcProvider(process.env.ISSUER).app))
    .listen(process.env.PORT, () => {
        console.log(`Server listening on port 3000.`);
        console.log(`-- Discovery Document: ${process.env.ISSUER}/.well-known/openid-configuration`);
        console.log(`-- Test the OP server: https://oidcdebugger.com/`);
    });

async function errorHandler(ctx, next) {
    try {
        await next();
    } catch (err) {
        err.status = err.statusCode || err.status || 500;
        throw err;
    }
}

async function httpLogger(ctx, next) {
    console.log(`>> ${ctx.method} ${ctx.path} ${ctx.request.body ?? ''}`);
    await next();
    console.log(`<< ${ctx.res.statusCode} ${ctx.res.statusMessage ?? ''}`);
}