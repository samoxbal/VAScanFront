import { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import PageLayout from '../../components/PageLayout';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { bindActionCreators } from 'redux';
import { resetAddExperimentForm, createExperiment } from '../../actions/index';
import AddExperimentForm from '../../components/AddExperimentForm';
import { Card } from 'material-ui/Card';
import createFormAction from '../../utils/createFormAction';
import ACTION_TYPES from '../../constants/actionTypes';
import { createExperiment as createExperimentMutation } from '../../graphql/mutations';

const mapStateToProps = state => ({
    errors: state.errors,
    form: state.addExperimentForm
});

const mapDispatchToProps = dispatch => bindActionCreators({
    resetAddExperimentForm,
    createExperiment,
    changeName: createFormAction(ACTION_TYPES.CHANGE_EXPERIMENT_NAME),
    changeDescription: createFormAction(ACTION_TYPES.CHANGE_EXPERIMENT_DESCRIPTION),
    changeStartDate: createFormAction(ACTION_TYPES.CHANGE_EXPERIMENT_START),
    changeEndDate: createFormAction(ACTION_TYPES.CHANGE_EXPERIMENT_END)
}, dispatch);


class AddExperiment extends Component {

    static propTypes = {
        errors: PropTypes.object,
        form: PropTypes.object,
        mutate: PropTypes.func,
        resetAddExperimentForm: PropTypes.func,
        changeName: PropTypes.func,
        changeDescription: PropTypes.func,
        changeStartDate: PropTypes.func,
        changeEndDate: PropTypes.func,
        createExperiment: PropTypes.func
    };

    style = {
        wrapper: {
            display: 'flex',
            justifyContent: 'space-around',
            marginTop: 40,
            flexWrap: 'wrap'
        },
        card: {
            width: '70%'
        }
    }

    submitExperiment = () => {
        const {
            mutate,
            form: {
                name,
                description,
                startDate,
                endDate
            },
            createExperiment
        } = this.props;

        mutate({
            variables: {
                user: jwtDecode(localStorage.getItem('token')).sub,
                name,
                description,
                startDate,
                endDate
            }
        }).then(() => createExperiment());
    }

    render() {
        const {
            changeName,
            changeDescription,
            changeStartDate,
            changeEndDate,
            form,
            errors,
            resetAddExperimentForm
        } = this.props;

        return (
            <PageLayout>
                <div style={ this.style.wrapper }>
                    <Card style={ this.style.card }>
                        <AddExperimentForm
                            isEdit={ false }
                            onSubmit={ this.submitExperiment }
                            errors={ errors }
                            changeName={ changeName }
                            changeDescription={ changeDescription }
                            changeStartDate={ changeStartDate }
                            changeEndDate={ changeEndDate }
                            form={ form }
                            resetForm={ resetAddExperimentForm }
                        />
                    </Card>
                </div>
            </PageLayout>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(graphql(createExperimentMutation)(AddExperiment));