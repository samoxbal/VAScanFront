import { take, put, fork, call, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { stopSubmit, getFormValues } from 'redux-form';
import is from 'is';
import jwtDecode from 'jwt-decode';
import validator from '../utils/validator';
import { api } from '../utils/api';
import { mapExperiments } from '../utils/utils';
import { client } from '../index';
import ACTION_TYPES from '../constants/actionTypes';
import {
    AddExperimentFormName,
    AddVoltamogrammFormName,
    AddScanFormName,
    LoginFormName,
    EditExperimentFormName,
    EditScanFormName
} from '../constants/formNames';
import {
    experiments,
    voltamogramms,
    voltamogramm,
    scan,
    measures
} from '../graphql/queries';
import {
    updateExperiment as updateExperimentMutation,
    createExperiment as createExperimentMutation,
    createVoltamogramm as createVoltamogrammMutation,
    createScan as createScanMutation
} from '../graphql/mutations';
import {
    experimentRequiredFields,
    voltamogrammRequiredFields,
    scanRequiredFields,
    loginRequiredFields
} from '../constants/requiredFields';

function* createToken() {
    while(true) {
        yield take(ACTION_TYPES.LOGIN);
        const form = yield yield select(state => getFormValues(LoginFormName)(state));
        const invalidFields = validator(form, loginRequiredFields);
        if(is.empty(invalidFields)) {
            const token = yield call(api.login, form);
            localStorage.setItem('token', token.data.data);
            yield put(push('/all'));
        } else {
            yield put(stopSubmit(LoginFormName, invalidFields));
        }
    }
}

function* fetchExperiments() {
    while(true) {
        yield take(ACTION_TYPES.FETCH_EXPERIMENTS);
        const data = yield client.query({
            query: experiments,
            fetchPolicy: 'network-only',
            variables: {
                user: jwtDecode(localStorage.getItem('token')).sub
            }
        });
        yield put({
            type: ACTION_TYPES.FETCH_EXPERIMENTS_SUCCESS,
            payload: mapExperiments(data.data.experiments)
        })
    }
}

function* fetchVoltamogramms() {
    while(true) {
        const { payload } = yield take(ACTION_TYPES.FETCH_VOLTAMOGRAMMS);
        const data = yield client.query({
            query: voltamogramms,
            variables: {
                experiment: payload
            }
        });
        yield put({
            type: ACTION_TYPES.FETCH_VOLTAMOGRAMMS_SUCCESS,
            payload: data.data.voltamogramms
        })
    }
}

function* createExperiment() {
    while(true) {
        yield take(ACTION_TYPES.ADD_EXPERIMENT);
        const stateForm = yield select(state => getFormValues(AddExperimentFormName)(state));
        const form = {
            user: jwtDecode(localStorage.getItem('token')).sub,
            ...stateForm
        };
        const invalidFields = validator(form, experimentRequiredFields);
        if (is.empty(invalidFields)) {
            yield client.mutate({
                mutation: createExperimentMutation,
                variables: form
            });
            yield put(push('/all'));
        } else {
            yield put(stopSubmit(AddExperimentFormName, invalidFields));
        }
    }
}

function* updateExperiment() {
    while(true) {
        yield take(ACTION_TYPES.UPDATE_EXPERIMENT);
        const stateForm = yield select(state => getFormValues(EditExperimentFormName)(state));
        const invalidFields = validator(stateForm, experimentRequiredFields);
        if (is.empty(invalidFields)) {
            yield client.mutate({
                mutation: updateExperimentMutation,
                variables: stateForm
            });
            yield put({
                type: ACTION_TYPES.FETCH_EXPERIMENTS
            });
        } else {
            yield put(stopSubmit(EditExperimentFormName, invalidFields));
        }
    }
}

function* fetchSingleVoltamogramm() {
    while(true) {
        const { payload } = yield take(ACTION_TYPES.FETCH_SINGLE_VOLTAMOGRAMM);
        const { data } = yield client.query({
            query: voltamogramm,
            variables: {
                voltamogrammId: payload
            }
        });
        yield put({
            type: ACTION_TYPES.FETCH_SINGLE_VOLTAMOGRAMM_SUCCESS,
            payload: data.voltamogramm
        })
    }
}

function* fetchSingleScan() {
    while(true) {
        const { payload } = yield take(ACTION_TYPES.FETCH_SINGLE_SCAN);
        const { data } = yield client.query({
            query: scan,
            variables: {
                scanId: payload
            }
        });
        yield put({
            type: ACTION_TYPES.FETCH_SINGLE_SCAN_SUCCESS,
            payload: data.scan
        })
    }
}

function* fetchMeasures() {
    while(true) {
        const { payload } = yield take(ACTION_TYPES.FETCH_SINGLE_MEASURE);
        const { data } = yield client.query({
            query: measures,
            variables: {
                scanId: payload
            }
        });
        yield put({
            type: ACTION_TYPES.FETCH_SINGLE_MEASURE_SUCCESS,
            payload: data.measure
        })
    }
}

function* createVoltamogramm() {
    while(true) {
        yield take(ACTION_TYPES.ADD_VOLTAMOGRAMM);
        const stateForm = yield select(state => getFormValues(AddVoltamogrammFormName)(state));
        const invalidFields = validator(stateForm, voltamogrammRequiredFields);
        if (is.empty(invalidFields)) {
            const { data } = yield client.mutate({
                mutation: createVoltamogrammMutation,
                variables: stateForm
            });
            yield put({
                type: ACTION_TYPES.OPEN_ADD_VOLTAMOGRAMM,
                payload: false
            });
            yield put(push(`/voltamogramm/${data.createVoltamogramm.id}`));
        } else {
            yield put(stopSubmit(AddVoltamogrammFormName, invalidFields));
        }
    }
}

function* createScan() {
    while(true) {
        const { payload: { file, voltamogramm } } = yield take(ACTION_TYPES.ADD_SCAN);
        const stateForm = yield select(state => getFormValues(AddScanFormName)(state));
        const form = {
            voltamogramm,
            ...stateForm
        };
        const invalidFields = validator(form, scanRequiredFields);
        if (is.empty(invalidFields)) {
            const createScanData = yield client.mutate({
                mutation: createScanMutation,
                variables: form
            });
            file.append('scan', createScanData.data.createScan.id);
            yield call(api.add_measure, file);
            yield put({
                type: ACTION_TYPES.OPEN_ADD_SCAN,
                payload: false
            })
        } else {
            yield put(stopSubmit(AddScanFormName, invalidFields));
        }
    }
}

export default function* root() {
    yield fork(createExperiment);
    yield fork(fetchExperiments);
    yield fork(fetchVoltamogramms);
    yield fork(fetchSingleVoltamogramm);
    yield fork(fetchSingleScan);
    yield fork(fetchMeasures);
    yield fork(createScan);
    yield fork(createToken);
    yield fork(createVoltamogramm);
    yield fork(updateExperiment);
}