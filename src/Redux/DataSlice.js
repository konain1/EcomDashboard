import { createSlice } from "@reduxjs/toolkit";
import reducer from "./SidebarSlice";


const rows = [
  {id:1, Products: 'Frozen yoghurt', Status: 'Available', Inventory: 159, Stock: 24, Grade: 4.0},
  {id:2, Products: 'Ice cream sandwich', Status: 'Low', Inventory: 237, Stock: 37, Grade: 4.3},
  {id:3, Products: 'Eclair', Status: 'In Stock', Inventory: 262, Stock: 24, Grade: 6.0},
  {id:4, Products: 'Cupcake', Status: 'Available', Inventory: 305, Stock: 67, Grade: 4.3},
  {id:5, Products: 'Gingerbread', Status: 'Out of Stock', Inventory: 356, Stock: 49, Grade: 3.9},
  {id:6, Products: 'Frozen yoghurt', Status: 'Available', Inventory: 159, Stock: 24, Grade: 4.0}
]


const productSlice = createSlice(
    {
      name:'productData',
      initialState:{
      data:rows
      },
      reducers:{
        addProduct:(state,action)=>{
            state.data.push(action.payload)
        },
        deleteProduct:(state,action)=>{
           state.data =  state.data.filter((row)=> !action.payload.includes(row.id))
        },
       editProduct:(state,action)=>{
         const index = state.data.findIndex((row)=> row.id === action.payload.id)
            if(index !== -1){
                state.data[index] = {...state.data[index], ...action.payload.updatedData}
            }
        }
      }
    }
)

export const { addProduct, deleteProduct, editProduct } = productSlice.actions
export default productSlice.reducer