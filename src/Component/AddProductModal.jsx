import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'

function AddProductModal ({ onClose, onSave }) {
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

    if(value !== '' && formData.sizes.includes(value)){
     alert("This size has already been selected.");
     return;
    }

    const newSizes = [...formData.sizes]
    newSizes[index] = value
    setFormData(prev => ({ ...prev, sizes: newSizes }))
  }

  const addSizeField = () => {
  setFormData(prev => {
    // If an empty string already exists, don't add another field
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

  let lastSize = formData.sizes[formData.sizes.length - 1]

  let lastColor = formData.colors[[formData.colors.length - 1]]
  return (
    <div className=' '>
      <div className='bg-white rounded-2xl shadow-2xl w-full max-h-[90vh] overflow-y-auto p-6'>
        {/* Form */}
        <form
          className='grid grid-cols-1 md:grid-cols-2 gap-6 items-start'
          onSubmit={handleSubmit}
        >
          {/* Product Name */}
          <div className=''>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>
              Product Name <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              name='productName'
              value={formData.productName}
              onChange={handleInputChange}
              placeholder='Enter product name'
              className='w-[80%] text-sm px-2 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition'
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>
              Price <span className='text-red-500'>*</span>
            </label>

            <div>
              <span className='relative left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs font-semibold'>
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
                className='w-[80%] pl-8 text-sm pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition'
                required
              ></input>
            </div>
          </div>

          {/* Colors */}
          <div className='bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg'>
            <label className='block text-sm font-semibold text-gray-700 mb-3'>
              Colors
            </label>
            <div className='space-y-2 '>
              {formData.colors.map((color, index) => (
                <div key={index} className='md:flex gap-4 grid grid-cols-2  items-center justify-center '>
                  <input
                    type='color'
                    value={color}
                    onChange={e => handleColorChange(index, e.target.value)}
                    className=' md:w-12 w-[100%] md:h-11 rounded-lg border-2 border-gray-300 cursor-pointer'
                  />
               

                  <input
                    type='text'
                    value={color}
                    onChange={e => handleColorChange(index, e.target.value)}
                    placeholder='#000000 or color name'
                    className='hidden md:block w-[80%] pl-8 text-sm pr-4 py-2  border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition'
                  />
                  {formData.colors.length > 1 && (
                    <button
                      type='button'
                      onClick={() => removeColorField(index)}
                      className='w-10 text-center rounded-lg hover:scale-125 active:skew-x-6 transition font-normal md:font-semibold'
                      style={{ color: formData.colors[index] || '#000000' }}
                    >
                      <DeleteIcon />
                    </button>
                  )}
                  
                </div>
              ))}
              <button
                type='button'
                disabled={lastColor === '' || formData.colors.length == 5}
                onClick={addColorField}
                className={`w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-semibold text-sm ${
                  lastColor === '' || formData.colors.length == 5
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600 text-white '
                }`}
              >
                + Add Color
              </button>
            </div>
          </div>

          {/* Sizes */}
          <div className='bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg'>
            <label className='block text-sm font-semibold text-gray-700 mb-3'>
              Sizes
            </label>
            <div className='space-y-2'>
              {formData.sizes.map((size, index) => (
                <div key={index} className='flex gap-2'>
                  <select
                    value={size}
                    onChange={e => handleSizeChange(index, e.target.value)}
                    className='rounded-xl text-sm px-3 py-2 border border-gray-300 flex-1'
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
                    <button
                      type='button'
                      onClick={() => removeSizeField(index)}
                      className='w-10 text-center rounded-lg hover:scale-125 active:skew-x-6 transition font-normal md:font-semibold'
                    >
                      <DeleteIcon />
                    </button>
                  )}
                </div>
              ))}
              <button
                disabled={lastSize === '' || formData.sizes.length == 5}
                type='button'
                onClick={addSizeField}
                className={`w-full py-2  text-white rounded-lg hover:bg-purple-600 transition font-semibold text-sm ${
                  lastSize === '' || formData.sizes.length == 5
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                + Add Size
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex gap-3 pt-4'>
            <button
              type='submit'
              className='flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg transform hover:scale-105 transition'
            >
              Save Product
            </button>
            <button
              type='button'
              onClick={onClose}
              className='flex-1 bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg hover:bg-gray-400 transition'
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
