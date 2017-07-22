import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import createFormAction from '../../utils/createFormAction';
import { fieldLense } from '../../utils/utils';
import { activeEditVoltamogramm } from '../../actions/index';
import ACTION_TYPES from '../../constants/actionTypes';

import './AddVoltamogrammForm.css';

const mapStateToProps = state => ({
    errors: state.errors,
    form: state.addVoltamogrammForm,
    voltamogramm: state.voltamogramm,
    active: state.activeEditVoltamogramm
});

const mapDispatchToProps = dispatch => bindActionCreators({
    activeEditVoltamogramm,
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
        changeEquipmentId: PropTypes.func
    }

    numberElectrodsOptions = [
        { key: '1', text: '1', value: 1 },
        { key: '2', text: '2', value: 2 },
        { key: '3', text: '3', value: 3 },
        { key: '4', text: '4', value: 4 }
    ]

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
            active,
            changeVaCycleDatetime,
            changeCyclic,
            changeDescription,
            changeSolution,
            changeEquipmentId
        } = this.props;

        return (
            <div className="AddVoltamogrammForm">
                <h3>Параметры вольтаммограммы</h3>
                <div className="AddVoltamogrammForm__formBlock">
                    <DatePicker
                        disabled={ !active }
                        value={ fieldLense(voltamogramm, form, 'va_cycle_datetime') }
                        autoOk={ true }
                        onChange={ date => changeVaCycleDatetime(date) }
                    />
                    <Toggle
                        label="Цикличная вольтамперограмма"
                        labelPosition="right"
                        disabled={ !active }
                        toggled={ fieldLense(voltamogramm, form, 'cyclic') }
                        onChange={ (e, toggled) => changeCyclic(toggled) }
                        style={{ width: '50%' }}
                    />
                </div>
                <TextField
                    errorText={ !!errors.description ? "Введите описание" : "" }
                    floatingLabelText="Описание"
                    rows={ 4 }
                    value={ fieldLense(voltamogramm, form, 'description') }
                    disabled={ !active }
                    onChange={ (e, data) => changeDescription(data) }
                    fullWidth={ true }
                /><br/>
                <div className="AddVoltamogrammForm__formBlock">
                    <TextField
                        floatingLabelText="Раствор"
                        disabled={ !active }
                        value={ fieldLense(voltamogramm, form, 'solution') }
                        onChange={ (e, data) => changeSolution(data) }
                        style={{ display: 'inline-block' }}
                    />
                    <TextField
                        floatingLabelText="Серийный номер электрода"
                        disabled={ !active }
                        value={ fieldLense(voltamogramm, form, 'equipment_id') }
                        onChange={ (e, data) => changeEquipmentId(data) }
                        style={{ width: '30%' }}
                    />
                    <SelectField
                        floatingLabelText="Количество электродов"
                        error={ !!errors.number_of_electrodes }
                        disabled={ !active }
                        value={ fieldLense(voltamogramm, form, 'number_of_electrodes') }
                        onChange={ (e, data) => this.props.changeNumberOfElectrodes(data) }
                        style={{ width: '30%' }}
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
                { active && this.renderButtons() }
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddVoltamogrammForm);