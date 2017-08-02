import { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { DatePicker, TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import is from 'is';
import format from 'date-fns/format';
import { fieldLense, fieldDateLense } from '../utils/utils';

class AddExperimentForm extends Component {
    static propTypes = {
        onSubmit: PropTypes.func,
        onCancel: PropTypes.func,
        errors: PropTypes.object,
        experiment: PropTypes.object,
        form: PropTypes.object,
        resetForm: PropTypes.func,
        isEditMode: PropTypes.bool
    }

    static defaultProps = {
        isEditMode: false
    }

    componentWillUnmount() {
        this.props.resetForm();
    }

    onCancelClick = () => {
        const { onCancel } = this.props;
        if (is.fn(onCancel)) {
            onCancel();
        }
    }

    onChangeName = (e, data) => this.props.changeName(data)
    onChangeDescription = (e, data) => this.props.changeDescription(data)
    onChangeStartDate = (e, date) => this.props.changeStartDate(format(date, 'MM-DD-YYYY'))
    onChangeEndDate = (e, date) => this.props.changeEndDate(format(date, 'MM-DD-YYYY'))

    submitExperiment = event => {
        event.preventDefault();
        this.props.onSubmit();
    }

    renderButtons() {
        return (
            <div>
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
        const { errors, experiment, form } = this.props;

        return (
            <div style={{ padding: 30 }}>
                <div>
                    <Field
                        name="startDate"
                        component={ DatePicker }
                        format={ null }
                        autoOk={ true }
                        style={{ display: 'inline-block' }}
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
                    // validate={[required, email]}
                /><br/>
                <Field
                    name="description"
                    component={ TextField }
                    floatingLabelText="Описание эксперимента"
                    // validate={[required, email]}
                /><br/>
                { this.renderButtons() }
            </div>
        )
    }
}

export default reduxForm({ form: 'AddExperimentForm' })(AddExperimentForm);