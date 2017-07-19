import { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import { Form } from 'semantic-ui-react';
import { VAInput, VAButton } from './vascan-ui/form/VAForm';
import Datetime from 'react-datetime';
import is from 'is';
import moment from 'moment';

export default class AddExperimentForm extends Component {
    static propTypes = {
        onSubmit: PropTypes.func,
        onCancel: PropTypes.func,
        errors: PropTypes.object,
        experiment: PropTypes.object,
        active: PropTypes.bool,
        form: PropTypes.object,
        resetForm: PropTypes.func
    }

    static defaultProps = {
        active: true
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
    onChangeStartDate = date => this.props.changeStartDate(moment(date).format("YYYY-MM-DD"))
    onChangeEndDate = date => this.props.changeEndDate(moment(date).format("YYYY-MM-DD"))

    renderPickerBegin(errors, experiment, active, form) {
        const PickerBeginStyle = {
            className: "form-control has-feedback-left",
            placeholder: "Дата начала",
            disabled: !active
        };
        return (
            <VAInput
                control={ Datetime }
                inputProps={ PickerBeginStyle }
                closeOnSelect={ true }
                timeFormat={ false }
                onChange={ this.onChangeStartDate }
                error={ !!errors.start_date }
                value={ experiment && !form.start_date ? experiment.start_date : form.start_date }
            />
        );
    }

    renderPickerEnd(errors, experiment, active, form) {
        const PickerEndStyle = {
            className: "form-control has-feedback-left",
            placeholder: "Дата начала",
            disabled: !active
        };
        return (
            <VAInput
                control={ Datetime }
                inputProps={ PickerEndStyle }
                closeOnSelect={ true }
                timeFormat={ false }
                onChange={ this.onChangeEndDate }
                error={ !!errors.end_date }
                value={ experiment && !form.end_date ? experiment.end_date : form.end_date }
            />
        );
    }

    submitExperiment = event => {
        event.preventDefault();
        this.props.onSubmit();
    }

    render() {
        const { errors, experiment, active, form } = this.props;

        return (
            <div>
                <TextField
                    type="text"
                    errorText={ !!errors.name ? "Введите название" : "" }
                    hintText="Название эксперимента"
                    value={ experiment && !form.name ? experiment.name : form.name }
                    disabled={ !active }
                    onChange={ this.onChangeName }
                /><br />
                <TextField
                    errorText={ !!errors.description ? "Введите описание" : "" }
                    hintText="Описание эксперимента"
                    rows={ 4 }
                    value={ experiment && !form.description ? experiment.description : form.description }
                    disabled={ !active }
                    onChange={ this.onChangeDescription }
                /><br />
                { active && <Form.Group inline>
                    <VAButton basic>
                        { experiment ? 'Редактировать' : 'Создать' }
                    </VAButton>
                    <VAButton type="button" onClick={ this.onCancelClick }>
                        Отмена
                    </VAButton>
                </Form.Group> }
            </div>
        )
    }
}