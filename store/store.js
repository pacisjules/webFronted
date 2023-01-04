import { configureStore } from '@reduxjs/toolkit'
import Mychangename from '../features/changename/changenameslice'
import getc from '../features/weatherApi/getweather'



export const store = configureStore({
  reducer: {
    changename:Mychangename,
    getcountryinfo:getc,
  },
  
})