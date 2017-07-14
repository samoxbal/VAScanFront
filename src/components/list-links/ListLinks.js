import {Component} from 'react';
import {List} from 'semantic-ui-react';

import './ListLinks.css';

export default class ListLinks extends Component {
    render() {
        const {items, path} = this.props;
        return (
            <List divided relaxed>
                {items.map(item => (
                    <List.Item key={item._id} className="ListLinks__Item">
                        <List.Icon name="file" />
                        <List.Content>
                            <List.Header>
                                <Link to={`/${path}/${item._id}`}>{item._id}</Link>
                            </List.Header>
                        </List.Content>
                    </List.Item>
                ))}
            </List>
        );
    }
}