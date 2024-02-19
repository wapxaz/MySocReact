import React, { useEffect, useState } from "react";

const wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');

type ChatMessageType =  {
    message: string
    photo: string
    userId: number
    userName: string
  }
const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat />
        </div>
    );
}

const Chat: React.FC = () => {
    return(
        <div>
            <Messages />
            <AddMessageForm />
        </div>
    );
}

const Messages: React.FC = () => {
    debugger;
    const [messages, setMessages] = useState<ChatMessageType[]>([]);
    useEffect(() => {
        wsChannel.addEventListener('message', (e: MessageEvent) => {
            const newMessages = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, ...newMessages]);
        });
    }, []);

    return(
        <div style={{height: 400, overflowY: 'auto'}}>
            {messages.map((m, index) => <Message message={m} key={index} />)}
        </div>
    );
}

const Message: React.FC<{message: ChatMessageType}> = ({message}) => {
    return(
        <div>
            <div>
                <img src={message.photo} style={{width: 30, borderRadius: '50%'}} />
                <b>{message.userName}:</b> {message.message}
            </div>
        </div>
    );
}

const AddMessageForm: React.FC = () => {
    const [message, setMessage] = useState('');

    const sendMessage = () => {
        if(!message) {
            return;
        }
        wsChannel.send(message);
        setMessage('');
    }

    return(
        <div>
            <div>
                <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message} />
            </div>
            <div>
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default ChatPage;