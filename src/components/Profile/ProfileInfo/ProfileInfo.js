import React from 'react';
import s from './ProfileInfo.module.css';
import { NavLink } from 'react-router-dom';
import Preloader from '../../common/Preloader/Preloader';
import userPhoto from '../../../assets/images/user.png';
import facebookIcon from '../../../assets/images/social/facebook.png';
import vkIcon from '../../../assets/images/social/vk.png';
import twitterIcon from '../../../assets/images/social/twitter.png';
import instagramIcon from '../../../assets/images/social/instagram.png';
import githubIcon from '../../../assets/images/social/github.png';
import yesJob from '../../../assets/images/social/yes.png';
import noJob from '../../../assets/images/social/no.png';


const ProfileInfo = (props) => {
	if(!props.profile) {
		return <Preloader />
	}

	return(
		<div>
			<div className={s.header}>
				<img className={s.headerImg} src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300" />
				<div className={s.info}>
					<div className={s.socials}>
						<NavLink to={`${props.profile.contacts.facebook}`}>
							<img src={facebookIcon} />
						</NavLink>
						<NavLink to={`${props.profile.contacts.vk}`}>
							<img src={vkIcon} />
						</NavLink>
						<NavLink to={`${props.profile.contacts.twitter}`}>
							<img src={twitterIcon} />
						</NavLink>
						<NavLink to={`${props.profile.contacts.instagram}`}>
							<img src={instagramIcon} />
						</NavLink>
						<NavLink to={`${props.profile.contacts.github}`}>
							<img src={githubIcon} />
						</NavLink>
					</div>
					<div className={s.avatar}>
						<img src={props.profile.photos.small ? null : userPhoto} />
						<h3 className={s.name}>{props.profile.fullName}</h3>
					</div>
					<div>
						<span>Поиск работы:</span>
						<img src={props.profile.lookingForAJob ? yesJob : noJob}/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProfileInfo;