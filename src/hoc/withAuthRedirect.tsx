import React, {FC} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {AppStoreType} from "../redux/redux-store";

const mapStateToPropsForRedirect = (state: AppStoreType) => {
  return {
    isAuth: state.auth.isAuth
  }
}

type MapPropsType = {
  isAuth: boolean
}

type DispatchPropsType = {

}

export default function withAuthRedirect<WCP extends JSX.IntrinsicAttributes>(WrappedComponent: React.ComponentType<WCP>) {
	const RedirectComponent: FC<MapPropsType & DispatchPropsType> = (props) => {
	  let {isAuth, ...restProps} = props

    if(!isAuth) return <Redirect to='/login' />
    return <WrappedComponent {...restProps as WCP} />
	}

	let ConnectedAuthRedirectComponent = connect<MapPropsType, DispatchPropsType, WCP, AppStoreType>(mapStateToPropsForRedirect, {})(RedirectComponent);

	return ConnectedAuthRedirectComponent;
}
