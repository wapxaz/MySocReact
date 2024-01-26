import React from 'react';
import s from "./Dialogs.module.css";
import Message from './Message/Message';
import DialogItem from './DialogItem/DialogItem';

const Dialogs = (props) => {
    let dialogsElements = props.state.dialogs.map(d => <DialogItem name={d.name} id={d.id} img={d.img} />);
    let messageselements = props.state.messages.map(m => <Message message={m.message} id={m.id} />);

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messageselements}
            </div>
        </div>
    );
}

export default Dialogs;