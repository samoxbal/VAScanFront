import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateExperiment } from '../actions/index';
import { Field, reduxForm, reset as resetForm } from 'redux-form';
import { DatePicker, TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import { EditExperimentFormName } from '../constants/formNames';
import { getSelectedExperiment } from '../selectors';

const mapStateToProps = state => ({
    initialValues: getSelectedExperiment(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    updateExperiment,
    resetForm
}, dispatch);

@reduxForm({
    form: EditExperimentFormName,
    enableReinitialize: true
})
class EditExperimentForm extends Component {

    static propTypes = {
        initialValues: PropTypes.object,
        updateExperiment: PropTypes.func,
        resetForm: PropTypes.func
    }

    componentWillUnmount() {
        this.props.resetForm(EditExperimentForm);
    }

    renderButtons() {
        return (
            <div style={{ marginTop: 20 }}>
                <RaisedButton
                    primary={ true }
                    label="Редактировать"
                    onTouchTap={ this.submitExperiment }
                    style={{ marginRight: 10 }}
                />
            </div>
        )
    }

    submitExperiment = () => this.props.updateExperiment()

    render() {
        return (
            <div style={{ padding: 30 }}>
                <div>
                    <Field
                        name="startDate"
                        component={ DatePicker }
                        format={ null }
                        autoOk={ true }
                        style={{ display: 'inline-block', marginRight: 30 }}
                        hintText="Дата начала"
                    />
                    <Field
                        name="endDate"
                        component={ DatePicker }
                        format={ null }
                        autoOk={ true }
                        style={{ display: 'inline-block' }}
                        hintText="Дата окончания"
                    />
                </div>
                <Field
                    name="name"
                    component={ TextField }
                    floatingLabelText="Название эксперимента"
                    fullWidth={ true }
                /><br/>
                <Field
                    name="description"
                    component={ TextField }
                    floatingLabelText="Описание эксперимента"
                    fullWidth={ true }
                    rows={ 3 }
                /><br/>
                { this.renderButtons() }
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditExperimentForm);