import { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import AddIcon from 'material-ui/svg-icons/content/add';
import AllIcon from 'material-ui/svg-icons/action/assessment';
import ExitIcon from 'material-ui/svg-icons/action/exit-to-app';

const Logged = ({ logout }) => (
    <IconMenu
        iconButtonElement={
            <IconButton>
                <MoreVertIcon />
            </IconButton>
        }
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
        <MenuItem
            leftIcon={ <ExitIcon/> }
            primaryText="Выход"
            onTouchTap={ logout }
        />
    </IconMenu>
);

export default class PageLayout extends Component {

    constructor() {
        super();
        this.state = {
            open: false
        }
    }

    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        this.context.router.history.push("/");
    }

    navigate = url => this.context.router.history.push(url)

    toggleDrawer = () => this.setState({ open: true })

    render() {
        return (
            <div>
                <AppBar
                    title="VAScan"
                    iconElementRight={ <Logged logout={ this.logout } /> }
                    onLeftIconButtonTouchTap={ this.toggleDrawer }
                />
                <Drawer
                    docked={ false }
                    width={ 290 }
                    open={ this.state.open }
                    onRequestChange={ open => this.setState({ open }) }
                >
                    <MenuItem
                        leftIcon={ <AllIcon/> }
                        onTouchTap={ () => this.navigate("/all") }
                    >
                        Все эксперименты
                    </MenuItem>
                    <MenuItem
                        leftIcon={ <AddIcon/> }
                        onTouchTap={ () => this.navigate("/add") }
                    >
                        Создать эксперимент
                    </MenuItem>
                </Drawer>
                { this.props.children }
            </div>
        )
    }
}