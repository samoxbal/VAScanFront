import { Component } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';

export default class TreeFolder extends Component {

    static propTypes = {
        data: PropTypes.array,
        onClickItem: PropTypes.func
    }

    render() {
        const { data, onClickItem } = this.props;
        return (
            <List>
                {data.map((item, index) =>
                    <ListItem
                        key={ index }
                        leftAvatar={
                            <Avatar icon={ <FileFolder /> } />
                        }
                        onTouchTap={() => onClickItem(item.id)}
                        primaryText={ item.name || item.id }
                    />)}
            </List>
        )
    }
}