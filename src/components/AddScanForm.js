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
import Regime from './Regime';
import createFormAction from '../utils/createFormAction';
import ACTION_TYPES from '../constants/actionTypes';
import { getSelectedScan, isSelectedScan } from '../selectors/scan';

const mapStateToProps = state => ({
    errors: state.errors,
    addScan: state.addScanForm,
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
        addScan: PropTypes.object,
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
            justifyContent: 'space-between',
            alignItems: 'flex-end'
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
            addScan,
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
                <h3>Параметры измерения</h3>
                <div style={ this.style.formBlock }>
                    <DatePicker
                        hintText="Дата проведения"
                        autoOk={ true }
                        onChange={ date => changeScanDatetime(date) }
                    />
                    <TextField
                        floatingLabelText="Название"
                        // value={ fieldLense(voltamogramm, form, 'description') }
                        // onChange={ (e, data) => changeStartPotential(data) }
                    />
                </div>
                <div style={ this.style.formBlock }>
                    <TextField
                        floatingLabelText="Начальный потенциал"
                        // value={ fieldLense(voltamogramm, form, 'description') }
                        onChange={ (e, data) => changeStartPotential(data) }
                    />
                    <TextField
                        floatingLabelText="Конечный потенциал"
                        // value={ fieldLense(voltamogramm, form, 'description') }
                        onChange={ (e, data) => changeEndPotential(data) }
                    />
                </div>
                <div style={ this.style.formBlock }>
                    <TextField
                        floatingLabelText="Номер канала"
                        // value={ fieldLense(voltamogramm, form, 'description') }
                        onChange={ (e, data) => changeChannelId(data) }
                    />
                    <TextField
                        floatingLabelText="Имя канала"
                        // value={ fieldLense(voltamogramm, form, 'description') }
                        onChange={ (e, data) => changeChannelLabel(data) }
                    />
                </div>
                <div style={ this.style.formBlock }>
                    <TextField
                        floatingLabelText="Температура"
                        // value={ fieldLense(voltamogramm, form, 'description') }
                        onChange={ (e, data) => changeTemperature(data) }
                    />
                    <TextField
                        floatingLabelText="Давление"
                        // value={ fieldLense(voltamogramm, form, 'description') }
                        onChange={ (e, data) => changePressure(data) }
                    />
                </div>

                <Toggle
                    label="Прямая развертка"
                    // toggled={ fieldLense(voltamogramm, form, 'cyclic') }
                    onChange={ (e, toggled) => changeReverseDirection(toggled) }
                />
                <Toggle
                    label="Мешалка"
                    // toggled={ fieldLense(voltamogramm, form, 'cyclic') }
                    onChange={ (e, toggled) => changeStirring(toggled) }
                />
                <Toggle
                    label="Вращение электрода"
                    // toggled={ fieldLense(voltamogramm, form, 'cyclic') }
                    onChange={ (e, toggled) => changeRotation(toggled) }
                />
                { addScan.stirring &&
                    <TextField
                        floatingLabelText="Скорость перемешивания"
                        // value={addScan.stirring_speed}
                        onChange={ (e, data) => changeStirringSpeed(data) }
                    /> }
                { addScan.rotation &&
                    <TextField
                        floatingLabelText="Скорость вращения"
                        // value={addScan.rotation_speed}
                        onChange={ (e, data) => changeRotationSpeed(data) }
                    /> }
                <SelectField
                    floatingLabelText="Тип измерения"
                    value={ addScan.regime }
                    onChange={ (e, data) => this.props.changeRegime(data) }
                >
                    { this.regimeOptions.map(item => (
                        <MenuItem
                            key={ item.key }
                            value={ item.value }
                            primaryText={ item.text }
                        />
                    )) }
                </SelectField>
                <Regime/>
                { !isScanExist && <FileUpload ref={ ref => this._file = ref } /> }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(AddScanForm);