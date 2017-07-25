import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import is from 'is';
import { bindActionCreators } from 'redux';
import { Card } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import EditIcon from 'material-ui/svg-icons/content/create';
import PageLayout from '../../components/PageLayout';
import TreeFolder from '../../components/TreeFolder';
import Scan from '../../components/Scan';
import AddVoltamogrammForm from '../../components/AddVoltamogrammForm';
import AddScan from '../../components/AddScan';
import {
    fetchSingleVoltamogramm,
    selectScan,
    activeEditVoltamogramm,
    openAddScan,
    fetchSingleScan
} from '../../actions/index';

const mapStateToProps = state => ({
    voltamogramm: state.voltamogramm
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchSingleVoltamogramm,
    selectScan,
    activeEditVoltamogramm,
    openAddScan,
    fetchSingleScan
}, dispatch);

class VoltamogrammPage extends Component {

    static propTypes = {
        voltamogramm: PropTypes.object,
        fetchSingleVoltamogramm: PropTypes.func,
        activeEditVoltamogramm: PropTypes.func,
        openAddScan: PropTypes.func,
        fetchSingleScan: PropTypes.func,
        selectScan: PropTypes.func
    }

    style = {
        wrapper: {
            display: 'flex',
            justifyContent: 'space-around',
            marginTop: 40,
            flexWrap: 'wrap'
        },
        tree: {
            width: '30%',
            minHeight: 460
        },
        scan: {
            width: '60%',
            minHeight: 460,
            margin: 0
        },
        form: {
            width: '80%',
            paddingBottom: 10
        }
    }

    componentWillMount() {
        const {
            match: { params: { id } },
            fetchSingleVoltamogramm,
        } = this.props;
        fetchSingleVoltamogramm(id);
    }

    onSelectScan = scanId => {
        const { selectScan, fetchSingleScan } = this.props;
        selectScan(scanId);
        fetchSingleScan(scanId);
    }

    renderTree(voltamogramm) {
        const { scans } = voltamogramm;
        return (
            <TreeFolder
                data={ scans }
                onClickItem={ id => this.onSelectScan(id) }
            />
        )
    }

    renderVoltamogrammForm() {
        const { activeEditVoltamogramm, openAddScan } = this.props;
        return (
            <div style={ this.style.form }>
                <RaisedButton
                    icon={ <AddIcon/> }
                    label='Создать скан'
                    style={{ marginRight: 15, marginBottom: 15 }}
                    onTouchTap={ () => openAddScan(true) }
                    secondary={ true }
                />
                <RaisedButton
                    icon={ <EditIcon/> }
                    onTouchTap={ () => activeEditVoltamogramm(true) }
                    label='Редактировать вольтамограмму'
                    secondary={ true }
                />
                <Card style={{ padding: 40 }}>
                    <AddVoltamogrammForm/>
                </Card>
            </div>
        )
    }

    render() {
        const {
            match: { params: { id } },
            voltamogramm
        } = this.props;

        return (
            <PageLayout>
                <div style={ this.style.wrapper }>
                    { this.renderVoltamogrammForm() }
                    <Card style={ this.style.tree }>
                        { !is.empty(voltamogramm) && this.renderTree(voltamogramm) }
                    </Card>
                    <Card style={ this.style.scan }>
                        <Scan/>
                    </Card>
                </div>
                <AddScan voltamogramm={ id } />
            </PageLayout>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VoltamogrammPage);