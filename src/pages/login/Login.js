import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card, CardActions } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ACTION_TYPES from '../../constants/actionTypes';
import createFormAction from '../../utils/createFormAction';
import { login } from '../../actions';

import './Login.css';

const mapStateToProps = state => ({
    errors: state.errors,
    form: state.loginForm
});

const mapDispatchToProps = dispatch => bindActionCreators({
    login,
    changeEmail: createFormAction(ACTION_TYPES.CHANGE_EMAIL),
    changePassword: createFormAction(ACTION_TYPES.CHANGE_PASSWORD)
}, dispatch);

class Login extends Component {

    static propTypes = {
        errors: PropTypes.object,
        form: PropTypes.object,
        changeEmail: PropTypes.func,
        changePassword: PropTypes.func,
        login: PropTypes.func
    };

    onChangeEmail = (e, data) => this.props.changeEmail(data)
    onChangePassword = (e, data) => this.props.changePassword(data)

    render() {
        const { form: { email, password }, errors } = this.props;

        return (
            <div className="Login">
                <Card>
                    <TextField
                        hintText="Email"
                        onChange={ this.onChangeEmail }
                        value={ email }
                        errorText={ !!errors.email ? "Введите емайл" : "" }
                    />
                    <TextField
                        type="password"
                        hintText="Пароль"
                        onChange={ this.onChangePassword }
                        value={ password }
                        errorText={ !!errors.password ? "Введите пароль" : "" }
                    />
                    <CardActions>
                        <RaisedButton
                            primary={ true }
                            onTouchTap={ () => this.props.login() }
                            label="Войти"
                        />
                    </CardActions>
                </Card>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);