import { Component } from 'react';
import PageLayout from '../../components/PageLayout';
import AddExperimentForm from '../../components/AddExperimentForm';
import { Card } from 'material-ui/Card';

export default class AddExperiment extends Component {

    style = {
        wrapper: {
            display: 'flex',
            justifyContent: 'space-around',
            marginTop: 40,
            flexWrap: 'wrap'
        },
        card: {
            width: '70%'
        }
    }

    render() {
        return (
            <PageLayout>
                <div style={ this.style.wrapper }>
                    <Card style={ this.style.card }>
                        <AddExperimentForm/>
                    </Card>
                </div>
            </PageLayout>
        )
    }
}