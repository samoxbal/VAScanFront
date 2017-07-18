import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form } from 'semantic-ui-react';
import { VAInput, VAButton } from '../../components/vascan-ui/form/VAForm';
import VACard from '../../components/vascan-ui/card/VACard';
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

    onChangeEmail = (e, data) => this.props.changeEmail(data.value)
    onChangePassword = (e, data) => this.props.changePassword(data.value)

    render() {
        const { email, password, errors } = this.props.form;

        return (
            <div className="Login">
                <VACard>
                    <Form onSubmit={ () => this.props.login() }>
                        <VAInput
                            placeholder="Имя пользователя"
                            onChange={ this.onChangeEmail }
                            value={ email }
                            error={ !!errors.email }
                        />
                        <VAInput
                            type="password"
                            placeholder="Пароль"
                            onChange={ this.onChangePassword }
                            value={ password }
                            error={ !!errors.password }
                        />
                        <VAButton type="submit" basic>
                            Войти
                        </VAButton>
                    </Form>
                </VACard>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);