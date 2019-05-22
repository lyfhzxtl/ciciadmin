import {
  get,
  post,
  put
} from '@/axios/index';
export const getAllUserHttp = params => get(`/getAllUser?token=${params.token}`)
export const getUserRoutesHttp = params => get(`/getUserRoutes?username=${params.username}`)
export const addRoutesHttp = params => post('/addRoutes', params)
export const userPassHttp = params => put('/userPass', params)
