import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import ACTION_TYPES from '../constants/actionTypes';
import { createSimpleReducer } from '../utils/createReducers';

const experiments = createSimpleReducer([], ACTION_TYPES.FETCH_EXPERIMENTS_SUCCESS);
const selectedExperimentId = createSimpleReducer("", ACTION_TYPES.SELECT_EXPERIMENT);
const openAddVoltamogramm = createSimpleReducer(false, ACTION_TYPES.OPEN_ADD_VOLTAMOGRAMM);
const openAddScan = createSimpleReducer(false, ACTION_TYPES.OPEN_ADD_SCAN);
const voltamogramms = createSimpleReducer([], ACTION_TYPES.FETCH_VOLTAMOGRAMMS_SUCCESS);
const voltamogramm = createSimpleReducer({}, ACTION_TYPES.FETCH_SINGLE_VOLTAMOGRAMM_SUCCESS);
const measure = createSimpleReducer({}, ACTION_TYPES.FETCH_SINGLE_MEASURE_SUCCESS);
const scan = createSimpleReducer({}, ACTION_TYPES.FETCH_SINGLE_SCAN_SUCCESS);
const selectedScanId = createSimpleReducer("", ACTION_TYPES.SELECT_SCAN);

const rootReducer = {
    router: routerReducer,
    form: formReducer,
    experiments,
    selectedExperimentId,
    openAddVoltamogramm,
    voltamogramms,
    voltamogramm,
    measure,
    scan,
    selectedScanId,
    openAddScan
};

export default rootReducer;