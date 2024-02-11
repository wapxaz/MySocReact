import React from 'react';
import s from './ProfileInfo.module.css';
import s_form from '../../common/FormsControls/FormsControls.module.css';
import { Field, reduxForm } from 'redux-form';
import { AppStateType } from '../../../redux/redux-store';

type PropsType = {
  handleSubmit: any
  error: any
  profile: AppStateType["profilePage"]["profile"] | null
}
//форма редактирования данных пользователя(только своего авторизованного)
const ProfileDataFormRedux: React.FC<PropsType> = ({ handleSubmit, profile, error }) => {
  return <form onSubmit={handleSubmit}>
    <div className={s.fullName}>
      <b>Full name:</b> <Field name="fullName" component="input" type="text" placeholder="Full name" />
    </div>
    <div><b>Looking for a job:</b>
      <Field name="lookingForAJob" component="input" type="checkbox" />
    </div>

    <div><b>My professionl skils:</b> <Field name="lookingForAJobDescription" component="textarea" type="text" placeholder="My professionl skils" /></div>

    <div>
      <b>About me:</b>
      <Field name="aboutMe" component="textarea" type="text" placeholder="About me" />
    </div>

    <div><b>Contacts:</b></div>

    {//возвращает массив ключей и проходится по каждому через ф-ю map, которая возвращает разметку для каждой строчки контактов пользователя(его соцсетей)
    Object.keys(profile.contacts).map(key => {
      return <div key={key} className={s.contact}><b>{key}:</b> <Field name={'contacts.' + key} component="input" type="text" placeholder={key} /></div>
    })}

    {//если есть ошибки в форме, выводится блок с информацией ошибки
    error && <div className={s_form.formSummaryError}>
      {error}
    </div>}

    <div>
      <button>Save</button>
    </div>
  </form>
}

const ProfileDataForm = reduxForm({
  form: 'profile-redux-form',
  destroyOnUnmount: false
})(ProfileDataFormRedux);

export default ProfileDataForm;