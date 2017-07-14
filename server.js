const koa = require('koa'),
    router = require('koa-router')();

const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];

const app = koa();

require('./config/koa')(app, router, config);
require('./config/routes')(router);

const port = config.app.port;

app.listen(port, () => {
    console.log('Server started on port ' + port);
});