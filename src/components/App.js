import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import AddExperiment from '../pages/add-experiment/AddExperiment';
import ExperimentsPage from '../pages/experiments/ExperimentsPage';
import VoltamogrammPage from '../pages/voltamogramm/VoltamogrammPage';
import MeasurePage from '../pages/measure/MeasurePage';
import Login from '../pages/login/Login';
import { Auth } from './Auth';

const renderLogin = props => {
    if(!localStorage.getItem("token")) {
        return <Login { ...props } />;
    } else {
        return <Redirect to="/all" />;
    }
};

const App = () => (
    <Switch>
        <Route exact path="/" render={ renderLogin } />
        <Route path="/add" component={ Auth(AddExperiment) } />
        <Route path="/all" component={ Auth(ExperimentsPage) } />
        <Route path="/voltamogramm/:id" component={ Auth(VoltamogrammPage) } />
        <Route path="/measure/:id" component={ Auth(MeasurePage) } />
    </Switch>
);

export default App;