import {GetItemsType, ResponseType, instance} from "./api";

export const usersAPI = {
  getUsers(currentUserPage: number, pageSize: number){
    return instance
      .get<GetItemsType>(`users?page=${currentUserPage}&count=${pageSize}`)
      .then(response => response.data)
  },
  postUser(userId: number) {
    return instance
      .post<ResponseType>(`follow/${userId}`)
      .then(response => response.data)
  },
  deleteUser(userId: number) {
    return instance
      .delete(`follow/${userId}`)
      .then(response => response.data) as Promise<ResponseType>
  }
}
