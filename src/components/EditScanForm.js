import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateScan } from '../actions/index';
import { Field, reduxForm, reset as resetForm } from 'redux-form';
import MenuItem from 'material-ui/MenuItem';
import {
    DatePicker,
    SelectField,
    TextField,
    Toggle
} from 'redux-form-material-ui';
import { EditScanFormName } from '../constants/formNames';

const mapStateToProps = state => ({
    initialValues: state.scan
});

const mapDispatchToProps = dispatch => bindActionCreators({
    updateScan,
    resetForm
}, dispatch);

@reduxForm({
    form: EditScanFormName,
    enableReinitialize: true
})
class EditScanForm extends Component {

    static propTypes = {
        initialValues: PropTypes.object,
        updateScan: PropTypes.func,
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
        this.props.resetForm(EditScanForm);
    }

    render() {
        return (
            <div>
                <div style={ this.style.formBlock }>
                    <Field
                        name="date"
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
                    <Field
                        name="stirringSpeed"
                        component={ TextField }
                        floatingLabelText="Скорость перемешивания"
                    />
                </div>
                <div style={ this.style.formBlock }>
                    <Field
                        name="rotation"
                        component={ Toggle }
                        label="Вращение электрода"
                        labelPosition="right"
                        style={{ width: '41%' }}
                    />
                    <Field
                        name="rotationSpeed"
                        component={ TextField }
                        floatingLabelText="Скорость вращения"
                    />
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
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditScanForm);