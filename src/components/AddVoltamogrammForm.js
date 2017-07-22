import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import format from 'date-fns/format';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import createFormAction from '../utils/createFormAction';
import { fieldLense } from '../utils/utils';
import { activeEditVoltamogramm, resetAddVoltamogramm } from '../actions/index';
import ACTION_TYPES from '../constants/actionTypes';

const mapStateToProps = state => ({
    errors: state.errors,
    form: state.addVoltamogrammForm,
    voltamogramm: state.voltamogramm,
    active: state.activeEditVoltamogramm
});

const mapDispatchToProps = dispatch => bindActionCreators({
    activeEditVoltamogramm,
    resetAddVoltamogramm,
    changeCyclic: createFormAction(ACTION_TYPES.CHANGE_VOLTAMOGRAMM_CYCLIC),
    changeVaCycleDatetime: createFormAction(ACTION_TYPES.CHANGE_VOLTAMOGRAMM_DATE),
    changeDescription: createFormAction(ACTION_TYPES.CHANGE_VOLTAMOGRAMM_DESCRIPTION),
    changeSolution: createFormAction(ACTION_TYPES.CHANGE_VOLTAMOGRAMM_SOLUTION),
    changeNumberOfElectrodes: createFormAction(ACTION_TYPES.CHANGE_VOLTAMOGRAMM_ELECTROD_NUMBERS),
    changeEquipmentId: createFormAction(ACTION_TYPES.CHANGE_VOLTAMOGRAMM_EQUIPMENT_ID)
}, dispatch);

class AddVoltamogrammForm extends Component {

    static propTypes = {
        errors: PropTypes.object,
        form: PropTypes.object,
        voltamogramm: PropTypes.object,
        active: PropTypes.bool,
        activeEditVoltamogramm: PropTypes.func,
        changeCyclic: PropTypes.func,
        changeVaCycleDatetime: PropTypes.func,
        changeDescription: PropTypes.func,
        changeSolution: PropTypes.func,
        changeNumberOfElectrodes: PropTypes.func,
        changeEquipmentId: PropTypes.func,
        resetAddVoltamogramm: PropTypes.func
    }

    style = {
        formBlock: {
            display: 'flex',
            alignItems: 'flex-end'
        },
        wrapper: {
            width: '100%'
        },
        margin: {
            marginRight: 30
        }
    }

    numberElectrodsOptions = [
        { key: '1', text: '1', value: 1 },
        { key: '2', text: '2', value: 2 },
        { key: '3', text: '3', value: 3 },
        { key: '4', text: '4', value: 4 }
    ]

    componentWillUnmount() {
        this.props.resetAddVoltamogramm();
    }

    renderButtons() {
        return (
            <div>
                <RaisedButton
                    primary={ true }
                    label="Создать"
                    // onTouchTap={ this.submitExperiment }
                    style={{ marginRight: 10 }}
                />
                <RaisedButton
                    label="Отмена"
                    onTouchTap={ () => this.props.activeEditVoltamogramm(false) }
                />
            </div>
        )
    }

    render() {
        const {
            form,
            voltamogramm,
            errors,
            changeVaCycleDatetime,
            changeCyclic,
            changeDescription,
            changeSolution,
            changeEquipmentId
        } = this.props;

        return (
            <div style={ this.style.wrapper }>
                <br/>
                <Toggle
                    label="Цикличность"
                    labelPosition="right"
                    toggled={ fieldLense(voltamogramm, form, 'cyclic') }
                    onToggle={ (e, toggled) => changeCyclic(toggled) }
                /><br/>
                <div style={ this.style.formBlock }>
                    <DatePicker
                        hintText="Дата проведения"
                        autoOk={ true }
                        onChange={ date => changeVaCycleDatetime(format(date, 'MM-DD-YYYY')) }
                        style={ this.style.margin }
                    />
                    <SelectField
                        floatingLabelText="Количество электродов"
                        value={ fieldLense(voltamogramm, form, 'number_of_electrodes') }
                        onChange={ (e, key, data) => this.props.changeNumberOfElectrodes(data) }
                    >
                        { this.numberElectrodsOptions.map(item => (
                            <MenuItem
                                key={ item.key }
                                value={ item.value }
                                primaryText={ item.text }
                            />
                        )) }
                    </SelectField>
                </div>
                <TextField
                    errorText={ !!errors.description ? "Введите описание" : "" }
                    floatingLabelText="Описание"
                    rows={ 4 }
                    value={ fieldLense(voltamogramm, form, 'description') }
                    onChange={ (e, data) => changeDescription(data) }
                    fullWidth={ true }
                /><br/>
                <div style={ this.style.formBlock }>
                    <TextField
                        floatingLabelText="Раствор"
                        value={ fieldLense(voltamogramm, form, 'solution') }
                        onChange={ (e, data) => changeSolution(data) }
                        style={ this.style.margin }
                    />
                    <TextField
                        floatingLabelText="Серийный номер электрода"
                        value={ fieldLense(voltamogramm, form, 'equipment_id') }
                        onChange={ (e, data) => changeEquipmentId(data) }
                    />
                </div>
                { false && this.renderButtons() }
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddVoltamogrammForm);