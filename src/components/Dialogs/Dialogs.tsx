import React from 'react';
import s from "./Dialogs.module.css";
import Message from './Message/Message.tsx';
import DialogItem from './DialogItem/DialogItem.tsx';
import { Field, reduxForm } from 'redux-form';
import { TextArea } from '../common/FormsControls/FormsControls';
import { maxLengthCreator, required } from '../../utils/validators/validators';
import { AppStateType } from '../../redux/redux-store.ts';

type AddNewMessagePropsType = {
    handleSubmit: any
}
// для добавления нового сообщения
const AddNewMessage: React.FC<AddNewMessagePropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={TextArea} name="newMessage" placeholder="Enter your message" validate={[required, maxLengthCreator(50)]} />
            </div>
            <div>
                <button>Add message</button>
            </div>
        </form>
    );
}

const AddNewMessageReduxForm = reduxForm({ form: 'addNewMessageForm' })(AddNewMessage);

type DialogsPropsType ={
    dialogsPage: AppStateType["dialogsPage"]
    addMessage: (newMessage: string) => void
}
const Dialogs: React.FC<DialogsPropsType> = (props) => {
    //оборачиваю данные из массивов в компоненты и далее отрисовываю их
    let dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id} img={d.img} />);
    let messageselements = props.dialogsPage.messages.map(m => <Message message={m.message} key={m.id} id={m.id} />);

    const onSubmit = (formData: any) => {
        props.addMessage(formData.newMessage);
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messageselements}

                <AddNewMessageReduxForm onSubmit={onSubmit} />

            </div>
        </div>
    );
}

export default Dialogs;