import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { Card, CardActions } from 'material-ui/Card';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import { login } from '../../actions';
import { LoginFormName } from '../../constants/formNames';

const mapDispatchToProps = dispatch => bindActionCreators({
    login
}, dispatch);

@connect(null, mapDispatchToProps)
@reduxForm({
    form: LoginFormName
})
export default class Login extends Component {

    static propTypes = {
        login: PropTypes.func
    };

    style = {
        wrapper: {
            width: 300,
            margin: '30px auto',
            textAlign: 'center'
        }
    }

    render() {
        return (
            <div style={ this.style.wrapper }>
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