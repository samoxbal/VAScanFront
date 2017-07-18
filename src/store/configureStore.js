import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import createHistory from 'history/createBrowserHistory';
import {routerMiddleware} from 'react-router-redux';
import rootReducer from '../reducers';
import createSagaMiddleware from 'redux-saga';

const initialState = {
    experiments: [],
    selectedExperimentId: "",
    errors: {},
    openAddVoltamogramm: false,
    voltamogramms: [],
    voltamogramm: {}
};

export const history = createHistory();
export const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = !window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    compose :
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const configureStore = client => createStore(
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
