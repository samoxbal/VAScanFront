import { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
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

    submitExperiment = event => {
        event.preventDefault();
        this.props.onSubmit();
    }

    renderButtons() {
        return (
            <div>
                <RaisedButton
                    primary={ true }
                    label="Создать"
                />
                <RaisedButton
                    label="Отмена"
                    onTouchTap={ this.onCancelClick }
                />
            </div>
        )
    }

    render() {
        const { errors, experiment, active, form } = this.props;

        return (
            <div style={{ padding: 30 }}>
                <DatePicker hintText="Дата начала" />
                <DatePicker hintText="Дата окончания" />
                <TextField
                    type="text"
                    errorText={ !!errors.name ? "Введите название" : "" }
                    hintText="Название эксперимента"
                    value={ experiment && !form.name ? experiment.name : form.name }
                    disabled={ !active }
                    onChange={ this.onChangeName }
                /><br/>
                <TextField
                    errorText={ !!errors.description ? "Введите описание" : "" }
                    hintText="Описание эксперимента"
                    rows={ 4 }
                    value={ experiment && !form.description ? experiment.description : form.description }
                    disabled={ !active }
                    onChange={ this.onChangeDescription }
                /><br/>
                { active && this.renderButtons() }
            </div>
        )
    }
}