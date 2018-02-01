import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import configureStore, { sagaMiddleware } from './store/configureStore';
import App from './components/App';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import root from './sagas';
import { history } from './store/configureStore';
import { isBrowser } from './utils/utils';
import { mockNetworkInterface } from '../server/mock';

injectTapEventPlugin();
const isProduction = process.env.NODE_ENV === 'production';

const networkInterface = createNetworkInterface({
    uri: '/graphql',
});

networkInterface.use([{
    applyMiddleware(req, next) {
        if (!req.options.headers) {
            req.options.headers = {};
        }

        const token = localStorage.getItem('token');
        req.options.headers.Authorization = token ? `JWT ${token}` : null;
        next();
    }
}]);

export const client = new ApolloClient({
    networkInterface: isProduction ? networkInterface : mockNetworkInterface
});

if (isBrowser()) {
    window.__main = state => {
        const store = configureStore(client, state);
        sagaMiddleware.run(root);

        ReactDOM.render(
            <ApolloProvider store={ store } client={ client }>
                <MuiThemeProvider>
                    <ConnectedRouter history={ history }>
                        <App/>
                    </ConnectedRouter>
                </MuiThemeProvider>
            </ApolloProvider>,
            document.getElementById('root'));
    }
}
