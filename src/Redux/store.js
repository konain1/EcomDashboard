import { configureStore } from '@reduxjs/toolkit'
import sidebarReducer from './SidebarSlice'
import ProductReducer from './DataSlice'

export default configureStore({
  reducer: {
    sidebar:sidebarReducer,
    productData : ProductReducer
  },
})