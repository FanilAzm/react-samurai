import React, {ChangeEvent, ChangeEventHandler, FC, useState} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import userPhoto from '../../../assets/images/user.png';
import facebook from '../../../assets/images/social/facebook.png';
import website from '../../../assets/images/social/web.png';
import vk from '../../../assets/images/social/vk.png';
import twitter from '../../../assets/images/social/twitter.png';
import instagram from '../../../assets/images/social/instagram.png';
import github from '../../../assets/images/social/github.png';
import yesJob from '../../../assets/images/social/yes.png';
import noJob from '../../../assets/images/social/no.png';
import iconEdit from '../../../assets/images/icon-edit.png';
import ProfileStatusWithHooks from './ProfileStatus/ProfileStatus';
import ProfileDataReduxForm from './ProfileDataForm';
import {ContactsType, ProfileType} from "../../../types/types";

type ProfileInfoPropsType = {
  profile: ProfileType | null
  savePhoto: (file: File) => void
  saveProfile: (profile: ProfileType) => Promise<any>
  isOwner: boolean
  updateStatus: (status: string) => void
  status: string
}

const ProfileInfo: FC<ProfileInfoPropsType> = ({profile, savePhoto, saveProfile, isOwner, updateStatus, status}) => {
	const [editMode, setEditMode] = useState(false);

	if(!profile) {
		return <Preloader />
	}

	const onMainPhotosSelected = (e: ChangeEvent<HTMLInputElement>) => {
		if(e.target.files?.length) {
			savePhoto(e.target.files[0]);
		}
	}

	const onSubmit = (formData: ProfileType) => {
	  // remove .then()
		saveProfile(formData).then(
			() => {
                setEditMode(false);
            }
		);
	}

	return(
		<div>
			<div className={s.header}>
				<img className={s.headerImg} src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300" />
				{
					editMode
					? <ProfileDataReduxForm onSubmit={onSubmit} initialValues={profile} profile={profile} />
					: <ProfileData
							isOwner={isOwner}
							profile={profile}
							onMainPhotosSelected={onMainPhotosSelected}
							goToEditMode={() => { setEditMode(true) }}
							updateStatus={updateStatus}
							status={status}/>
				}
			</div>
		</div>
	)
}

const socialIcons = [
  {title: 'facebook', src: facebook},
  {title: 'website', src: website},
  {title: 'vk', src: vk},
  {title: 'twitter', src: twitter},
  {title: 'instagram', src: instagram},
  {title: 'github', src: github}
]

type ProfileDataPropsType = {
  profile: ProfileType
  isOwner: boolean
  goToEditMode: () => void
  onMainPhotosSelected: ChangeEventHandler<HTMLInputElement>
  updateStatus: (status: string) => void
  status: string
}

const ProfileData: FC<ProfileDataPropsType> = ({
  profile,
  isOwner,
  goToEditMode,
  onMainPhotosSelected,
  updateStatus,
  status
}) => {
	return(
		<div className={s.info}>
			{ isOwner && <button onClick={goToEditMode} className={s.editBtn}><img src={iconEdit} /></button> }
			<div className={s.socials}>
        {
          Object.keys(profile.contacts).map(key => {
            return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]}/>
          })
        }
			</div>
			<div className={s.userInfo}>
				<div className={s.avatar}>
					<img className={s.profileImg} src={profile.photos.large || userPhoto} />
					{
						isOwner &&
						<label className={s.fileUpload}>
							<input type={"file"} onChange={onMainPhotosSelected} />
							<div className={s.fileUploadCustom}>
								<img src={iconEdit} />
							</div>
						</label>
					}
				</div>
				<h3 className={s.name}>{profile.fullName}</h3>
				<ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
			</div>
			<div className={s.jobStatus}>
				<span>Поиск работы:</span>
				<img src={profile.lookingForAJob ? yesJob : noJob}/>
			</div>
		</div>
	)
}

type ContactPropsType = {
  contactTitle: string
  contactValue: string
}

const Contact: FC<ContactPropsType> = ({contactTitle, contactValue}) => {
  return(
    <a href={`${contactValue}`} target="_blank">
      {socialIcons.map((item, index) => {
        if(item.title === contactTitle) {
          return (
            <React.Fragment key={index}>
              {contactValue && <img src={item.src} />}
            </React.Fragment>
          )
        }
      })}
    </a>
  )
}

export default ProfileInfo;
