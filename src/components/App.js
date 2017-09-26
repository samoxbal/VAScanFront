import { Route, Redirect } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import AddExperiment from '../pages/add-experiment/AddExperiment';
import ExperimentsPage from '../pages/experiments/ExperimentsPage';
import VoltamogrammPage from '../pages/voltamogramm/VoltamogrammPage';
import MeasurePage from '../pages/measure/MeasurePage';

const renderLogin = () => {
    return <Redirect to="/all" />;
};

const App = () => (
    <Switch>
        <Route exact path="/" render={ renderLogin } />
        <Route path="/add" component={ AddExperiment } />
        <Route path="/all" component={ ExperimentsPage } />
        <Route path="/voltamogramm/:id" component={ VoltamogrammPage } />
        <Route path="/measure/:id" component={ MeasurePage } />
    </Switch>
);

export default App;