import { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'material-ui/DatePicker';
import Toggle from 'material-ui/Toggle';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FileUpload from './FileUpload';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import createFormAction from '../utils/createFormAction';
import ACTION_TYPES from '../constants/actionTypes';
import { getSelectedScan, isSelectedScan } from '../selectors/scan';
import { fieldLense } from '../utils/utils';

const mapStateToProps = state => ({
    errors: state.errors,
    form: state.addScanForm,
    scan: getSelectedScan(state),
    isScanExist: isSelectedScan(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    changeScanDatetime: createFormAction(ACTION_TYPES.CHANGE_SCAN_DATETIME),
    changeStartPotential: createFormAction(ACTION_TYPES.CHANGE_START_POTENTIAL),
    changeEndPotential: createFormAction(ACTION_TYPES.CHANGE_END_POTENTIAL),
    changeReverseDirection: createFormAction(ACTION_TYPES.CHANGE_REVERSE_DIRECTION),
    changeStirring: createFormAction(ACTION_TYPES.CHANGE_STIRRING),
    changeStirringSpeed: createFormAction(ACTION_TYPES.CHANGE_STIRRING_SPEED),
    changeRotation: createFormAction(ACTION_TYPES.CHANGE_ROTATION),
    changeRotationSpeed: createFormAction(ACTION_TYPES.CHANGE_ROTATION_SPEED),
    changeChannelId: createFormAction(ACTION_TYPES.CHANGE_CHANNEL_ID),
    changeChannelLabel: createFormAction(ACTION_TYPES.CHANGE_CHANNEL_LABEL),
    changeTemperature: createFormAction(ACTION_TYPES.CHANGE_TEMPERATURE),
    changePressure: createFormAction(ACTION_TYPES.CHANGE_PRESSURE),
    changeRegime: createFormAction(ACTION_TYPES.CHANGE_REGIME)
}, dispatch);


class AddScanForm extends Component {

    static propTypes = {
        errors: PropTypes.object,
        form: PropTypes.object,
        scan: PropTypes.object,
        isScanExist: PropTypes.bool,
        changeScanDatetime: PropTypes.func,
        changeStartPotential: PropTypes.func,
        changeEndPotential: PropTypes.func,
        changeReverseDirection: PropTypes.func,
        changeStirring: PropTypes.func,
        changeStirringSpeed: PropTypes.func,
        changeRotation: PropTypes.func,
        changeRotationSpeed: PropTypes.func,
        changeChannelId: PropTypes.func,
        changeChannelLabel: PropTypes.func,
        changeTemperature: PropTypes.func,
        changePressure: PropTypes.func,
        changeRegime: PropTypes.func
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
            errors,
            scan,
            isScanExist,
            changeScanDatetime,
            changeStartPotential,
            changeEndPotential,
            changeReverseDirection,
            changeStirring,
            changeStirringSpeed,
            changeRotation,
            changeRotationSpeed,
            changeChannelId,
            changeChannelLabel,
            changeTemperature,
            changePressure,
            changeRegime
        } = this.props;

        return (
            <div>
                <div style={ this.style.formBlock }>
                    <DatePicker
                        hintText="Дата проведения"
                        autoOk={ true }
                        onChange={ date => changeScanDatetime(date) }
                        style={ this.style.margin }
                    />
                    <Toggle
                        label="Прямая развертка"
                        labelPosition="right"
                        toggled={ fieldLense(scan, form, 'reverse_direction') }
                        onToggle={ (e, toggled) => changeReverseDirection(toggled) }
                        style={{ width: '50%' }}
                    />
                </div>
                <div style={ this.style.formBlock }>
                    <TextField
                        floatingLabelText="Начальный потенциал"
                        value={ fieldLense(scan, form, 'start_potential') }
                        onChange={ (e, data) => changeStartPotential(data) }
                        style={ this.style.margin }
                    />
                    <TextField
                        floatingLabelText="Конечный потенциал"
                        value={ fieldLense(scan, form, 'end_potential') }
                        onChange={ (e, data) => changeEndPotential(data) }
                    />
                </div>
                <div style={ this.style.formBlock }>
                    <TextField
                        floatingLabelText="Номер канала"
                        value={ fieldLense(scan, form, 'channel_id') }
                        onChange={ (e, data) => changeChannelId(data) }
                        style={ this.style.margin }
                    />
                    <TextField
                        floatingLabelText="Имя канала"
                        value={ fieldLense(scan, form, 'channel_label') }
                        onChange={ (e, data) => changeChannelLabel(data) }
                    />
                </div>
                <div style={ this.style.formBlock }>
                    <TextField
                        floatingLabelText="Температура"
                        value={ fieldLense(scan, form, 'temperature') }
                        onChange={ (e, data) => changeTemperature(data) }
                        style={ this.style.margin }
                    />
                    <TextField
                        floatingLabelText="Давление"
                        value={ fieldLense(scan, form, 'pressure') }
                        onChange={ (e, data) => changePressure(data) }
                    />
                </div>
                <div style={ this.style.formBlock }>
                    <Toggle
                        label="Мешалка"
                        labelPosition="right"
                        toggled={ fieldLense(scan, form, 'stirring') }
                        onToggle={ (e, toggled) => changeStirring(toggled) }
                        style={{ width: '41%' }}
                    />
                    { form.stirring &&
                    <TextField
                        floatingLabelText="Скорость перемешивания"
                        value={ fieldLense(scan, form, 'stirring_speed') }
                        onChange={ (e, data) => changeStirringSpeed(data) }
                    /> }
                </div>
                <div style={ this.style.formBlock }>
                    <Toggle
                        label="Вращение электрода"
                        labelPosition="right"
                        toggled={ fieldLense(scan, form, 'rotation') }
                        onToggle={ (e, toggled) => changeRotation(toggled) }
                        style={{ width: '41%' }}
                    />
                    { form.rotation &&
                    <TextField
                        floatingLabelText="Скорость вращения"
                        value={ fieldLense(scan, form, 'rotation_speed') }
                        onChange={ (e, data) => changeRotationSpeed(data) }
                    /> }
                </div>
                <SelectField
                    floatingLabelText="Тип измерения"
                    value={ fieldLense(scan, form, 'regime') }
                    onChange={ (e, key, data) => changeRegime(data) }
                >
                    { this.regimeOptions.map(item => (
                        <MenuItem
                            key={ item.key }
                            value={ item.value }
                            primaryText={ item.text }
                        />
                    )) }
                </SelectField>
                { !isScanExist && <FileUpload ref={ ref => this._file = ref } /> }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(AddScanForm);