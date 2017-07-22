import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { graphql } from 'react-apollo';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import AddScanForm from './AddScanForm';
import { openAddScan, createScan } from '../actions';
import {
    createScan as createScanMutation
} from '../graphql/mutations';

const mapStateToProps = state => ({
    openScanModal: state.openAddScan,
    form: state.addScanForm
});

const mapDispatchToProps = dispatch => bindActionCreators({
    openAddScan,
    createScan
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
        form: PropTypes.object,
        mutate: PropTypes.func,
        createScan: PropTypes.func,
        voltamogramm: PropTypes.string
    }

    handleSubmit = () => {
        const {
            mutate,
            form: {
                scan_datetime,
                start_potential,
                end_potential,
                reverse_direction,
                stirring,
                stirring_speed,
                rotation,
                rotation_speed,
                channel_id,
                channel_label,
                temperature,
                pressure,
                regime
            },
            voltamogramm,
            createScan
        } = this.props;

        const file = new FormData();
        file.append('file', this._scanForm.getWrappedInstance().getFile());

        mutate({
            variables: {
                voltamogramm,
                date: scan_datetime,
                startPotential: start_potential,
                endPotential: end_potential,
                reverseDirection: reverse_direction,
                stirring,
                rotation,
                channelId: channel_id,
                channelLabel: channel_label,
                temperature,
                pressure,
                measureMode: regime
            }
        }).then(data => {
            file.append('scan', data.data.createScan.id);
            createScan(file);
        });
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
                <AddScanForm ref={ ref => this._scanForm = ref } />
            </Dialog>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(graphql(createScanMutation)(AddScan));