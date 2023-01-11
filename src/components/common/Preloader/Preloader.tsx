import React from 'react';
import preloader from '../../../assets/images/Hourglass.gif';
import s from './Preloader.module.css';

type PropsType = {

}

const Preloader: React.FC<PropsType> = (props) => {
	return (
		<div className={s.preloader}>
			<img src={preloader} alt="Preloader"/>
		</div>
	)
}

export default Preloader;
