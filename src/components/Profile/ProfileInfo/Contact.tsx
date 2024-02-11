import React from "react";
import s from './ProfileInfo.module.css';

type PropsType = {
  contactTitle: string
  contactValue: string
}
//разметка для строки из списка контактов(сслыки на соцети пользователя) на странице профиля
const Contact: React.FC<PropsType> = ({ contactTitle, contactValue }) => {
  if (!contactValue) {
    return;
  }
  return <div className={s.contact}>
    <b>{contactTitle}:</b> {contactValue}
  </div>
}

export default Contact;