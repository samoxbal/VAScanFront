import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createScan, openAddVoltamogramm } from '../actions';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import AddVoltamogrammForm from './add-voltamogramm-form/AddVoltamogrammForm';
import AddScanForm from './AddScanForm';

const mapStateToProps = state => ({
    errors: state.errors,
    openPanel: state.openAddVoltamogramm,
    experiment_id: state.selectedExperimentId
});

const mapDispatchToProps = dispatch => bindActionCreators({
    createScan,
    openAddVoltamogramm
}, dispatch);


class AddScan extends Component {

    static propTypes = {
        errors: PropTypes.object,
        openPanel: PropTypes.bool,
        createScan: PropTypes.func,
        experiment_id: PropTypes.string,
        openAddVoltamogramm: PropTypes.func
    }

    handleSubmit = e => {
        e.preventDefault();
        let fileData = new FormData();
        const file = this._scanForm.getFile();
        fileData.append('file', file);
        this.props.createScan({
            experiment_id: this.props.experiment_id,
            file: fileData
        });
    }

    render() {
        const {
            openPanel,
            openAddVoltamogramm
        } = this.props;

        return (
            <Dialog
                open={ openPanel }
                modal={ true }
                onRequestClose={ () => openAddVoltamogramm(false) }
                className="VAModal"
                title="Создать вольтамограмму"
            >
                <AddVoltamogrammForm/>
                <AddScanForm ref={ ref => this._scanForm = ref } />
                <br/>
                <RaisedButton
                    onTouchTap={ this.handleSubmit }
                    label="Создать"
                />
            </Dialog>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddScan);