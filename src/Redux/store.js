import { configureStore } from '@reduxjs/toolkit'
import sidebarReducer from './SidebarSlice'

export default configureStore({
  reducer: {
    sidebar:sidebarReducer
  },
})