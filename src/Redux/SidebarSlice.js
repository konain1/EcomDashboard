

import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({

    name:"sidebar",
    initialState:{
       selectedSidebarItem:'dashboard'
    },
    reducers:{
        setSidebarItem : (state,action)=>{
            state.selectedSidebarItem = action.payload
        }
    }
})
export const {setSidebarItem} = sidebarSlice.actions
export default sidebarSlice.reducer