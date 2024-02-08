import React from 'react';
import s from "./Settings.module.css";
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

//страница настроек - в разработке 
const Settings = () => {
    return (
        <div>
            Settings
        </div>
    );
}

export default compose(
    withAuthRedirect
  )(Settings);