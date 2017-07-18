import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { graphql, compose } from 'react-apollo';
import TreeFolder from './TreeFolder';
import { selectExperiment } from '../actions';
import { experiments } from '../graphql/queries';

const mapStateToProps = state => ({
    selectedExperimentId: state.selectedExperimentId
});

const mapDispatchToProps = dispatch => bindActionCreators({
    selectExperiment
}, dispatch);

class ExperimentTree extends Component {

    static propTypes = {
        data: PropTypes.shape({
            experiments: PropTypes.object
        }),
        selectExperiment: PropTypes.func,
        fetchExperiments: PropTypes.func,
        fetchVoltamogramms: PropTypes.func
    }

    onClickExperiment = _id => {
        this.props.selectExperiment(_id);
        this.props.fetchVoltamogramms(_id);
    }

    render() {
        return (
            <TreeFolder
                data={this.props.experiments}
                onClickItem={_id => this.onClickExperiment(_id)}
            />
        )
    }
}

const graphqlExperimentTree = compose(
    graphql(experiments, { name: "fetchExperiments" })
)(ExperimentTree);

export default connect(mapStateToProps, mapDispatchToProps)(graphqlExperimentTree);