import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { graphql, withApollo } from 'react-apollo';
import TreeFolder from './TreeFolder';
import { selectExperiment } from '../actions';
import { experiments, voltamogramms } from '../graphql/queries';

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
        client: PropTypes.object
    }

    componentWillMount() {
        this.props.client.query({
            query: experiments,
            variables: {
                user: ""
            }
        });
    }

    onClickExperiment = _id => {
        this.props.selectExperiment(_id);
    }

    render() {
        return (
            <TreeFolder
                data={ this.props.data.experiments }
                onClickItem={ _id => this.onClickExperiment(_id) }
            />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withApollo(ExperimentTree));