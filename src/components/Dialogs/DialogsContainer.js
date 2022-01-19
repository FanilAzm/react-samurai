import React from 'react';
import Dialogs from './Dialogs';
import {connect} from 'react-redux';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { getDialogsPageState } from '../../redux/selectors/dialogs-selectors';

// const mapStateToProps = (state) => {
// 	return {
// 		state: state.dialogsPage
// 	}
// }

const mapStateToProps = (state) => {
	return {
		state: getDialogsPageState(state)
	}
}

const mapDispatchToProps = () => {
	return {}
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	withAuthRedirect
)(Dialogs);

// const AuthRedirectComponent = withAuthRedirect(Dialogs);
// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);
// export default DialogsContainer;