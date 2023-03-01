import React, {FC, ReactNode} from 'react';
import styles from './FormControl.module.css';
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";
import {FieldValidatorType} from "../../../utils/validators";

type FormControlPropsType = {
  meta: WrappedFieldMetaProps
  children: ReactNode
}

const FormControl: FC<FormControlPropsType> = ({meta: {touched, error}, children}) => {
  const hasError = touched && error;
  return(
    <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
      {children}
      {hasError && <span>{error}</span>}
    </div>
  )
}

export const Textarea: FC<WrappedFieldProps> = (props) => {
	const {input, meta, ...restProps} = props

  return <FormControl {...props}>
    <textarea {...input} {...restProps} />
  </FormControl>
}

export const Input: FC<WrappedFieldProps> = (props) => {
  const {input, meta, ...restProps} = props

  return <FormControl {...props}>
    <input {...input} {...restProps} />
  </FormControl>
}

export function createField<FormKeysType extends string>(
  placeholder: string | null,
  name: FormKeysType,
  validators: Array<FieldValidatorType>,
  component: FC<WrappedFieldProps>,
  props = {},
  text = ""
) {
  return(
    <div>
      <Field
        placeholder={placeholder}
        name={name}
        validate={validators}
        component={component}
        {...props}
      /> {text}
    </div>
  )
}

