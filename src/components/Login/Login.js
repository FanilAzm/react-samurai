import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { required } from '../../utils/validators';
import { Input } from '../common/FormControls/FormControls';
import { login } from '../../redux/authReducer';
import { Redirect } from 'react-router-dom';
import styles from './../common/FormControls/FormControl.module.css';

const Login = (props) => {
	const onSubmit = (formData) => {
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

const LoginForm = (props) => {
	return(
		<form onSubmit={props.handleSubmit}>
			<div>
				<Field type="text" name="email"
					component={Input} placeholder="Email"
					validate={[required]}	
				/>
			</div>
			<div>
				<Field type="text" name="password"
					component={Input} placeholder="Password"
					validate={[required]}	
				/>
			</div>
			<div>
				<Field type="checkbox" name="rememberMe" component="input"/> remember me
			</div>
			{ props.captchaUrl && <img src={props.captchaUrl} /> }
			{
				props.captchaUrl && 
				<Field type="text" name="captcha"
					component={Input} placeholder="Symbols from image"
					validate={[required]}	
				/>
			}
			{
				props.error && <div className={styles.formError}>{props.error}</div>
			}
			<div>
				<button type="submit">Login</button>
			</div>
		</form>
	)
}

const LoginReduxForm = reduxForm({
  form: 'login'
})(LoginForm)

const mapStateToProps = (state) => ({
	isAuth: state.auth.isAuth,
	captchaUrl: state.auth.captchaUrl
})
 
export default connect(mapStateToProps, {login})(Login);