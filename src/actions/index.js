import ACTION_TYPES from '../constants/actionTypes';

export function selectExperiment(id) {
    return {
        type: ACTION_TYPES.SELECT_EXPERIMENT,
        payload: id
    }
}

export function createExperiment(variables) {
    return {
        type: ACTION_TYPES.ADD_EXPERIMENT,
        payload: variables
    }
}

export function updateExperiment(variables) {
    return {
        type: ACTION_TYPES.UPDATE_EXPERIMENT,
        payload: variables
    }
}

export function createScan(variables) {
    return {
        type: ACTION_TYPES.ADD_SCAN,
        payload: variables
    }
}

export function openAddVoltamogramm(state) {
    return {
        type: ACTION_TYPES.OPEN_ADD_VOLTAMOGRAMM,
        payload: state
    }
}

export function openAddScan(state) {
    return {
        type: ACTION_TYPES.OPEN_ADD_SCAN,
        payload: state
    }
}

export function fetchSingleVoltamogramm(id) {
    return {
        type: ACTION_TYPES.FETCH_SINGLE_VOLTAMOGRAMM,
        payload: id
    }
}

export function fetchSingleScan(id) {
    return {
        type: ACTION_TYPES.FETCH_SINGLE_SCAN,
        payload: id
    }
}

export function resetAddExperimentForm() {
    return {
        type: ACTION_TYPES.RESET_ADD_EXPERIMENT
    }
}

export function fetchSingleMeasure(id) {
    return {
        type: ACTION_TYPES.FETCH_SINGLE_MEASURE,
        payload: id
    }
}

export function selectScan(_id) {
    return {
        type: ACTION_TYPES.SELECT_SCAN,
        payload: _id
    }
}

export function login() {
    return {
        type: ACTION_TYPES.LOGIN
    }
}

export function fetchExperiments(experiments) {
    return {
        type: ACTION_TYPES.FETCH_EXPERIMENTS,
        payload: experiments
    }
}

export function fetchVoltamogramms(experimentId) {
    return {
        type: ACTION_TYPES.FETCH_VOLTAMOGRAMMS,
        payload: experimentId
    }
}

export function createVoltamogramm(variables) {
    return {
        type: ACTION_TYPES.ADD_VOLTAMOGRAMM,
        payload: variables
    }
}

export function resetAddVoltamogramm() {
    return {
        type: ACTION_TYPES.RESET_ADD_VOLTAMOGRAMM
    }

}