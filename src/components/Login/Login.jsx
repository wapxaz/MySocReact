import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input } from '../common/FormsControls/FormsControls';
import { required } from '../../utils/validators/validators';
import { connect } from 'react-redux';
import {login} from '../../redux/auth-reducer';
import { Navigate } from 'react-router-dom';
import s from '../common/FormsControls/FormsControls.module.css';

const LoginForm = ({handleSubmit, error}) => {
    return (
            <form onSubmit={handleSubmit}>
                <div>
                    <Field component={Input} name="email" placeholder="Email" validate={[required]} />
                </div>
                <div>
                    <Field component={Input} name="password" type="password" placeholder="Password" validate={[required]} />
                </div>
                <div>
                    <Field component={Input} name="rememberMe" type="checkbox" /> remember me
                </div>
                {/* <div>
                    <Field component="input" name="captcha" /> Тут капча
                </div> */}
                {error && <div className={s.formSummaryError}>
                    {error}
                </div>}
                <div>
                    <button>Login</button>
                </div>
            </form>
    );
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);


const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, 
                    formData.password, 
                    formData.rememberMe,
                    formData.capcha);
    }

    if(props.isAuth)
    {
        return <Navigate to={"/profile"} />;
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    );
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})
export default connect(mapStateToProps, {login})(Login);