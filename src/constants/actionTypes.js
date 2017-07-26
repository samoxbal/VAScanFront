import keyMirror from 'key-mirror';

const ACTION_TYPES = keyMirror({
    FETCH_EXPERIMENTS: null,
    FETCH_EXPERIMENTS_SUCCESS: null,
    FETCH_VOLTAMOGRAMMS: null,
    FETCH_VOLTAMOGRAMMS_SUCCESS: null,
    ADD_EXPERIMENT: null,
    ADD_VOLTAMOGRAMM: null,
    SELECT_EXPERIMENT: null,
    SET_ERROR: null,
    ADD_SCAN: null,
    OPEN_ADD_VOLTAMOGRAMM: null,
    OPEN_ADD_SCAN: null,
    FETCH_SINGLE_VOLTAMOGRAMM: null,
    FETCH_SINGLE_VOLTAMOGRAMM_SUCCESS: null,
    FETCH_SINGLE_SCAN: null,
    FETCH_SINGLE_SCAN_SUCCESS: null,
    CHANGE_EXPERIMENT_NAME: null,
    CHANGE_EXPERIMENT_DESCRIPTION: null,
    CHANGE_EXPERIMENT_START: null,
    CHANGE_EXPERIMENT_END: null,
    RESET_ADD_EXPERIMENT: null,
    CHANGE_VOLTAMOGRAMM_CYCLIC: null,
    CHANGE_VOLTAMOGRAMM_DATE: null,
    CHANGE_VOLTAMOGRAMM_DESCRIPTION: null,
    CHANGE_VOLTAMOGRAMM_SOLUTION: null,
    CHANGE_VOLTAMOGRAMM_ELECTROD_NUMBERS: null,
    CHANGE_VOLTAMOGRAMM_EQUIPMENT_ID: null,
    RESET_ADD_VOLTAMOGRAMM: null,
    CHANGE_SCAN_DATETIME: null,
    CHANGE_START_POTENTIAL: null,
    CHANGE_END_POTENTIAL: null,
    CHANGE_REVERSE_DIRECTION: null,
    CHANGE_STIRRING: null,
    CHANGE_STIRRING_SPEED: null,
    CHANGE_ROTATION: null,
    CHANGE_ROTATION_SPEED: null,
    CHANGE_CHANNEL_ID: null,
    CHANGE_CHANNEL_LABEL: null,
    CHANGE_TEMPERATURE: null,
    CHANGE_PRESSURE: null,
    CHANGE_REGIME: null,
    RESET_ADD_SCAN: null,
    CHANGE_NORMAL_PULSE_LIFE: null,
    CHANGE_NORMAL_PULSE_PERIOD: null,
    CHANGE_DIFFERENTIAL_PULSE_AMPLITUDE: null,
    CHANGE_DIFFERENTIAL_PULSE_PULSEWIDTH: null,
    CHANGE_DIFFERENTIAL_PULSE_PERIOD: null,
    CHANGE_SQUARE_WAVE_AMPLITUDE: null,
    CHANGE_SQUARE_WAVE_ESTEP: null,
    CHANGE_SQUARE_WAVE_TIME_PERIOD: null,
    CHANGE_STAIRCASE_TIME_STEP: null,
    CHANGE_STAIRCASE_ESTEP: null,
    CHANGE_AC_AMPLITUDE: null,
    CHANGE_AC_FREQUENCY: null,
    FETCH_SINGLE_MEASURE: null,
    FETCH_SINGLE_MEASURE_SUCCESS: null,
    SELECT_SCAN: null,
    ACTIVE_EDIT_VOLTAMOGRAMM: null,
    CHANGE_EMAIL: null,
    CHANGE_PASSWORD: null,
    LOGIN: null,
    UPDATE_EXPERIMENT: null
});

export default ACTION_TYPES;