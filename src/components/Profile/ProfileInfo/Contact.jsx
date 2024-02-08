import React from "react";
import s from './ProfileInfo.module.css';

const Contact = ({ contactTitle, contactValue }) => {
  if (!contactValue) {
    return;
  }
  return <div className={s.contact}>
    <b>{contactTitle}:</b> {contactValue}
  </div>
}

export default Contact;