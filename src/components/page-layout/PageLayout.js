import { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const Logged = () => (
    <IconMenu
        iconButtonElement={
            <IconButton>
                <MoreVertIcon />
            </IconButton>
        }
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
        <MenuItem primaryText="Выход" />
    </IconMenu>
);

export default class PageLayout extends Component {

    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        this.context.router.history.push("/");
    }

    render() {
        return (
            <div>
                <AppBar
                    title="VAScan"
                    iconElementRight={ <Logged /> }
                />
                { this.props.children }
            </div>
        )
    }
}