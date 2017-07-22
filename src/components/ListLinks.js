import { Component } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'material-ui/List';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';

export default class ListLinks extends Component {

    static propTypes = {
        items: PropTypes.array,
        path: PropTypes.string
    }

    static contextTypes = {
        router: PropTypes.object
    }

    render() {
        const { items, path } = this.props;
        return (
            <List>
                {items.map((item, index) => (
                    <ListItem
                        key={ index }
                        leftIcon={ <ActionAssignment /> }
                        primaryText={ item.id }
                        onTouchTap={ () => this.context.router.history.push(`/${path}/${item.id}`) }
                    />
                ))}
            </List>
        );
    }
}