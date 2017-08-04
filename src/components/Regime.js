import { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import TextField from 'redux-form-material-ui';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const mapStateToProps = state => ({

});

class Regime extends Component {

    static propTypes = {
        regime: PropTypes.string
    }

    renderNormal() {
        return (
            <div>
                <Field
                    name="normalPulseLife"
                    component={ TextField }
                    floatingLabelText="Normal pulse life"
                />
                <Field
                    name="normalPulsePeriod"
                    component={ TextField }
                    floatingLabelText="Normal pulse period"
                />
            </div>
        )
    }

    renderDifferential() {
        return (
            <div>
                <Field
                    name="differentialPulseAmplitude"
                    component={ TextField }
                    floatingLabelText="Differential pulse amplitude"
                />
                <Field
                    name="differentialPulseWidth"
                    component={ TextField }
                    floatingLabelText="Differential pulse pulsewidth"
                />
                <Field
                    name="differentialPulsePeriod"
                    component={ TextField }
                    floatingLabelText="Differential pulse period"
                />
            </div>
        )
    }

    renderSquare() {
        return (
            <div>
                <Field
                    name="squareWaveAmplitude"
                    component={ TextField }
                    floatingLabelText="Square wave amplitude"
                />
                <Field
                    name="staircaseWaveEstep"
                    component={ TextField }
                    floatingLabelText="Square wave estep"
                />
                <Field
                    name="squareWaveTimePeriod"
                    component={ TextField }
                    floatingLabelText="Square wave time period"
                />
            </div>
        )
    }

    renderStairCase() {
        return (
            <div>
                <Field
                    name="staircaseTimeStep"
                    component={ TextField }
                    floatingLabelText="Staircase time step"
                />
                <Field
                    name="staircaseEstep"
                    component={ TextField }
                    floatingLabelText="Staircase estep"
                />
            </div>
        )
    }

    renderAc() {
        return (
            <div>
                <Field
                    name="acAmplitude"
                    component={ TextField }
                    floatingLabelText="Ac amplitude"
                />
                <Field
                    name="acFrequency"
                    component={ TextField }
                    floatingLabelText="Ac frequency"
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

export default connect(mapStateToProps)(Regime);