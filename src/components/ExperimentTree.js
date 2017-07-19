import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withApollo } from 'react-apollo';
import jwtDecode from 'jwt-decode';
import TreeFolder from './TreeFolder';
import { selectExperiment, fetchExperiments } from '../actions';
import { experiments, voltamogramms } from '../graphql/queries';

const mapStateToProps = state => ({
    experiments: state.experiments,
    selectedExperimentId: state.selectedExperimentId
});

const mapDispatchToProps = dispatch => bindActionCreators({
    selectExperiment,
    fetchExperiments
}, dispatch);

class ExperimentTree extends Component {

    static propTypes = {
        experiments: PropTypes.array,
        selectExperiment: PropTypes.func,
        client: PropTypes.object,
        fetchExperiments: PropTypes.func
    }

    componentWillMount() {
        const { client, fetchExperiments } = this.props;
        client.query({
            query: experiments,
            variables: {
                user: jwtDecode(localStorage.getItem('token')).sub
            }
        }).then(data => fetchExperiments(data.data.experiments));
    }

    onClickExperiment = _id => {
        const { client, selectExperiment } = this.props;
        selectExperiment(_id);
    }

    render() {
        return (
            <TreeFolder
                data={ this.props.experiments }
                onClickItem={ _id => this.onClickExperiment(_id) }
            />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withApollo(ExperimentTree));