import { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import is from 'is';
import { fieldLense } from '../utils/utils';

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
    onChangeStartDate = (e, date) => this.props.changeStartDate(date)
    onChangeEndDate = (e, date) => this.props.changeEndDate(date)

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
        const { errors, experiment, active, form } = this.props;

        return (
            <div style={{ padding: 30 }}>
                <div>
                    <DatePicker
                        hintText="Дата начала"
                        onChange={ this.onChangeStartDate }
                        autoOk={ true }
                        style={{ display: 'inline-block', marginRight: 30 }}
                    />
                    <DatePicker
                        hintText="Дата окончания"
                        onChange={ this.onChangeEndDate }
                        autoOk={ true }
                        style={{ display: 'inline-block' }}
                    />
                </div>
                <TextField
                    type="text"
                    errorText={ !!errors.name ? "Введите название" : "" }
                    floatingLabelText="Название эксперимента"
                    value={ fieldLense(experiment, form, 'name') }
                    disabled={ !active }
                    onChange={ this.onChangeName }
                    fullWidth={ true }
                /><br/>
                <TextField
                    errorText={ !!errors.description ? "Введите описание" : "" }
                    floatingLabelText="Описание эксперимента"
                    rows={ 4 }
                    value={ fieldLense(experiment, form, 'description') }
                    disabled={ !active }
                    onChange={ this.onChangeDescription }
                    fullWidth={ true }
                /><br/>
                { active && this.renderButtons() }
            </div>
        )
    }
}