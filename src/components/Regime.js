import { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import createFormAction from '../utils/createFormAction';
import ACTION_TYPES from '../constants/actionTypes';

const mapStateToProps = state => ({
    regime: state.addScanForm.regime,
    measure_mode: state.addScanForm.measure_mode
});

const mapDispatchToProps = dispatch => bindActionCreators({
    changeNormalPulseLife: createFormAction(ACTION_TYPES.CHANGE_NORMAL_PULSE_LIFE),
    changeNormalPulsePeriod: createFormAction(ACTION_TYPES.CHANGE_NORMAL_PULSE_PERIOD),
    changeDifferentialPulseAmplitude: createFormAction(ACTION_TYPES.CHANGE_DIFFERENTIAL_PULSE_AMPLITUDE),
    changeDifferentialPulsePulseWidth: createFormAction(ACTION_TYPES.CHANGE_DIFFERENTIAL_PULSE_PULSEWIDTH),
    changeDifferentialPulsePeriod: createFormAction(ACTION_TYPES.CHANGE_DIFFERENTIAL_PULSE_PERIOD),
    changeSquareWaveAmplitude: createFormAction(ACTION_TYPES.CHANGE_SQUARE_WAVE_AMPLITUDE),
    changeSquareWaveEstep: createFormAction(ACTION_TYPES.CHANGE_SQUARE_WAVE_ESTEP),
    changeSquareWaveTimePeriod: createFormAction(ACTION_TYPES.CHANGE_SQUARE_WAVE_TIME_PERIOD),
    changeStaircaseTimeStep: createFormAction(ACTION_TYPES.CHANGE_STAIRCASE_TIME_STEP),
    changeStaircaseEstep: createFormAction(ACTION_TYPES.CHANGE_STAIRCASE_ESTEP),
    changeAcAmplitude: createFormAction(ACTION_TYPES.CHANGE_AC_AMPLITUDE),
    changeAcFrequency: createFormAction(ACTION_TYPES.CHANGE_AC_FREQUENCY)
}, dispatch);

class Regime extends Component {

    static propTypes = {
        regime: PropTypes.string,
        measure_mode: PropTypes.object,
        changeNormalPulseLife: PropTypes.func,
        changeNormalPulsePeriod: PropTypes.func,
        changeDifferentialPulseAmplitude: PropTypes.func,
        changeDifferentialPulsePulseWidth: PropTypes.func,
        changeDifferentialPulsePeriod: PropTypes.func,
        changeSquareWaveAmplitude: PropTypes.func,
        changeSquareWaveEstep: PropTypes.func,
        changeSquareWaveTimePeriod: PropTypes.func,
        changeStaircaseTimeStep: PropTypes.func,
        changeStaircaseEstep: PropTypes.func,
        changeAcAmplitude: PropTypes.func,
        changeAcFrequency: PropTypes.func
    }

    renderNormal() {
        const {
            measure_mode: {
                normal: {
                    normal_pulse_life,
                    normal_pulse_period
                }
            },
            changeNormalPulseLife,
            changeNormalPulsePeriod
        } = this.props;
        return (
            <div>
                <TextField
                    floatingLabelText="Normal pulse life"
                    value={ normal_pulse_life }
                    onChange={ (e, data) => changeNormalPulseLife(data) }
                />
                <TextField
                    floatingLabelText="Normal pulse period"
                    value={ normal_pulse_period }
                    onChange={ (e, data) => changeNormalPulsePeriod(data) }
                />
            </div>
        )
    }

    renderDifferential() {
        const {
            measure_mode: {
                differential: {
                    differential_pulse_amplitude,
                    differential_pulse_pulsewidth,
                    differential_pulse_period
                }
            },
            changeDifferentialPulseAmplitude,
            changeDifferentialPulsePulseWidth,
            changeDifferentialPulsePeriod
        } = this.props;
        return (
            <div>
                <TextField
                    floatingLabelText="Differential pulse amplitude"
                    value={ differential_pulse_amplitude }
                    onChange={ (e, data) => changeDifferentialPulseAmplitude(data) }
                />
                <TextField
                    floatingLabelText="Differential pulse pulsewidth"
                    value={differential_pulse_pulsewidth}
                    onChange={ (e, data) => changeDifferentialPulsePulseWidth(data) }
                />
                <TextField
                    floatingLabelText="Differential pulse period"
                    value={ differential_pulse_period }
                    onChange={ (e, data) => changeDifferentialPulsePeriod(data) }
                />
            </div>
        )
    }

    renderSquare() {
        const {
            measure_mode: {
                square_wave: {
                    square_wave_amplitude,
                    square_wave_estep,
                    square_wave_time_period
                }
            },
            changeSquareWaveAmplitude,
            changeSquareWaveEstep,
            changeSquareWaveTimePeriod
        } = this.props;
        return (
            <div>
                <TextField
                    floatingLabelText="Square wave amplitude"
                    value={ square_wave_amplitude }
                    onChange={ (e, data) => changeSquareWaveAmplitude(data) }
                />
                <TextField
                    floatingLabelText="Square wave estep"
                    value={ square_wave_estep }
                    onChange={ (e, data) => changeSquareWaveEstep(data) }
                />
                <TextField
                    floatingLabelText="Square wave time period"
                    value={ square_wave_time_period }
                    onChange={ (e, data) => changeSquareWaveTimePeriod(data) }
                />
            </div>
        )
    }

    renderStairCase() {
        const {
            measure_mode: {
                staircase: {
                    staircase_time_step,
                    staircase_estep
                }
            },
            changeStaircaseTimeStep,
            changeStaircaseEstep
        } = this.props;
        return (
            <div>
                <TextField
                    floatingLabelText="Staircase time step"
                    value={ staircase_time_step }
                    onChange={ (e, data) => changeStaircaseTimeStep(data) }
                />
                <TextField
                    floatingLabelText="Staircase estep"
                    value={ staircase_estep }
                    onChange={ (e, data) => changeStaircaseEstep(data) }
                />
            </div>
        )
    }

    renderAc() {
        const {
            measure_mode: {
                ac: {
                    ac_amplitude,
                    ac_frequency
                }
            },
            changeAcAmplitude,
            changeAcFrequency
        } = this.props;
        return (
            <div>
                <TextField
                    floatingLabelText="Ac amplitude"
                    value={ ac_amplitude }
                    onChange={ (e, data) => changeAcAmplitude(data) }
                />
                <TextField
                    floatingLabelText="Ac frequency"
                    value={ ac_frequency }
                    onChange={ (e, data) => changeAcFrequency(data) }
                />
            </div>
        )
    }

    renderRegime(regime) {
        switch (regime) {
            case "normal":
                return this.renderNormal();
            case "differential":
                return this.renderDifferential();
            case "square_wave":
                return this.renderSquare();
            case "staircase":
                return this.renderStairCase();
            case "ac":
                return this.renderAc();
            default:
                return null;
        }
    }

    render() {
        return (
            <div>
                { this.renderRegime(this.props.regime) }
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Regime);