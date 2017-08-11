import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm, reset as resetForm } from 'redux-form';
import MenuItem from 'material-ui/MenuItem';
import {
    DatePicker,
    SelectField,
    TextField,
    Toggle,
} from 'redux-form-material-ui';
import { AddVoltamogrammFormName } from '../constants/formNames';

const mapStateToProps = state => ({
    voltamogramm: state.voltamogramm
});

const mapDispatchToProps = dispatch => bindActionCreators({
    resetForm,
}, dispatch);

@reduxForm({
    form: AddVoltamogrammFormName
})
class AddVoltamogrammForm extends Component {

    static propTypes = {
        voltamogramm: PropTypes.object,
        resetForm: PropTypes.func
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
        this.props.resetForm(AddVoltamogrammFormName);
    }

    render() {
        return (
            <div style={ this.style.wrapper }>
                <br/>
                <Field
                    name="cyclic"
                    component={ Toggle }
                    label="Цикличность"
                    labelPosition="right"
                /><br/>
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
                        name="numberOfElectrodes"
                        component={ SelectField }
                        hintText="Количество электродов"
                    >
                        { this.numberElectrodsOptions.map(item => (
                            <MenuItem
                                key={ item.key }
                                value={ item.value }
                                primaryText={ item.text }
                            />
                        )) }
                    </Field>
                </div>
                <Field
                    name="description"
                    component={ TextField }
                    floatingLabelText="Описание"
                    rows={ 4 }
                    fullWidth={ true }
                /><br/>
                <div style={ this.style.formBlock }>
                    <Field
                        name="solution"
                        component={ TextField }
                        floatingLabelText="Раствор"
                        style={ this.style.margin }
                    />
                    <Field
                        name="equipmentId"
                        component={ TextField }
                        floatingLabelText="Серийный номер электрода"
                    />
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddVoltamogrammForm);