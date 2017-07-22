import { Component } from 'react';
import PageLayout from '../../components/PageLayout';
import ExperimentTree from '../../components/ExperimentTree';
import Experiment from '../../components/Experiment';
import { Card } from 'material-ui/Card';

import './ExperimentsPage.css';

export default class ExperimentsPage extends Component {
    render() {
        return (
            <PageLayout>
                <div className="ExperimentsPage">
                    <Card className="ExperimentsPage__Tree">
                        <ExperimentTree/>
                    </Card>
                    <Card className="ExperimentsPage__Item">
                        <Experiment/>
                    </Card>
                </div>
            </PageLayout>
        )
    }
}