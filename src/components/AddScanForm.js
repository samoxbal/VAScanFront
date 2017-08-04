import { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import MenuItem from 'material-ui/MenuItem';
import FileUpload from './FileUpload';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isSelectedScan } from '../selectors/scan';
import {
    DatePicker,
    SelectField,
    TextField,
    Toggle,
} from 'redux-form-material-ui';

const mapStateToProps = state => ({
    errors: state.errors,
    form: state.addScanForm,
    isScanExist: isSelectedScan(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);


class AddScanForm extends Component {

    static propTypes = {
        errors: PropTypes.object,
        form: PropTypes.object,
        isScanExist: PropTypes.bool,
        isEditMode: PropTypes.bool
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

    getFile() {
        return this._file.getFile();
    }

    render() {
        const {
            form,
            isScanExist
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
                    { form.stirring &&
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
                    { form.rotation &&
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
                { !isScanExist && <FileUpload ref={ ref => this._file = ref } /> }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(AddScanForm);