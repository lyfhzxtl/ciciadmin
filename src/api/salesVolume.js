import {
  get,
  put
} from '@/axios/index';
export const modifySalesDataHttp = params => put('/modifySalesData', params)
export const getAllSalesDataHttp = () => get('/getAllSalesData')
