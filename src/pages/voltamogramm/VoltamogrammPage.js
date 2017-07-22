import { Component } from 'react';
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
import {
    fetchSingleVoltamogramm,
    fetchMeasures,
    selectScan,
    activeEditVoltamogramm
} from '../../actions/index';

import './VoltamogrammPage.css';

const mapStateToProps = state => ({
    voltamogramm: state.voltamogramm,
    measures: state.measures
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchSingleVoltamogramm,
    fetchMeasures,
    selectScan,
    activeEditVoltamogramm
}, dispatch);

class VoltamogrammPage extends Component {
    componentWillMount() {
        const {match: { params: { id } }, fetchSingleVoltamogramm} = this.props;
        fetchSingleVoltamogramm(id);
    }

    renderTree(voltamogramm) {
        const { scans } = voltamogramm;
        return (
            <TreeFolder
                data={scans}
                onClickItem={_id => {
                    this.props.selectScan(_id);
                    this.props.fetchMeasures(_id);
                }}
            />
        )
    }

    renderVoltamogrammForm() {
        const {activeEditVoltamogramm} = this.props;
        return (
            <div className="VoltamogrammPage__voltamogrammForm">
                <RaisedButton
                    icon={ <AddIcon/> }
                    // onClick={this.openAddVoltamogramm}
                    label='Создать скан'
                    style={{ margin: 15 }}
                />
                <RaisedButton
                    icon={ <EditIcon/> }
                    onClick={ () => activeEditVoltamogramm(true) }
                    label='Редактировать вольтамограмму'
                />
                <AddVoltamogrammForm/>
            </div>
        )
    }

    render() {
        const {voltamogramm} = this.props;

        return (
            <PageLayout>
                <div className="VoltamogrammPage">
                    {this.renderVoltamogrammForm()}
                    <Card className="VoltamogrammPage__Tree">
                        {!is.empty(voltamogramm) && this.renderTree(voltamogramm)}
                    </Card>
                    <Card className="x_panel VoltamogrammPage__Scan">
                        <Scan/>
                    </Card>
                </div>
            </PageLayout>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VoltamogrammPage);