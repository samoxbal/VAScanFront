import { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import { blue500 } from 'material-ui/styles/colors';

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
                        leftAvatar={
                            <Avatar
                                icon={ <ActionAssignment /> }
                                backgroundColor={ blue500 }
                            />
                        }
                        primaryText={ <Link to={ `${path}/${item.id}` } /> }
                    />
                ))}
            </List>
        );
    }
}