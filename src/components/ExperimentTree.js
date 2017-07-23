import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withApollo } from 'react-apollo';
import jwtDecode from 'jwt-decode';
import TreeFolder from './TreeFolder';
import { selectExperiment, fetchExperiments, fetchVoltamogramms } from '../actions';
import { experiments, voltamogramms } from '../graphql/queries';

const mapStateToProps = state => ({
    experiments: state.experiments,
    selectedExperimentId: state.selectedExperimentId
});

const mapDispatchToProps = dispatch => bindActionCreators({
    selectExperiment,
    fetchExperiments,
    fetchVoltamogramms
}, dispatch);

class ExperimentTree extends Component {

    static propTypes = {
        experiments: PropTypes.array,
        selectExperiment: PropTypes.func,
        client: PropTypes.object,
        fetchExperiments: PropTypes.func,
        fetchVoltamogramms: PropTypes.func
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

    onClickExperiment = id => {
        const { client, selectExperiment, fetchVoltamogramms } = this.props;
        selectExperiment(id);
        client.query({
            query: voltamogramms,
            variables: {
                experiment: id
            }
        }).then(data => fetchVoltamogramms(data.data.voltamogramms));
    }

    render() {
        return (
            <TreeFolder
                data={ this.props.experiments }
                onClickItem={ id => this.onClickExperiment(id) }
            />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withApollo(ExperimentTree));