import React from 'react';
import s from './Preloader.module.css';
import preloader from '../../../assets/images/preloader.gif';

type PropsType = {

}
const Preloader: React.FC<PropsType> = (props) => {
    return (
        <div>
            <img src={preloader} />
        </div>
    );
}

export default Preloader;