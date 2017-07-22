import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import AddScanForm from './AddScanForm';
import { openAddScan } from '../actions';

const mapStateToProps = state => ({
    openScanModal: state.openAddScan,
    form: state.addScanForm
});

const mapDispatchToProps = dispatch => bindActionCreators({
    openAddScan
}, dispatch);

class AddScan extends Component {

    constructor(props) {
        super(props);
        this.actions = [
            <RaisedButton
                onTouchTap={ this.handleSubmit }
                primary={ true }
                label="Создать"
                style={{ marginRight: 10 }}
            />,
            <RaisedButton
                onTouchTap={ () => this.props.openAddScan(false) }
                label="Отмена"
            />
        ];
    }

    static propTypes = {
        openAddScan: PropTypes.func,
        openScanModal: PropTypes.bool,
        form: PropTypes.object
    }

    render() {
        return (
            <Dialog
                open={ this.props.openScanModal }
                modal={ true }
                title="Создать скан"
                actions={ this.actions }
                autoScrollBodyContent={ true }
            >
                <AddScanForm/>
            </Dialog>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddScan);