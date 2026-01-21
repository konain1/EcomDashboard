import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { editProduct } from '../Redux/DataSlice'

export default function EditProductModal({ editData, onClose, onSuccess }) {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({ ...editData })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'Inventory' || name === 'Stock' || name === 'Grade' 
        ? Number(value) 
        : value
    }))
  }

  const handleSaveEdit = (e) => {
    console.log(formData)
    e.preventDefault()
    dispatch(editProduct({
      id: formData.id,
      updatedData: {
        Products: formData.Products,
        Status: formData.Status,
        Inventory: formData.Inventory,
        Stock: formData.Stock,
        Grade: formData.Grade
      }
    }))
    onSuccess()
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg shadow-2xl p-6 w-[500px]'>
        <h2 className='text-2xl font-bold mb-4 text-gray-800'>Edit Product</h2>
        
        <form onSubmit={handleSaveEdit} className='space-y-4'>
          {/* Product Name */}
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-1'>
              Product Name
            </label>
            <input
              type='text'
              name='Products'
              value={formData.Products}
              onChange={handleInputChange}
              className='w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none'
              required
            />
          </div>

          {/* Status */}
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-1'>
              Status
            </label>
            <select
              name='Status'
              value={formData.Status}
              onChange={handleInputChange}
              className='w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none'
              required
            >
              <option value='Available'>Available</option>
              <option value='Low'>Low</option>
              <option value='In Stock'>In Stock</option>
              <option value='Out of Stock'>Out of Stock</option>
            </select>
          </div>

          {/* Inventory */}
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-1'>
              Inventory Count
            </label>
            <input
              type='number'
              name='Inventory'
              value={formData.Inventory}
              onChange={handleInputChange}
              className='w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none'
              required
            />
          </div>

          {/* Stock */}
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-1'>
              Out of Stocks
            </label>
            <input
              type='number'
              name='Stock'
              value={formData.Stock}
              onChange={handleInputChange}
              className='w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none'
              required
            />
          </div>

          {/* Grade */}
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-1'>
              Grade
            </label>
            <input
              type='number'
              step='0.1'
              name='Grade'
              value={formData.Grade}
              onChange={handleInputChange}
              className='w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none'
              required
            />
          </div>

          {/* Buttons */}
          <div className='flex gap-3 pt-4'>
            <button
              type='submit'
              className='flex-1 bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition'
            >
              Save Changes
            </button>
            <button
              type='button'
              onClick={onClose}
              className='flex-1 bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg hover:bg-gray-400 transition'
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}