import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createExperiment } from '../actions/index';
import { Field, reduxForm, reset as resetForm } from 'redux-form';
import { DatePicker, TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import { AddExperimentFormName } from '../constants/formNames';

const mapDispatchToProps = dispatch => bindActionCreators({
    createExperiment,
    resetForm
}, dispatch);

@reduxForm({
    form: AddExperimentFormName
})
class AddExperimentForm extends Component {
    static propTypes = {
        resetForm: PropTypes.func,
        createExperiment: PropTypes.func
    }

    componentWillUnmount() {
        this.props.resetForm(AddExperimentFormName);
    }

    submitExperiment = () => this.props.createExperiment()

    renderButtons() {
        return (
            <div style={{ marginTop: 20 }}>
                <RaisedButton
                    primary={ true }
                    label="Создать"
                    onTouchTap={ this.submitExperiment }
                    style={{ marginRight: 10 }}
                />
            </div>
        )
    }

    render() {
        return (
            <div style={{ padding: 30 }}>
                <div>
                    <Field
                        name="startDate"
                        component={ DatePicker }
                        format={ null }
                        autoOk={ true }
                        style={{ display: 'inline-block', marginRight: 30 }}
                        hintText="Дата начала"
                    />
                    <Field
                        name="endDate"
                        component={ DatePicker }
                        format={ null }
                        autoOk={ true }
                        style={{ display: 'inline-block' }}
                        hintText="Дата окончания"
                    />
                </div>
                <Field
                    name="name"
                    component={ TextField }
                    floatingLabelText="Название эксперимента"
                    fullWidth={ true }
                /><br/>
                <Field
                    name="description"
                    component={ TextField }
                    floatingLabelText="Описание эксперимента"
                    fullWidth={ true }
                    rows={ 3 }
                /><br/>
                { this.renderButtons() }
            </div>
        )
    }
}

export default connect(null, mapDispatchToProps)(AddExperimentForm);