import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AddVoltamogramm from './AddVoltamogramm';
import { getSelectedExperiment } from '../selectors';
import AddIcon from 'material-ui/svg-icons/content/add';
import { openAddVoltamogramm, updateExperiment } from '../actions/index';
import RaisedButton from 'material-ui/RaisedButton';
import ListLinks from './ListLinks';
import EditExperimentForm from './EditExperimentForm';

const mapStateToProps = state => ({
    experiment: getSelectedExperiment(state),
    voltamogramms: state.voltamogramms,
    errors: state.errors
});

const mapDispatchToProps = dispatch => bindActionCreators({
    openAddVoltamogramm,
    updateExperiment
}, dispatch);

class Experiment extends Component {

    static propTypes = {
        experiment: PropTypes.object,
        voltamogramms: PropTypes.array,
        errors: PropTypes.object,
        form: PropTypes.object,
        updateExperiment: PropTypes.func
    }

    openAddVoltamogramm = () => this.props.openAddVoltamogramm(true)

    editExperiment = () => {
        const {
            experiment: {
                id,
                name,
                description,
                startDate,
                endDate
            },
            form: {
                name: formName,
                description: formDescription,
                startDate: formStartDate,
                endDate: formEndDate
            },
            updateExperiment
        } = this.props;

        updateExperiment({
            id,
            name: formName || name,
            description: formDescription || description,
            startDate: formStartDate || startDate,
            endDate: formEndDate || endDate
        });
    }

    renderExperiment() {
        return (
            <div style={{ clear: 'both' }}>
                <EditExperimentForm/>
            </div>
        )
    }

    renderVoltamogramms(voltamogramms) {
        return (
            <ListLinks
                items={ voltamogramms }
                path='voltamogramm'
            />
        )
    }

    render() {
        const { experiment, voltamogramms } = this.props;

        return (
            <div>
                {experiment && <div>
                    <RaisedButton
                        onTouchTap={ this.openAddVoltamogramm }
                        label='Создать вольтамограмму'
                        style={{ margin: 15 }}
                        icon={ <AddIcon/> }
                        secondary={ true }
                    />
                    { this.renderExperiment() }
                    { !!voltamogramms.length && this.renderVoltamogramms(voltamogramms) }
                    <AddVoltamogramm/>
                </div>}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Experiment);