import React, {FC} from 'react';
import { connect } from 'react-redux';
import {InjectedFormProps, reduxForm} from 'redux-form';
import { required } from '../../utils/validators';
import {createField, Input} from '../common/FormControls/FormControls';
import { login } from '../../redux/authReducer';
import { Redirect } from 'react-router-dom';
import styles from './../common/FormControls/FormControl.module.css';
import {AppStoreType} from "../../redux/redux-store";

type MapStatePropsType = {
  captchaUrl: string | null
  isAuth: boolean
}

type MapDispatchPropsType = {
  login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

type LoginFormValuesType = {
  captcha: string
  rememberMe: boolean
  password: string
  email: string
}

type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>

const Login: FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
	const onSubmit = (formData: LoginFormValuesType) => {
		props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
	}

	if(props.isAuth) {
		return <Redirect to="/profile" />
	}

	return(
		<div>
			<h1>Login</h1>
			<LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
		</div>
	)
}

type LoginFormOwnProps = {
  captchaUrl: string | null
}

const LoginForm: FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, captchaUrl, error}) => {
	return(
		<form onSubmit={handleSubmit}>
      {createField<LoginFormValuesTypeKeys>("Email", "email", [required], Input)}
      {createField<LoginFormValuesTypeKeys>("Password", "password", [required], Input, {type: "password"})}
      {createField<LoginFormValuesTypeKeys>(null, "rememberMe", [], Input, {type: "checkbox"}, "remember me")}
			{ captchaUrl && <img src={captchaUrl} /> }
			{
				captchaUrl && createField<LoginFormValuesTypeKeys>("Symbols from image", "captcha", [required], Input, {})
			}
			{
				error && <div className={styles.formError}>{error}</div>
			}
			<div>
				<button type="submit">Login</button>
			</div>
		</form>
	)
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
  form: 'login'
})(LoginForm)

const mapStateToProps = (state: AppStoreType): MapStatePropsType => ({
	isAuth: state.auth.isAuth,
	captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, {login})(Login);
