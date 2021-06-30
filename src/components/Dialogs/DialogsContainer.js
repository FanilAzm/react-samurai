import React from 'react';
import Dialogs from './Dialogs';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
	return {
		state: state.dialogsPage
	}
}

const mapDispatchToProps = () => {
	return {}
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;