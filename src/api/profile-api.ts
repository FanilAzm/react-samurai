import {ContactsType, PhotosType, ProfileType} from "../types/types";
import {instance, ResponseType, ResultCodesEnum} from "./api";

// type UpdateStatusResponseType = {
//   status: string
//   resultCode: ResultCodesEnum
//   messages: Array<string>
// }

type SavePhotoResponseDataType = {
  photos: PhotosType
}

type SaveProfileResponseType = {
  userId: number
  lookingForAJob: boolean
  lookingForAJobDescription: string
  fullName: string
  contacts: ContactsType
  resultCode: ResultCodesEnum
  messages: Array<string>
}

export const profileAPI = {
  getProfileUser(userId: number) {
    return instance
      .get<ProfileType>(`profile/` + userId)
      .then(response => response.data)
  },
  getStatus(userId: number) {
    return instance
      .get<string>(`profile/status/` + userId)
      .then(response => response.data)
  },
  updateStatus(status: string) {
    return instance
      .put<ResponseType>(`profile/status`, {status: status})
      .then(response => response.data)
  },
  savePhoto(photoFile: File) {
    const formData = new FormData();
    formData.append('image', photoFile);
    return instance.put<ResponseType<SavePhotoResponseDataType>>(`profile/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => response.data)
  },
  saveProfile(profile: ProfileType) {
    return instance.put<SaveProfileResponseType>('profile', profile).then(response => response.data);
  }
}
