import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { Card, CardActions } from 'material-ui/Card';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import { login } from '../../actions';

import './Login.css';

const mapStateToProps = state => ({
    errors: state.errors
});

const mapDispatchToProps = dispatch => bindActionCreators({
    login
}, dispatch);

class Login extends Component {

    static propTypes = {
        errors: PropTypes.object,
        form: PropTypes.object,
        login: PropTypes.func
    };

    render() {
        return (
            <div className="Login">
                <Card>
                    <Field
                        name="email"
                        floatingLabelText="Email"
                        component={ TextField }
                    />
                    <Field
                        name="password"
                        type="password"
                        component={ TextField }
                        floatingLabelText="Пароль"
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