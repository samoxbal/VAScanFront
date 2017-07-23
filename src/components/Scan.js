import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import EditIcon from 'material-ui/svg-icons/content/create';
import { getSelectedScan } from '../selectors/scan';
import AddScanForm from './AddScanForm';
import ListLinks from './ListLinks';

const mapStateToProps = state => ({
    measures: state.measures,
    scan: getSelectedScan(state),
    form: state.addScanForm
});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

class Scan extends Component {

    static propTypes = {
        scan: PropTypes.object,
        measures: PropTypes.array,
        form: PropTypes.object
    }

    style = {
        scanWrapper: {
            padding: 25
        },
        editButton: {
            marginBottom: 15
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

    renderScan(measures) {
        return (
            <div style={ this.style.scanWrapper }>
                <RaisedButton
                    label='Редактировать скан'
                    icon={ <EditIcon/> }
                    secondary={ true }
                    style={ this.style.editButton }
                />
                <AddScanForm/>
                { !!measures.length && this.renderMeasures(measures) }
            </div>
        )
    }

    render() {
        const { scan, measures } = this.props;

        return (
            <div>
                { scan && this.renderScan(measures) }
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Scan);