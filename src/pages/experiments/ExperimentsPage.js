import { Component } from 'react';
import PageLayout from '../../components/page-layout/PageLayout';
import ExperimentTree from '../../components/ExperimentTree';
import Experiment from '../../components/Experiment';
import VACard from '../../components/vascan-ui/card/VACard';

import './ExperimentsPage.css';

export default class ExperimentsPage extends Component {
    render() {
        return (
            <PageLayout>
                <div className="ExperimentsPage">
                    <VACard className="ExperimentsPage__Tree">
                        <ExperimentTree/>
                    </VACard>
                    <VACard className="ExperimentsPage__Item">
                        <Experiment/>
                    </VACard>
                </div>
            </PageLayout>
        )
    }
}