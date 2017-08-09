import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isSelectedScan } from '../selectors';
import AddScanForm from './AddScanForm';
import ListLinks from './ListLinks';

const mapStateToProps = state => ({
    scan: state.scan,
    isScanExist: isSelectedScan(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

class Scan extends Component {

    static propTypes = {
        scan: PropTypes.object,
        isScanExist: PropTypes.bool
    }

    style = {
        scanWrapper: {
            padding: 25
        }
    }

    renderMeasures(measures) {
        return (
            <ListLinks
                items={ measures }
                path='measure'
            />
        )
    }

    renderScan() {
        const { measures } = this.props.scan;
        return (
            <div style={ this.style.scanWrapper }>
                <AddScanForm/>
                { measures && this.renderMeasures(measures) }
            </div>
        )
    }

    render() {
        return (
            <div>
                { this.props.isScanExist && this.renderScan() }
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Scan);