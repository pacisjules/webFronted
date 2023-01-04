import { configureStore } from '@reduxjs/toolkit'
import Mychangename from '../features/changename/changenameslice'





export const store = configureStore({
  reducer: {
    changename:Mychangename,
  },
})