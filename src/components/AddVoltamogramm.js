import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { graphql } from 'react-apollo';
import { createScan, openAddVoltamogramm } from '../actions';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import AddVoltamogrammForm from './AddVoltamogrammForm';
import {
    createVoltamogramm as createVoltamogrammMutation
} from '../graphql/mutations';

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
        openAddVoltamogramm: PropTypes.func,
        mutate: PropTypes.func
    }

    handleSubmit = () => {

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
            </Dialog>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(graphql(createVoltamogrammMutation)(AddScan));