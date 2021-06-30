import React from 'react';
import preloader from '../../../assets/images/Hourglass.gif';
import s from './Preloader.module.css';

const Preloader = (props) => {
	return (
		<div className={s.preloader}>
			<img src={preloader} alt="Preloader"/>
		</div>
	)
}

export default Preloader;