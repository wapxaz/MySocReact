import React from 'react';
import {addMessageActionCreator, updateNewMessageActionCreator} from '../../redux/dialog-reducer';
import Dialogs from './Dialogs';



const DialogsContainer = (props) => {
    let state = props.store.getState().dialogsPage;

    let addMessage = () => {
        props.store.dispatch(addMessageActionCreator());
    };

    let onMessageChange = (text) => {
        props.store.dispatch(updateNewMessageActionCreator(text));
    };

    return <Dialogs addMessage={addMessage} updateNewMessage={onMessageChange} state={state} />;
}

export default DialogsContainer;