import React from 'react';
import s from './Preloader.module.css';
import preloader from '../../../assets/images/preloader.gif';

const Preloader = (props) => {
    return (
        <div>
            {props.isFetching ? <img src={preloader} /> : null}
        </div>
    );
}

export default Preloader;