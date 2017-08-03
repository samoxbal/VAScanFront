import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { resetAddExperimentForm, createExperiment } from '../actions/index';
import { Field, reduxForm } from 'redux-form';
import { DatePicker, TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';

const mapStateToProps = state => ({
    errors: state.errors
});

const mapDispatchToProps = dispatch => bindActionCreators({
    resetAddExperimentForm,
    createExperiment
}, dispatch);

class AddExperimentForm extends Component {
    static propTypes = {
        onSubmit: PropTypes.func,
        onCancel: PropTypes.func,
        resetForm: PropTypes.func,
        isEditMode: PropTypes.bool,
        createExperiment: PropTypes.func
    }

    componentWillUnmount() {
        this.props.resetForm();
    }

    onCancelClick = () => {
        const { onCancel } = this.props;

    }

    submitExperiment = () => this.props.createExperiment()

    renderButtons() {
        return (
            <div style={{ marginTop: 20 }}>
                <RaisedButton
                    primary={ true }
                    label={ this.props.isEditMode ? "Редактировать" : "Создать" }
                    onTouchTap={ this.submitExperiment }
                    style={{ marginRight: 10 }}
                />
                <RaisedButton
                    label="Отмена"
                    onTouchTap={ this.onCancelClick }
                />
            </div>
        )
    }

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

export default reduxForm({ form: 'AddExperiment' })(AddExperimentForm);