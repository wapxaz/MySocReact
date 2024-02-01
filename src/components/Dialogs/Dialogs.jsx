import React from 'react';
import s from "./Dialogs.module.css";
import Message from './Message/Message';
import DialogItem from './DialogItem/DialogItem';
import {addMessageActionCreator, updateNewMessageActionCreator} from './../../redux/dialog-reducer';



const Dialogs = (props) => {
    let dialogsElements = props.state.dialogs.map(d => <DialogItem name={d.name} id={d.id} img={d.img} />);
    let messageselements = props.state.messages.map(m => <Message message={m.message} id={m.id} />);

    let newDialogElement = React.createRef();

    let addMessage = () => {
        //props.addMessage();
        props.dispatch(addMessageActionCreator());
    };

    let onMessageChange = (e) => {
        let text = e.target.value; //newDialogElement.current.value;
        //props.updateNewMessage(text);
        props.dispatch(updateNewMessageActionCreator(text));
    };

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messageselements}

                <div>
                    <div>
                        <textarea onChange={onMessageChange} ref={newDialogElement} value={props.state.newMessage} placeholder='Enter your message'/>
                    </div>
                    <div>
                        <button onClick={addMessage}>Add message</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dialogs;