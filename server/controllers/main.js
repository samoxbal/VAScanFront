import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { ApolloProvider } from 'react-apollo';
import App from '../../src/components/App';
import { client, store } from '../../src/index';
import template from '../views/index.hbs';

const env = process.env.NODE_ENV || 'development';
const state = {
    experiments: [],
    selectedExperimentId: "",
    openAddVoltamogramm: false,
    voltamogramms: [],
    voltamogramm: {}
};

export default async (ctx) => {
    const muiTheme = getMuiTheme({
        userAgent: ctx.request.headers['user-agent']
    });
    const context = {};
    const renderApp = (
        <ApolloProvider client={ client } store={ store }>
            <MuiThemeProvider muiTheme={ muiTheme }>
                <StaticRouter url={ ctx.request.url } context={ context }>
                    <App/>
                </StaticRouter>
            </MuiThemeProvider>
        </ApolloProvider>
    );

    ctx.body = template({
        path: env === 'development' ? 'static' : '.build',
        app: renderToString(renderApp),
        state
    });
};