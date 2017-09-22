import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import template from '../views/index.hbs';

const env = process.env.NODE_ENV || 'development';

export default async (ctx) => {
    ctx.body = template({
        path: env === 'development' ? 'static' : '.build'
    });
};