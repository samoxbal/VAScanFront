import Loadable from 'react-loadable';
import CircularProgress from 'material-ui/CircularProgress';
import { Route, Redirect } from 'react-router-dom';
import { Switch } from 'react-router-dom';

const AsyncRoute = ({ url, ...rest }) => (
    <Route
        { ...rest }
        component={
            Loadable({
                loader: () => import(`../pages/${url}`),
                loading: CircularProgress
            })
        }
    />
);

const App = () => (
    <Switch>
        <Redirect to="/all" from="/" exact />
        <AsyncRoute path="/add" url="add-experiment/AddExperiment" />
        <AsyncRoute path="/all" url="experiments/ExperimentsPage" />
        <AsyncRoute path="/voltamogramm/:id" url="voltamogramm/VoltamogrammPage" />
        <AsyncRoute path="/measure/:id" url="measure/MeasurePage" />
    </Switch>
);

export default App;