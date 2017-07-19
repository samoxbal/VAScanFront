import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import configureStore, { sagaMiddleware } from './store/configureStore';
import App from './components/app/App';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import root from './sagas';

window.React = React;
injectTapEventPlugin();

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

const client = new ApolloClient({
    networkInterface
});

const store = configureStore(client);

sagaMiddleware.run(root);

ReactDOM.render(
    <ApolloProvider store={ store } client={ client }>
        <MuiThemeProvider>
            <App/>
        </MuiThemeProvider>
    </ApolloProvider>,
    document.getElementById('root'));
