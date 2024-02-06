import React from "react";
import { Field, reduxForm } from "redux-form";
import {authAPI} from '../../api/api';
import { Input } from "../common/FormsControls/FormsControls";
import { required } from "../../utils/validators/validators";

const LoginForm = (props) => {
    return (
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field component={Input} name="email" placeholder="Email" validate={[required]} />
                </div>
                <div>
                    <Field component={Input} name="password" placeholder="Password" validate={[required]} />
                </div>
                <div>
                    <Field component={Input} name="rememberMe" type="checkbox" /> remember me
                </div>
                {/* <div>
                    <Field component="input" name="captcha" /> Тут капча
                </div> */}
                <div>
                    <button>Login</button>
                </div>
            </form>
    );
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);


const Login = (props) => {
    const onSubmit = (formData) => {
        console.log(formData);
        authAPI.login(formData.email, 
                    formData.password, 
                    formData.rememberMe || false,
                    formData.capcha || "");
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    );
}

export default Login;