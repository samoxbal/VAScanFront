import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import is from 'is';
import { bindActionCreators } from 'redux';
import { withApollo } from 'react-apollo';
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
    selectScan,
    activeEditVoltamogramm
} from '../../actions/index';
import { voltamogramm as voltamogrammQuery } from '../../graphql/queries';

const mapStateToProps = state => ({
    voltamogramm: state.voltamogramm
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchSingleVoltamogramm,
    selectScan,
    activeEditVoltamogramm
}, dispatch);

class VoltamogrammPage extends Component {

    static propTypes = {
        voltamogramm: PropTypes.object,
        fetchSingleVoltamogramm: PropTypes.func,
        activeEditVoltamogramm: PropTypes.func
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
            client
        } = this.props;
        client.query({
            query: voltamogrammQuery,
            variables: {
                voltamogrammId: id
            }
        }).then(data => fetchSingleVoltamogramm(data.data.voltamogramm));
    }

    renderTree(voltamogramm) {
        const { scans } = voltamogramm;
        return (
            <TreeFolder
                data={ scans }
                onClickItem={ id => this.props.selectScan(id) }
            />
        )
    }

    renderVoltamogrammForm() {
        const { activeEditVoltamogramm } = this.props;
        return (
            <div style={ this.style.form }>
                <RaisedButton
                    icon={ <AddIcon/> }
                    label='Создать скан'
                    style={{ marginRight: 15, marginBottom: 15 }}
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
        const { voltamogramm } = this.props;

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
            </PageLayout>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withApollo(VoltamogrammPage));