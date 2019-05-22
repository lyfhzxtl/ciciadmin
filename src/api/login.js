import {
  post
} from '@/axios/index';
export const loginHttp = params => post('/login', params)
