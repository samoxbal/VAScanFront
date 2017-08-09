import { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from 'material-ui/MenuItem';
import FileUpload from './FileUpload';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AddScanFormName } from '../constants/formNames';
import {
    DatePicker,
    SelectField,
    TextField,
    Toggle,
} from 'redux-form-material-ui';
import {
    Field,
    reduxForm,
    getFormValues,
    reset as resetForm
} from 'redux-form';

const mapStateToProps = state => ({
    formValues: getFormValues(AddScanFormName)(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    resetForm
}, dispatch);

@reduxForm({
    form: AddScanFormName
})
class AddScanForm extends Component {

    static propTypes = {
        formValues: PropTypes.object,
        isEditMode: PropTypes.bool,
        resetForm: PropTypes.func
    }

    style = {
        formBlock: {
            display: 'flex',
            alignItems: 'baseline'
        },
        margin: {
            marginRight: 30
        }
    }

    regimeOptions = [
        { key: '01', text: 'normal', value: 'normal' },
        { key: '02', text: 'differential', value: 'differential' },
        { key: '03', text: 'square_wave', value: 'square_wave' },
        { key: '04', text: 'staircase', value: 'staircase' },
        { key: '05', text: 'ac', value: 'ac' }
    ]

    componentWillUnmount() {
        this.props.resetForm(AddScanFormName);
    }

    getFile() {
        return this._file.getFile();
    }

    render() {
        const {
            formValues
        } = this.props;

        return (
            <div>
                <div style={ this.style.formBlock }>
                    <Field
                        name="scanDate"
                        component={ DatePicker }
                        hintText="Дата проведения"
                        autoOk={ true }
                        format={ null }
                        style={ this.style.margin }
                    />
                    <Field
                        name="reverseDirection"
                        component={ Toggle }
                        label="Прямая развертка"
                        labelPosition="right"
                        style={{ width: '50%' }}
                    />
                </div>
                <div style={ this.style.formBlock }>
                    <Field
                        name="startPotential"
                        component={ TextField }
                        floatingLabelText="Начальный потенциал"
                        style={ this.style.margin }
                    />
                    <Field
                        name="endPotential"
                        component={ TextField }
                        floatingLabelText="Конечный потенциал"
                    />
                </div>
                <div style={ this.style.formBlock }>
                    <Field
                        name="channelId"
                        component={ TextField }
                        floatingLabelText="Номер канала"
                        style={ this.style.margin }
                    />
                    <Field
                        name="channelLabel"
                        component={ TextField }
                        floatingLabelText="Имя канала"
                    />
                </div>
                <div style={ this.style.formBlock }>
                    <Field
                        name="temperature"
                        component={ TextField }
                        floatingLabelText="Температура"
                        style={ this.style.margin }
                    />
                    <Field
                        name="pressure"
                        component={ TextField }
                        floatingLabelText="Давление"
                    />
                </div>
                <div style={ this.style.formBlock }>
                    <Field
                        name="stirring"
                        component={ Toggle }
                        label="Мешалка"
                        labelPosition="right"
                        style={{ width: '41%' }}
                    />
                    { formValues && formValues.stirring &&
                    <Field
                        name="stirringSpeed"
                        component={ TextField }
                        floatingLabelText="Скорость перемешивания"
                    /> }
                </div>
                <div style={ this.style.formBlock }>
                    <Field
                        name="rotation"
                        component={ Toggle }
                        label="Вращение электрода"
                        labelPosition="right"
                        style={{ width: '41%' }}
                    />
                    { formValues && formValues.rotation &&
                    <Field
                        name="rotationSpeed"
                        component={ TextField }
                        floatingLabelText="Скорость вращения"
                    /> }
                </div>
                <Field
                    name="regime"
                    component={ SelectField }
                    floatingLabelText="Тип измерения"
                >
                    { this.regimeOptions.map(item => (
                        <MenuItem
                            key={ item.key }
                            value={ item.value }
                            primaryText={ item.text }
                        />
                    )) }
                </Field>
                <FileUpload ref={ ref => this._file = ref } />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(AddScanForm);