import Loadable from 'react-loadable';
import CircularProgress from 'material-ui/CircularProgress';
import { Route, Redirect } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import AddExperiment from '../pages/add-experiment/AddExperiment';
import ExperimentsPage from '../pages/experiments/ExperimentsPage';
import VoltamogrammPage from '../pages/voltamogramm/VoltamogrammPage';
import MeasurePage from '../pages/measure/MeasurePage';

const AsyncRoute = ({ ...rest }) => (
    <Route
        { ...rest }
        component={
            Loadable({
                loader: () => import('../pages/add-experiment/AddExperiment'),
                loading: CircularProgress
            })
        }
    />
);

const App = () => (
    <Switch>
        <Redirect to="/all" from="/" exact />
        <AsyncRoute path="/add" />
        <Route path="/all" component={ ExperimentsPage } />
        <Route path="/voltamogramm/:id" component={ VoltamogrammPage } />
        <Route path="/measure/:id" component={ MeasurePage } />
    </Switch>
);

export default App;