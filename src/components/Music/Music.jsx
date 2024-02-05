import React from 'react';
import s from "./Music.module.css";
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

const Music = () => {
    return (
        <div>
            Music
        </div>
    );
}

export default compose(
    withAuthRedirect
  )(Music);