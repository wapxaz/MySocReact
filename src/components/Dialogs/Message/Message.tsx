import React from 'react';
import s from "./Message.module.css";

type PropsType = {
    id: number
    message: string
}
const Message: React.FC<PropsType> = (props) => {
    //раскидываю сообщения по разным краям окна, когда будут реальные данные, раскидывать по ид отправителя
    let type_slyle = ((props.id % 2) != 0) ? s.left : s.right;
    return (
        <div className={s.message + ' ' + type_slyle}>{props.message}</div>
    );
}

export default Message;