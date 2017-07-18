import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { graphql } from 'react-apollo';
import TreeFolder from './TreeFolder';
import { selectExperiment, fetchVoltamogramms } from '../actions';
import { experiments } from '../graphql/queries';

const mapStateToProps = state => ({
    selectedExperimentId: state.selectedExperimentId
});

const mapDispatchToProps = dispatch => bindActionCreators({
    selectExperiment,
    fetchVoltamogramms
}, dispatch);

class ExperimentTree extends Component {

    static propTypes = {
        data: PropTypes.shape({
            experiments: PropTypes.object
        }),
        selectExperiment: PropTypes.func
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

export default connect(mapStateToProps, mapDispatchToProps)(ExperimentTree);