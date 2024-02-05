import React from 'react';
import { addMessageActionCreator, updateNewMessageActionCreator } from '../../redux/dialog-reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { Navigate } from "react-router-dom";
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage
    };
}
let mapDispatchToProps = (dispatch) => {
    return {
        addMessage: () => {
            dispatch(addMessageActionCreator());
        },
        updateNewMessage: (text) => {
            dispatch(updateNewMessageActionCreator(text));
        }
    };
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, mapDispatchToProps)
)(Dialogs);