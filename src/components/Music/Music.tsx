import React from 'react';
import s from "./Music.module.css";
import { withAuthRedirect } from '../../hoc/withAuthRedirect.tsx';
import { compose } from 'redux';

type PropsType = {

}
//страница с музыкой - в разработке 
const Music: React.FC<PropsType> = () => {
    return (
        <div>
            Music
        </div>
    );
}

export default compose(
    withAuthRedirect
  )(Music);