import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'

function AddProductModal({ onClose, onSave,setIsAddModalOpen }) {



  const [formData, setFormData] = useState({
    productName: '',
    price: '',
    colors: [''],
    sizes: ['']
  })



  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleColorChange = (index, value) => {
    const newColors = [...formData.colors]
    newColors[index] = value
    setFormData(prev => ({ ...prev, colors: newColors }))
  }

  const addColorField = () => {
    setFormData(prev => ({ ...prev, colors: [...prev.colors, ''] }))
  }

  const removeColorField = index => {
    const newColors = formData.colors.filter((_, i) => i !== index)
    setFormData(prev => ({ ...prev, colors: newColors }))
  }

  const handleSizeChange = (index, value) => {
    if (value !== '' && formData.sizes.includes(value)) {
      alert("This size has already been selected.");
      return;
    }

    const newSizes = [...formData.sizes]
    newSizes[index] = value
    setFormData(prev => ({ ...prev, sizes: newSizes }))
  }

  const addSizeField = () => {
    setFormData(prev => {
      if (prev.sizes.includes('')) return prev;
      return {
        ...prev,
        sizes: [...prev.sizes, '']
      };
    });
  };

  const removeSizeField = index => {
    const newSizes = formData.sizes.filter((_, i) => i !== index)
    setFormData(prev => ({ ...prev, sizes: newSizes }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    onSave && onSave(formData)
  }

  const handleCloseModal = ()=>{
    setIsAddModalOpen(false)
  }

  let lastSize = formData.sizes[formData.sizes.length - 1]
  let lastColor = formData.colors[formData.colors.length - 1]

  return (
    <div className='flex items-center justify-center p-4 '>
      <div className='bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-y-auto'>
        
        {/* Header - Added for better UX */}
        <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50 rounded-t-2xl">
          <h2 className="text-xl font-bold text-gray-800">Add Product</h2>
          <button onClick={handleCloseModal} className="text-gray-500 hover:text-red-500 transition-colors text-2xl">&times;</button>
        </div>

        <form className='p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-start' onSubmit={handleSubmit}>
          
          {/* Product Name */}
          <div className='flex flex-col'>
            <label className='block text-sm font-bold text-gray-700 mb-2'>
              Product Name <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              name='productName'
              value={formData.productName}
              onChange={handleInputChange}
              placeholder='Enter product name'
              className='w-full text-sm px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all'
              required
            />
          </div>

          {/* Price */}
          <div className='flex flex-col'>
            <label className='block text-sm font-bold text-gray-700 mb-2'>
              Price <span className='text-red-500'>*</span>
            </label>
            <div className='relative'>
              <span className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold'>
                $
              </span>
              <input
                type='number'
                name='price'
                value={formData.price}
                onChange={handleInputChange}
                placeholder='0.00'
                step='.5'
                min='0'
                className='w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all'
                required
              />
            </div>
          </div>

          {/* Colors Section */}
          <div className='bg-blue-50/50 border border-blue-100 p-5 rounded-2xl'>
            <label className='block text-sm font-bold text-blue-900 mb-4'>Colors</label>
            <div className='space-y-3'>
              {formData.colors.map((color, index) => (
                <div key={index} className='flex gap-3 items-center'>
                  <input
                    type='color'
                    value={color}
                    onChange={e => handleColorChange(index, e.target.value)}
                    className='w-12 h-12 rounded-lg border-2 border-white shadow-sm cursor-pointer'
                  />
                  <input
                    type='text'
                    value={color}
                    onChange={e => handleColorChange(index, e.target.value)}
                    placeholder='#000000'
                    className='flex-1 min-w-0 px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none bg-white'
                  />
                  {formData.colors.length > 1 && (
                    <IconButton 
                      onClick={() => removeColorField(index)}
                      sx={{ color: color || '#ef4444' }}
                      className="hover:bg-red-50"
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </div>
              ))}
              <button
                type='button'
                disabled={lastColor === '' || formData.colors.length === 5}
                onClick={addColorField}
                className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all border-2 border-dashed
                  ${lastColor === '' || formData.colors.length === 5
                    ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                    : 'bg-white text-blue-600 border-blue-200 hover:bg-blue-600 hover:text-white hover:border-blue-600'}`}
              >
                + Add Color
              </button>
            </div>
          </div>

          {/* Sizes Section */}
          <div className='bg-purple-50/50 border border-purple-100 p-5 rounded-2xl'>
            <label className='block text-sm font-bold text-purple-900 mb-4'>Sizes</label>
            <div className='space-y-3'>
              {formData.sizes.map((size, index) => (
                <div key={index} className='flex gap-3 items-center'>
                  <select
                    value={size}
                    onChange={e => handleSizeChange(index, e.target.value)}
                    className='flex-1 min-w-0 px-3 py-2.5 text-sm border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none bg-white'
                  >
                    <option value=''>Select Size</option>
                    <option value='xs'>XS</option>
                    <option value='s'>S (Small)</option>
                    <option value='m'>M (Medium)</option>
                    <option value='l'>L (Large)</option>
                    <option value='xl'>XL</option>
                    <option value='xxl'>XXL</option>
                    <option value='xxxl'>XXXL</option>
                  </select>
                  {formData.sizes.length > 1 && (
                    <IconButton 
                      onClick={() => removeSizeField(index)}
                      className="text-gray-400 hover:text-red-500 hover:bg-red-50"
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </div>
              ))}
              <button
                disabled={lastSize === '' || formData.sizes.length === 5}
                type='button'
                onClick={addSizeField}
                className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all border-2 border-dashed
                  ${lastSize === '' || formData.sizes.length === 5
                    ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                    : 'bg-white text-purple-600 border-purple-200 hover:bg-purple-600 hover:text-white hover:border-purple-600'}`}
              >
                + Add Size
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='md:col-span-2 flex flex-col sm:flex-row gap-4 pt-4'>
            <button
              type='submit'
              className='flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold md:py-4 py-2 text-[12px] md:text-lg rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all active:scale-95'
            >
              Save Product
            </button>
            <button
              type='button'
              onClick={handleCloseModal}
              className='flex-1 bg-gray-100 text-gray-600 font-bold md:py-4 py-2 rounded-xl text-[12px] md:text-lg hover:bg-red-400 hover:text-white  hover:shadow-lg transform hover:-translate-y-0.5 transition-all active:scale-95'
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProductModal