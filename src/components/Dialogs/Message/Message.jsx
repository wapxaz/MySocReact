import React from 'react';
import s from "./Message.module.css";

const Message = (props) => {
    let type_slyle = ((props.id % 2) != 0) ? s.left : s.right;
    return (
        <div className={s.message + ' ' + type_slyle}>{props.message}</div>
    );
}

export default Message;