import React, { useState } from 'react';
import s from './ProfileInfo.module.css';
import { NavLink } from 'react-router-dom';
import Preloader from '../../common/Preloader/Preloader';
import userPhoto from '../../../assets/images/user.png';
import facebookIcon from '../../../assets/images/social/facebook.png';
import webIcon from '../../../assets/images/social/web.png';
import vkIcon from '../../../assets/images/social/vk.png';
import twitterIcon from '../../../assets/images/social/twitter.png';
import instagramIcon from '../../../assets/images/social/instagram.png';
import githubIcon from '../../../assets/images/social/github.png';
import yesJob from '../../../assets/images/social/yes.png';
import noJob from '../../../assets/images/social/no.png';
import iconEdit from '../../../assets/images/icon-edit.png';
import ProfileStatusWithHooks from './ProfileStatus/ProfileStatus';
import ProfileDataReduxForm from './ProfileDataForm';


const ProfileInfo = (props) => {
	const [editMode, setEditMode] = useState(false);

	if(!props.profile) {
		return <Preloader />
	}

	const onMainPhotosSelected = (e) => {
		if(e.target.files.length) {
			props.savePhoto(e.target.files[0]);
		}
	}

	const onSubmit = (formData) => {
		props.saveProfile(formData).then(() => {
			setEditMode(false);
		});
	}

	return(
		<div>
			<div className={s.header}>
				<img className={s.headerImg} src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300" />
				{
					editMode 
					? <ProfileDataReduxForm onSubmit={onSubmit} initialValues={props.profile} profile={props.profile} />
					: <ProfileData
							isOwner={props.isOwner}
							profile={props.profile}
							onMainPhotosSelected={onMainPhotosSelected}
							goToEditMode={() => { setEditMode(true) }}
							updateStatus={props.updateStatus}
							status={props.status}/>
				}
			</div>
		</div>
	)
}

const ProfileData = (props) => {
	return(
		<div className={s.info}>
			{ props.isOwner && <button onClick={props.goToEditMode} className={s.editBtn}><img src={iconEdit} /></button> }
			<div className={s.socials}>
				<a href={`${props.profile.contacts.facebook}`} target="_blank">
					<img src={facebookIcon} />
				</a>
				<a href={`${props.profile.contacts.website}`} target="_blank">
					<img src={webIcon} />
				</a>
				<a href={`${props.profile.contacts.vk}`} target="_blank">
					<img src={vkIcon} />
				</a>
				<a href={`${props.profile.contacts.twitter}`} target="_blank">
					<img src={twitterIcon} />
				</a>
				<a href={`${props.profile.contacts.instagram}`} target="_blank">
					<img src={instagramIcon} />
				</a>
				<a href={`${props.profile.contacts.github}`} target="_blank">
					<img src={githubIcon} />
				</a>
			</div>
			<div className={s.userInfo}>
				<div className={s.avatar}>
					<img className={s.profileImg} src={props.profile.photos.large || userPhoto} />
					{
						props.isOwner && 
						<label className={s.fileUpload}>
							<input type={"file"} onChange={props.onMainPhotosSelected} />
							<div className={s.fileUploadCustom}>
								<img src={iconEdit} />
							</div>
						</label>
					}
				</div>
				<h3 className={s.name}>{props.profile.fullName}</h3>
				<ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
			</div>
			<div className={s.jobStatus}>
				<span>Поиск работы:</span>
				<img src={props.profile.lookingForAJob ? yesJob : noJob}/>
			</div>
		</div>
	)
}

export default ProfileInfo;