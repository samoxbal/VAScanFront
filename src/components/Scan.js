import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { isSelectedScan } from '../selectors';
import EditScanForm from './EditScanForm';

const mapStateToProps = state => ({
    scan: state.scan,
    isScanExist: isSelectedScan(state)
});

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

    renderScan() {
        return (
            <div style={ this.style.scanWrapper }>
                <RaisedButton
                    label="Анализ измерений"
                    primary={ true }
                    href={ `/measure/${this.props.scan.id}` }
                />
                <EditScanForm/>
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

export default connect(mapStateToProps)(Scan);