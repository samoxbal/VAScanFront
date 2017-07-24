import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TreeFolder from './TreeFolder';
import { selectExperiment, fetchExperiments, fetchVoltamogramms } from '../actions';

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
        fetchExperiments: PropTypes.func,
        fetchVoltamogramms: PropTypes.func
    }

    componentWillMount() {
        this.props.fetchExperiments();
    }

    onClickExperiment = id => {
        const { selectExperiment, fetchVoltamogramms } = this.props;
        selectExperiment(id);
        fetchVoltamogramms(id);
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

export default connect(mapStateToProps, mapDispatchToProps)(ExperimentTree);