import React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Input } from '../common/FormsControls/FormsControls.tsx';
import { required } from '../../utils/validators/validators.ts';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/auth-reducer.ts';
import { Navigate } from 'react-router-dom';
import s from '../common/FormsControls/FormsControls.module.css';
import { AppDispatch, AppStateType } from '../../redux/redux-store.ts';

type LoginFormPropsType = {
    captchaUrl: string | null
}
//форма авторизации на сайте 
const LoginForm: React.FC<InjectedFormProps<FormDataType, LoginFormPropsType> & LoginFormPropsType> = ({ handleSubmit, error, captchaUrl }) => {
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
            {captchaUrl && <div>
                <div><img src={captchaUrl} /></div>
                <div>
                    <Field component="input" name="captcha" placeholder='Captcha' />
                </div>
            </div>}
            {error && <div className={s.formSummaryError}>
                {error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    );
}

const LoginReduxForm = reduxForm<FormDataType, LoginFormPropsType>({ form: 'login' })(LoginForm);

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

type PropsType = {}
export const LoginPage: React.FC<PropsType> = (props) => {

    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl);
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);

    const dispatch:AppDispatch = useDispatch(); 

    const onSubmit = (formData: FormDataType) => {
        dispatch(login(formData.email,
            formData.password,
            formData.rememberMe,
            formData.captcha));
    }

    if (isAuth) {
        return <Navigate to={"/profile"} />;
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
        </div>
    );
}