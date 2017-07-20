import { Component } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'material-ui/List';

export default class ListLinks extends Component {

    static propTypes = {
        items: PropTypes.array,
        path: PropTypes.string
    }

    render() {
        const { items, path } = this.props;
        return (
            <List>
                {items.map((item, index) => (
                    <ListItem
                        key={ index }
                    />
                ))}
            </List>
        );
    }
}