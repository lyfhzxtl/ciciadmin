import {
  post
} from '@/axios/index';
export const checkUsernameHttp = params => post('/checkUsername', params)
export const registerHttp = params => post('/register', params)
