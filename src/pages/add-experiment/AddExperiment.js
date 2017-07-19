import { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import PageLayout from '../../components/page-layout/PageLayout';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { resetAddExperimentForm } from '../../actions/index';
import AddExperimentForm from '../../components/AddExperimentForm';
import { Card } from 'material-ui/Card';
import createFormAction from '../../utils/createFormAction';
import ACTION_TYPES from '../../constants/actionTypes';
import { createExperiment } from '../../graphql/mutations';

import './AddExperiment.css';

const mapStateToProps = state => ({
    errors: state.errors,
    form: state.addExperimentForm
});

const mapDispatchToProps = dispatch => bindActionCreators({
    resetAddExperimentForm,
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
        changeEndDate: PropTypes.func
    };

    submitExperiment = () => {
        const {
            mutate,
            form: {
                name,
                description,
                startDate,
                endDate
            }
        } = this.props;

        mutate({
            variables: {
                name,
                description,
                startDate,
                endDate
            }
        });
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
                <div className="AddExperment">
                    <Card style={{ width: '70%' }}>
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

export default connect(mapStateToProps, mapDispatchToProps)(graphql(createExperiment)(AddExperiment));