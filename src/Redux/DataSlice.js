import { createSlice } from "@reduxjs/toolkit";

const rows = [
  {
    id: 1,
    Products: 'Frozen yoghurt',
    price: 4.99,
    Inventory: 159,
    Sold: 24,
    Image: "Yes",
    colors: ['#FF6B6B', '#4ECDC4'],
    sizes: ['s', 'm', 'l']
  },
  {
    id: 2,
    Products: 'Ice cream sandwich',
    price: 3.99,
    Inventory: 237,
    Sold: 37,
    Image: "Yes",
    colors: ['#95E1D3', '#F38181'],
    sizes: ['m', 'l', 'xl']
  },
  {
    id: 3,
    Products: 'Eclair',
    price: 5.49,
    Inventory: 262,
    Sold: 24,
    Image: "Yes",
    colors: ['#AA96DA', '#FCBAD3'],
    sizes: ['xs', 's', 'm']
  },
  {
    id: 4,
    Products: 'Cupcake',
    price: 6.99,
    Inventory: 305,
    Sold: 67,
    Image: "Yes",
    colors: ['#FFD93D', '#6BCB77'],
    sizes: ['s', 'm', 'l', 'xl']
  },
  {
    id: 5,
    Products: 'Gingerbread',
    price: 7.99,
    Inventory: 356,
    Sold: 49,
    Image: "Yes",
    colors: ['#FF6B6B'],
    sizes: ['m', 'l']
  },
  {
    id: 6,
    Products: 'Frozen yoghurt',
    price: 4.99,
    Inventory: 159,
    Sold: 24,
    Image: "Yes",
    colors: ['#4ECDC4', '#556270'],
    sizes: ['xs', 's', 'm', 'l']
  }
]

const productSlice = createSlice({
  name: 'productData',
  initialState: {
    data: rows
  },
  reducers: {
    addProduct: (state, action) => {
      // Generate new ID
      const newId = state.data.length > 0 
        ? Math.max(...state.data.map(p => p.id)) + 1 
        : 1;

      state.data.push({
        id: newId,
        Products: action.payload.productName,
        price: parseFloat(action.payload.price),
        Inventory: parseInt(action.payload.inventory),
        Sold: 0, // New products have 0 sold
        Image: action.payload.image ? URL.createObjectURL(action.payload.image) : "No", // Set to "No" if no image is uploaded
        colors: action.payload.colors,
        sizes: action.payload.sizes
      });
    },
    
    deleteProduct: (state, action) => {
      state.data = state.data.filter((row) => !action.payload.includes(row.id))
    },
    
    editProduct: (state, action) => {
      const index = state.data.findIndex((row) => row.id === action.payload.id)
      if (index !== -1) {
        state.data[index] = { 
          ...state.data[index], 
          ...action.payload.updatedData 
        }
      }
    }
  }
})

export const { addProduct, deleteProduct, editProduct } = productSlice.actions
export default productSlice.reducer