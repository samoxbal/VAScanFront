import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AddVoltamogramm from './AddVoltamogramm';
import { getSelectedExperiment } from '../selectors/experiment';
import AddIcon from 'material-ui/svg-icons/content/add';
import { openAddVoltamogramm, updateExperiment, resetAddExperimentForm } from '../actions/index';
import RaisedButton from 'material-ui/RaisedButton';
import ListLinks from './ListLinks';
import AddExperimentForm from './AddExperimentForm';
import createFormAction from '../utils/createFormAction';
import ACTION_TYPES from '../constants/actionTypes';

const mapStateToProps = state => ({
    experiment: getSelectedExperiment(state),
    voltamogramms: state.voltamogramms,
    errors: state.errors,
    form: state.addExperimentForm
});

const mapDispatchToProps = dispatch => bindActionCreators({
    openAddVoltamogramm,
    updateExperiment,
    resetAddExperimentForm,
    changeName: createFormAction(ACTION_TYPES.CHANGE_EXPERIMENT_NAME),
    changeDescription: createFormAction(ACTION_TYPES.CHANGE_EXPERIMENT_DESCRIPTION),
    changeStartDate: createFormAction(ACTION_TYPES.CHANGE_EXPERIMENT_START),
    changeEndDate: createFormAction(ACTION_TYPES.CHANGE_EXPERIMENT_END)
}, dispatch);

class Experiment extends Component {

    static propTypes = {
        experiment: PropTypes.object,
        voltamogramms: PropTypes.array,
        errors: PropTypes.object,
        form: PropTypes.object,
        changeName: PropTypes.func,
        changeDescription: PropTypes.func,
        changeStartDate: PropTypes.func,
        changeEndDate: PropTypes.func,
        resetAddExperimentForm: PropTypes.func,
        updateExperiment: PropTypes.func
    }

    componentWillUnmount() {
        this.props.resetAddExperimentForm();
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
        const {
            experiment,
            errors,
            changeName,
            changeDescription,
            changeStartDate,
            changeEndDate,
            form,
            resetAddExperimentForm
        } = this.props;

        return (
            <div style={{ clear: 'both' }}>
                <AddExperimentForm
                    experiment={ experiment }
                    form={ form }
                    errors={ errors }
                    onSubmit={ this.editExperiment }
                    changeName={ changeName }
                    changeDescription={ changeDescription }
                    changeStartDate={ changeStartDate }
                    changeEndDate={ changeEndDate }
                    resetForm={ resetAddExperimentForm }
                    isEditMode={ true }
                />
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