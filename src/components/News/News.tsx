import React from 'react';
import s from "./News.module.css";
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';

type PropsType = {

}
//страница новостей - в разработке 
const News: React.FC<PropsType> = () => {
    return (
        <div>
            News
        </div>
    );
}

export default compose(
    withAuthRedirect
  )(News);