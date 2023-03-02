import {instance, ResponseType, ResulCodeForCaptcha, ResultCodesEnum} from "./api";

type MeResponseDataType = {
  id: number
  email: string
  login: string
}

type LoginResponseDataType = {
  userId: number
}

export const authAPI = {
  getAuth() {
    return instance
      .get<ResponseType<MeResponseDataType>>(`auth/me`)
      .then(response => response.data);
  },
  login(email: string, password: string, rememberMe: boolean, captcha: string | null = null) {
    return instance
      .post<ResponseType<LoginResponseDataType, ResultCodesEnum | ResulCodeForCaptcha>>(`auth/login`, {email, password, rememberMe, captcha})
      .then(response => response.data);
  },
  logout() {
    return instance
      .delete(`auth/login`)
      .then(response => response.data);
  }
}
