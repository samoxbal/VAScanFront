import { Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Switch } from 'react-router-dom';
import AddExperiment from '../../pages/add-experiment/AddExperiment';
import ExperimentsPage from '../../pages/experiments/ExperimentsPage';
import VoltamogrammPage from '../../pages/voltamogramm/VoltamogrammPage';
import MeasurePage from '../../pages/measure/MeasurePage';
import Login from '../../pages/login/Login';
import { Auth } from '../Auth';
import { history } from '../../store/configureStore';

import './App.css';

const renderLogin = props => {
    if(!localStorage.getItem("token")) {
        return <Login { ...props } />;
    } else {
        return <Redirect to="/all" />;
    }
};

const App = () => (
    <ConnectedRouter history={ history }>
        <Switch>
            <Route exact path="/" render={ renderLogin } />
            <Route path="/add" component={ Auth(AddExperiment) } />
            <Route path="/all" component={ Auth(ExperimentsPage) } />
            <Route path="/voltamogramm/:id" component={ Auth(VoltamogrammPage) } />
            <Route path="/measure/:id" component={ Auth(MeasurePage) } />
        </Switch>
    </ConnectedRouter>
);

export default App;