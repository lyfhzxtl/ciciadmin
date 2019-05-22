import {
  get,
  post,
  put,
  deletee
} from '@/axios/index';
export const getAllRatesHttp = () => get('/getAllRates')
export const addRateInfoHttp = params => post('/addRateInfo', params)
export const modifyRateInfoHttp = params => put('/modifyRateInfo', params)
export const deleteRateInfoHttp = params => deletee('/deleteRateInfo', params)
export const getAllCourseHttp = () => get('/getAllCourse')
export const addCourseHttp = params => post('/addCourse', params)
export const modifyCourseHttp = params => put('/modifyCourse', params)
export const deleteCourseHttp = params => deletee('/deleteCourse', params)
