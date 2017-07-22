import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { graphql } from 'react-apollo';
import { createVoltamogramm, openAddVoltamogramm } from '../actions';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import AddVoltamogrammForm from './AddVoltamogrammForm';
import {
    createVoltamogramm as createVoltamogrammMutation
} from '../graphql/mutations';

const mapStateToProps = state => ({
    openPanel: state.openAddVoltamogramm,
    experiment_id: state.selectedExperimentId,
    form: state.addVoltamogrammForm,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    createVoltamogramm,
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
        createVoltamogramm: PropTypes.func,
        experiment_id: PropTypes.string,
        openAddVoltamogramm: PropTypes.func,
        mutate: PropTypes.func,
        form: PropTypes.object
    }

    handleSubmit = () => {
        const {
            mutate,
            form: {
                cyclic,
                va_cycle_datetime,
                description,
                solution,
                number_of_electrodes,
                equipment_id
            },
            experiment_id,
            createVoltamogramm
        } = this.props;

        mutate({
            variables: {
                experiment: experiment_id,
                cyclic,
                date: va_cycle_datetime,
                description,
                solution,
                numberOfElectrodes: number_of_electrodes,
                equipmentId: equipment_id
            }
        }).then(data => createVoltamogramm(data.data.createVoltamogramm.id));
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