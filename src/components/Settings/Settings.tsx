import React from 'react';
import s from "./Settings.module.css";
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

type PropsType = {

}
//страница настроек - в разработке 
const Settings: React.FC<PropsType> = () => {
    return (
        <div>
            Settings
        </div>
    );
}

export default compose(
    withAuthRedirect
  )(Settings);