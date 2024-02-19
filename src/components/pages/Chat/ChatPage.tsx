import React, { useEffect, useState } from "react";
import { ChatMessageType } from "../../../api/chat-api";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage, startMessagesListening, stopMessagesListening } from "../../../redux/chat-reducer.ts";
import { AppDispatch, AppStateType } from "../../../redux/redux-store";

const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat />
        </div>
    );
}

const Chat: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    useEffect(() => {
        dispatch(startMessagesListening());
        return () => {
            dispatch(stopMessagesListening());
        }
    }, []);


    return (
        <div>
            <Messages />
            <AddMessageForm />
        </div>
    );
}

const Messages: React.FC = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages);

    return (
        <div style={{ height: 400, overflowY: 'auto' }}>
            {messages.map((m, index) => <Message message={m} key={index} />)}
        </div>
    );
}

const Message: React.FC<{ message: ChatMessageType }> = ({ message }) => {
    return (
        <div>
            <div>
                <img src={message.photo} style={{ width: 30, borderRadius: '50%' }} />
                <b>{message.userName}:</b> {message.message}
            </div>
        </div>
    );
}

const AddMessageForm: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();

    const [message, setMessage] = useState('');
    const [readyStatusWS, setReadyStatusWS] = useState<'pending' | 'ready'>('pending');

    const sendMessageHandler = () => {
        dispatch(sendMessage(message));
    }

    return (
        <div>
            <div>
                <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message} />
            </div>
            <div>
                <button onClick={sendMessageHandler} disabled={false}>Send</button>
            </div>
        </div>
    );
}

export default ChatPage;