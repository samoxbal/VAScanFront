import {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import {List} from 'semantic-ui-react';
import {getSelectedScan} from '../selectors/scan';
import AddScanForm from './AddScanForm';
import ListLinks from './ListLinks';

const mapStateToProps = state => ({
    measures: state.measures,
    scan: getSelectedScan(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

class Scan extends Component {

    renderMeasures(measures) {
        return (
            <ListLinks
                items={ measures }
                path='measure'
            />
        )
    }

    render() {
        const {scan, measures} = this.props;

        return (
            <div>
                {scan && <div>
                    <AddScanForm/>
                    {measures.length && this.renderMeasures(measures)}
                </div>}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Scan);