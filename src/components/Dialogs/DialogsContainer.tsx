import React from "react";
import Dialogs from './Dialogs';
import {connect} from 'react-redux';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { getDialogsPageState } from '../../redux/selectors/dialogs-selectors';
import {AppStoreType} from "../../redux/redux-store";
import {actions} from "../../redux/dialogsReducer";

const mapStateToProps = (state: AppStoreType) => {
	return {
    state: getDialogsPageState(state)
	}
}

export default compose<React.ComponentType>(
	connect(mapStateToProps, {
    ...actions
  }),
	withAuthRedirect
)(Dialogs);
