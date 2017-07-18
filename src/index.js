import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import App from './components/app/App';
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import '../assets/css/main.css';

window.React = React;

const client = new ApolloClient({
    networkInterface: createNetworkInterface({
        uri: '/graphql'
    })
});

ReactDOM.render(
    <ApolloProvider store={configureStore(client)} client={client}>
        <App/>
    </ApolloProvider>,
    document.getElementById('root'));
