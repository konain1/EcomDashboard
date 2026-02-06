import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { editProduct } from '../Redux/DataSlice'
import DeleteIcon from '@mui/icons-material/Delete'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

export default function EditProductModal({ editData, onClose, onSuccess }) {
  const dispatch = useDispatch()
  
  const [formData, setFormData] = useState({
    id: editData.id,
    productName: editData.Products || '',
    price: editData.price || '',
    inventory: editData.Inventory || 1,
    colors: editData.colors || ['#000000'],
    sizes: editData.sizes || ['m'],
  })

  const [imagePreview, setImagePreview] = useState(
    // Show existing image if it's a valid path
    editData.Image && editData.Image !== 'Yes' && typeof editData.Image === 'string'
      ? editData.Image 
      : null
  )

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Inventory handler functions
  const handleInventoryChange = (e) => {
    const value = parseInt(e.target.value) || 1
    setFormData(prev => ({
      ...prev,
      inventory: Math.max(1, value)
    }))
  }

  const incrementInventory = () => {
    setFormData(prev => ({
      ...prev,
      inventory: prev.inventory + 1
    }))
  }

  const decrementInventory = () => {
    setFormData(prev => ({
      ...prev,
      inventory: Math.max(1, prev.inventory - 1)
    }))
  }

  // Image upload handler
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload a valid image file!')
        e.target.value = ''
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB!')
        e.target.value = ''
        return
      }

      // Create preview and store as base64
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.onerror = () => {
        alert('Failed to read image file')
        setImagePreview(null)
      }
      reader.readAsDataURL(file)
    }
  }

  // Remove image handler
  const handleRemoveImage = () => {
    setImagePreview(null)
    
    // Clear file input if it exists
    const fileInput = document.querySelector('input[type="file"]')
    if (fileInput) {
      fileInput.value = ''
    }
  }

  // Color handlers
  const handleColorChange = (index, value) => {
    const newColors = [...formData.colors]
    newColors[index] = value
    setFormData(prev => ({ ...prev, colors: newColors }))
  }

  const addColorField = () => {
    if (formData.colors.length < 5) {
      setFormData(prev => ({ ...prev, colors: [...prev.colors, '#000000'] }))
    }
  }

  const removeColorField = (index) => {
    if (formData.colors.length > 1) {
      const newColors = formData.colors.filter((_, i) => i !== index)
      setFormData(prev => ({ ...prev, colors: newColors }))
    }
  }

  // Size handlers
  const handleSizeChange = (index, value) => {
    if (value !== '' && formData.sizes.includes(value)) {
      alert("This size has already been selected.")
      return
    }

    const newSizes = [...formData.sizes]
    newSizes[index] = value
    setFormData(prev => ({ ...prev, sizes: newSizes }))
  }

  const addSizeField = () => {
    if (formData.sizes.length < 5 && !formData.sizes.includes('')) {
      setFormData(prev => ({ ...prev, sizes: [...prev.sizes, ''] }))
    }
  }

  const removeSizeField = (index) => {
    if (formData.sizes.length > 1) {
      const newSizes = formData.sizes.filter((_, i) => i !== index)
      setFormData(prev => ({ ...prev, sizes: newSizes }))
    }
  }

  const handleSaveEdit = (e) => {
    e.preventDefault()

    // Validation
    if (!formData.productName.trim()) {
      alert('Please enter a product name!')
      return
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      alert('Please enter a valid price!')
      return
    }

    if (formData.inventory < 1) {
      alert('Inventory must be at least 1!')
      return
    }

    const hasEmptyColor = formData.colors.some(color => color.trim() === '')
    if (hasEmptyColor) {
      alert('Please fill all color fields or remove empty ones!')
      return
    }

    const hasEmptySize = formData.sizes.some(size => size.trim() === '')
    if (hasEmptySize) {
      alert('Please fill all size fields or remove empty ones!')
      return
    }

    if (!imagePreview) {
      alert('Please upload a product image!')
      return
    }

    // Update Redux store (Frontend only)
    dispatch(editProduct({
      id: formData.id,
      updatedData: {
        Products: formData.productName,
        price: parseFloat(formData.price),
        Inventory: formData.inventory,
        colors: formData.colors,
        sizes: formData.sizes,
        Image: imagePreview // Store base64 image or existing image path
      }
    }))
    
    alert('Product updated successfully!')
    onSuccess()
  }

  let lastSize = formData.sizes[formData.sizes.length - 1]
  let lastColor = formData.colors[formData.colors.length - 1]

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-y-auto'>
        
        {/* Header */}
        <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50 rounded-t-2xl">
          <h2 className="text-xl font-bold text-gray-800">Edit Product</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500 transition-colors text-2xl">&times;</button>
        </div>

        <form className='p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-start' onSubmit={handleSaveEdit}>
          
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
                step='0.01'
                min='0'
                className='w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all'
              />
            </div>
          </div>

          {/* Inventory */}
          <div className='flex flex-col'>
            <label className='block text-sm font-bold text-gray-700 mb-2'>
              Inventory <span className='text-red-500'>*</span> <span className='text-xs text-gray-500'>(Min: 1)</span>
            </label>
            <div className='relative flex items-center'>
              <button
                type='button'
                onClick={decrementInventory}
                disabled={formData.inventory === 1}
                className='absolute left-2 z-10 w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all'
              >
                <RemoveIcon fontSize='small' />
              </button>
              <input
                type='number'
                name='inventory'
                value={formData.inventory}
                onChange={handleInventoryChange}
                placeholder='1'
                step='1'
                min='1'
                className='w-full text-center px-12 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all'
              />
              <button
                type='button'
                onClick={incrementInventory}
                className='absolute right-2 z-10 w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-all'
              >
                <AddIcon fontSize='small' />
              </button>
            </div>
          </div>

          {/* Product Image Upload */}
          <div className='flex flex-col'>
            <label className='block text-sm font-bold text-gray-700 mb-2'>
              Product Image <span className='text-red-500'>*</span> <span className='text-xs text-gray-500'>(Max: 5MB)</span>
            </label>
            <div className='relative'>
              {!imagePreview ? (
                <label className='w-full h-[120px] flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all'>
                  <CloudUploadIcon className='text-gray-400 mb-2' fontSize='large' />
                  <span className='text-sm text-gray-500 font-medium'>Click to upload image</span>
                  <span className='text-xs text-gray-400 mt-1'>PNG, JPG, JPEG (Max 5MB)</span>
                  <input
                    type='file'
                    accept='image/*'
                    onChange={handleImageChange}
                    className='hidden'
                  />
                </label>
              ) : (
                <div className='relative w-full h-[120px] border-2 border-gray-200 rounded-xl overflow-hidden'>
                  <img
                    src={imagePreview}
                    alt='Product preview'
                    className='w-full h-full object-cover'
                    onError={(e) => {
                      console.error('Image load error:', e)
                      e.target.onerror = null
                      e.target.src = 'https://via.placeholder.com/120?text=Image+Error'
                    }}
                  />
                  <button
                    type='button'
                    onClick={handleRemoveImage}
                    className='absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-all shadow-lg'
                  >
                    <DeleteIcon fontSize='small' />
                  </button>
                  <label className='absolute bottom-2 right-2 bg-blue-500 text-white rounded-lg px-3 py-1 text-xs font-bold cursor-pointer hover:bg-blue-600 transition-all shadow-lg'>
                    Change
                    <input
                      type='file'
                      accept='image/*'
                      onChange={handleImageChange}
                      className='hidden'
                    />
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Colors Section */}
          <div className='bg-blue-50/50 border border-blue-100 p-5 rounded-2xl'>
            <label className='block text-sm font-bold text-blue-900 mb-4'>Colors <span className='text-red-500'>*</span></label>
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
                    <button
                      type='button'
                      onClick={() => removeColorField(index)}
                      className='w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-red-500 transition-all'
                    >
                      <DeleteIcon fontSize='small' />
                    </button>
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
            <label className='block text-sm font-bold text-purple-900 mb-4'>Sizes <span className='text-red-500'>*</span></label>
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
                    <button
                      type='button'
                      onClick={() => removeSizeField(index)}
                      className='w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-red-500 transition-all'
                    >
                      <DeleteIcon fontSize='small' />
                    </button>
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
              className='flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold md:py-4 py-2 text-[12px] md:text-lg rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all active:scale-95'
            >
              Save Changes
            </button>
            <button
              type='button'
              onClick={onClose}
              className='flex-1 bg-gray-100 text-gray-600 font-bold md:py-4 py-2 rounded-xl text-[12px] md:text-lg hover:bg-red-400 hover:text-white hover:shadow-lg transform hover:-translate-y-0.5 transition-all active:scale-95'
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}