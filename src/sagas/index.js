import { take, put, fork, call, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import is from 'is';
import validator from '../utils/validator';
import { api } from '../utils/api';
import ACTION_TYPES from '../constants/actionTypes';
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
        const [invalidFields, loginObj] = validator(form, loginRequiredFields);
        if(is.empty(invalidFields)) {
            const token = yield call(api.login, loginObj);
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

function* createExperiment() {
    while(true) {
        yield take(ACTION_TYPES.ADD_EXPERIMENT);
        yield put(push('/all'));
    }
}

function* createVoltamogramm() {
    while(true) {
        const { payload } = yield take(ACTION_TYPES.ADD_VOLTAMOGRAMM);
        yield put({
            type: ACTION_TYPES.OPEN_ADD_VOLTAMOGRAMM,
            payload: false
        });
        yield put(push(`/voltamogramm/${payload}`));
    }
}

function* editExperiment() {
    while(true) {
        const action = yield take(ACTION_TYPES.EDIT_EXPERIMENT);
        const { payload: { _id, ...restObj } } = action;
        const [invalidFields, experimentObj] = validator(restObj, experimentRequiredFields);
        if(is.empty(invalidFields)) {
            yield call(api.edit_experiment, {_id, ...experimentObj});
        } else {
            yield put({
                type: ACTION_TYPES.SET_ERROR,
                payload: invalidFields
            })
        }
    }
}

function* createScan() {
    while(true) {
        const { payload } = yield take(ACTION_TYPES.ADD_SCAN);
        const data = yield call(api.add_measure, payload);
        console.log(data);
    }
}

export default function* root() {
    yield fork(createExperiment);
    yield fork(createScan);
    yield fork(editExperiment);
    yield fork(createToken);
    yield fork(createVoltamogramm);
}