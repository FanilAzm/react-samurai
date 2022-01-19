import React from 'react';
import styles from './FormControl.module.css';

export const Textarea = ({input, meta, ...props} = props) => {
	const hasError = meta.touched && meta.error;

	return(
		<div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
			<textarea {...input} {...props} />
			<span>{hasError}</span>
		</div>		
	)
}

export const Input = ({input, meta, ...props}) => {
	const hasError = meta.touched && meta.error;

	return(
		<div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
			<input {...input} {...props} />
			<span>{hasError}</span>
		</div>	
	)
}

