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
    openPanel: state.openAddVoltamogramm,
    experiment_id: state.selectedExperimentId
});

const mapDispatchToProps = dispatch => bindActionCreators({
    createScan,
    openAddVoltamogramm
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
                onTouchTap={ () => this.props.openAddVoltamogramm(false) }
                label="Отмена"
            />
        ];
    }

    static propTypes = {
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
        return (
            <Dialog
                open={ this.props.openPanel }
                modal={ true }
                title="Создать вольтамограмму"
                actions={ this.actions }
                autoScrollBodyContent={ true }
            >
                <AddVoltamogrammForm/>
                <AddScanForm ref={ ref => this._scanForm = ref } />
            </Dialog>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddScan);