import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';
import createSagaMiddleware from 'redux-saga';
import { isBrowser } from '../utils/utils';

export const history = isBrowser() ? createHistory() : null;
export const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = isBrowser() ? (!window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    compose :
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) : compose;

const configureStore = (client, initialState) => createStore(
    combineReducers({
        ...rootReducer,
        apollo: client.reducer()
    }),
    initialState,
    composeEnhancers(
        applyMiddleware(
            routerMiddleware(history),
            sagaMiddleware,
            client.middleware()
        )
    )
);

export default configureStore;
