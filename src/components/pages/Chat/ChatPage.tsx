import React, { useEffect, useRef, useState } from "react";
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
    const statusWS = useSelector((state: AppStateType) => state.chat.status);
    const dispatch: AppDispatch = useDispatch();
    useEffect(() => {
        dispatch(startMessagesListening());
        return () => {
            dispatch(stopMessagesListening());
        }
    }, []);


    return (
        <div>
            {statusWS === "error" && <div>Some error occured. Please refresh the page.</div>}
            <Messages />
            <AddMessageForm />
        </div>
    );
}

const Messages: React.FC = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages);
    const messagesAnchorRef = useRef<HTMLDivElement>(null);
    const [isAutoScroll, setIsAutoScroll] = useState(false);

    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const scrollHandler = (e: React.UIEvent<HTMLDivElement>) => {
        var element = e.currentTarget;
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            setIsAutoScroll(true);
        } else {
            setIsAutoScroll(false);
        }
    }

    return (
        <div style={{ height: 400, overflowY: 'auto' }} onScroll={scrollHandler}>
            {messages.map((m, index) => <Message message={m} key={m.id} />)}
            <div ref={messagesAnchorRef}></div>
        </div>
    );
}

const Message: React.FC<{ message: ChatMessageType }> = React.memo(({ message }) => {
    return (
        <div>
            <img src={message.photo} style={{ width: 30, borderRadius: '50%' }} />
            <b>{message.userName}:</b> {message.message}
            <hr />
        </div>
    );
})

const AddMessageForm: React.FC = () => {
    const [message, setMessage] = useState('');
    const statusWS = useSelector((state: AppStateType) => state.chat.status);
    const dispatch: AppDispatch = useDispatch();

    const sendMessageHandler = () => {
        if (!message) {
            return;
        }
        dispatch(sendMessage(message));
        setMessage('');
    }

    return (
        <div>
            <div>
                <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message} />
            </div>
            <div>
                <button onClick={sendMessageHandler} disabled={statusWS !== 'ready'}>Send</button>
            </div>
        </div>
    );
}

export default ChatPage;