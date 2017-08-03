import { take, put, fork, call, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { stopSubmit, getFormValues } from 'redux-form';
import is from 'is';
import jwtDecode from 'jwt-decode';
import validator from '../utils/validator';
import { api } from '../utils/api';
import { client } from '../index';
import ACTION_TYPES from '../constants/actionTypes';
import { AddExperimentName } from '../constants/formNames';
import {
    experiments,
    voltamogramms,
    voltamogramm,
    scan,
    measure
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
        const loginSelector = state => state.loginForm;
        yield take(ACTION_TYPES.LOGIN);
        const form = yield select(loginSelector);
        const invalidFields = validator(form, loginRequiredFields);
        if(is.empty(invalidFields)) {
            const token = yield call(api.login, form);
            localStorage.setItem('token', token.data.data);
            yield put(push('/all'));
        } else {
            yield put({
                type: ACTION_TYPES.SET_ERROR,
                payload: invalidFields
            })
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
            payload: data.data.experiments
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
        const stateForm = yield select(state => getFormValues(AddExperimentName)(state));
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
            yield put(stopSubmit(AddExperimentName, invalidFields));
        }
    }
}

function* updateExperiment() {
    while(true) {
        const { payload } = yield take(ACTION_TYPES.UPDATE_EXPERIMENT);
        const invalidFields = validator(payload, experimentRequiredFields);
        if (is.empty(invalidFields)) {
            yield client.mutate({
                mutation: updateExperimentMutation,
                variables: payload
            });
            yield put({
                type: ACTION_TYPES.FETCH_EXPERIMENTS
            });
        } else {
            yield put({
                type: ACTION_TYPES.SET_ERROR,
                payload: invalidFields
            })
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

function* fetchSingleMeasure() {
    while(true) {
        const { payload } = yield take(ACTION_TYPES.FETCH_SINGLE_MEASURE);
        const { data } = yield client.query({
            query: measure,
            variables: {
                measureId: payload
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
        const { payload } = yield take(ACTION_TYPES.ADD_VOLTAMOGRAMM);
        const { data } = yield client.mutate({
            mutation: createVoltamogrammMutation,
            variables: payload
        });
        yield put({
            type: ACTION_TYPES.OPEN_ADD_VOLTAMOGRAMM,
            payload: false
        });
        yield put(push(`/voltamogramm/${data.createVoltamogramm.id}`));
    }
}

function* createScan() {
    while(true) {
        const { payload: { file, ...variables } } = yield take(ACTION_TYPES.ADD_SCAN);
        const createScanData = yield client.mutate({
            mutation: createScanMutation,
            variables
        });
        file.append('scan', createScanData.data.createScan.id);
        yield call(api.add_measure, file);
        yield put({
            type: ACTION_TYPES.OPEN_ADD_SCAN,
            payload: false
        })
    }
}

export default function* root() {
    yield fork(createExperiment);
    yield fork(fetchExperiments);
    yield fork(fetchVoltamogramms);
    yield fork(fetchSingleVoltamogramm);
    yield fork(fetchSingleScan);
    yield fork(fetchSingleMeasure);
    yield fork(createScan);
    yield fork(createToken);
    yield fork(createVoltamogramm);
    yield fork(updateExperiment);
}