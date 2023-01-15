import { configureStore } from '@reduxjs/toolkit'

import Mychangename from '../features/changename/changenameslice'
import getc from '../features/weatherApi/getweather'
import login from '../features/login/login'
import userinfos from '../features/userinfos/userinfos.js'

export const store = configureStore({
  reducer: {
    changename:Mychangename,
    getcountryinfo:getc,
    loginreducer:login,
    user_infosred:userinfos
  },
  
})