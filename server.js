const Koa = require('koa'),
    Router = require('koa-router');

const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];

const app = new Koa();
const router = new Router();

app.use(router.routes());
app.use(router.allowedMethods());

require('./config/routes')(router);

const port = config.app.port;

app.listen(port, () => {
    console.log('Server started on port ' + port);
});