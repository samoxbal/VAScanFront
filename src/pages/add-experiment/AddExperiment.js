import { Component } from 'react';
import PropTypes from 'prop-types';
import PageLayout from '../../components/PageLayout';
import jwtDecode from 'jwt-decode';
import { bindActionCreators } from 'redux';
import { resetAddExperimentForm, createExperiment } from '../../actions/index';
import AddExperimentForm from '../../components/AddExperimentForm';
import { Card } from 'material-ui/Card';

const mapStateToProps = state => ({
    errors: state.errors
});

const mapDispatchToProps = dispatch => bindActionCreators({
    resetAddExperimentForm,
    createExperiment
}, dispatch);


export default class AddExperiment extends Component {

    static propTypes = {
        errors: PropTypes.object,
        form: PropTypes.object,
        resetAddExperimentForm: PropTypes.func,
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
            form: {
                name,
                description,
                startDate,
                endDate
            },
            createExperiment
        } = this.props;

        createExperiment({
            user: jwtDecode(localStorage.getItem('token')).sub,
            name,
            description,
            startDate,
            endDate
        });
    }

    render() {
        return (
            <PageLayout>
                <div style={ this.style.wrapper }>
                    <Card style={ this.style.card }>
                        <AddExperimentForm/>
                    </Card>
                </div>
            </PageLayout>
        )
    }
}