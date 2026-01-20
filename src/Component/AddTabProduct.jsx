


import React, { useState } from 'react'
import ColorInput from './ColorInput'
import SizeInput from './SizeInput'
import UploadImage from './UploadImage'

function AddTabProduct({setShow}) {
  const [colors, setColors] = useState([''])
  const [sizes, setSizes] = useState([''])
  const [productName, setProductName] = useState('')
  const [price, setPrice] = useState('')
  const [showModal, setShowModal] = useState(false)

  const addColor = () => setColors([...colors, ''])
  const addSize = () => setSizes([...sizes, ''])

  const updateColor = (index, value) => {
    const newColors = [...colors]
    newColors[index] = value
    setColors(newColors)
  }

  const updateSize = (index, value) => {
    const newSizes = [...sizes]
    newSizes[index] = value
    setSizes(newSizes)
  }

  const removeColor = (index) => {
    setColors(colors.filter((_, i) => i !== index))
  }

  const removeSize = (index) => {
    setSizes(sizes.filter((_, i) => i !== index))
  }

  const handleSaveProduct = () => {
    if (!productName || !price) {
      alert('Please fill in all required fields')
      return
    }
    setShowModal(true)
  }

  const handleConfirmSave = () => {
    console.log({ productName, price, colors, sizes })
    setShowModal(false)
    setProductName('')
    setPrice('')
    setColors([''])
    setSizes([''])
  }

   const handleCancel = () => {
    setShowModal(false)
    setShow(false)
    setProductName('')
    setPrice('')
    setColors([''])
    setSizes([''])
  }

  return (
    <div className='w-full absolute top-10 z-10 h-400 bg-gradient-to-br from-gray-300 to-gray-700 p-2 sm:p-4 lg:p-6'>
      <div className='max-w-6xl mx-auto'>
        {/* Header */}
        <div className='mb-6'>
          <h1 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-1'>Add Product</h1>
          <p className='text-xs sm:text-sm text-gray-600'>Fill in the details below to add a new product</p>
        </div>

        {/* Main Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
          
          {/* Left Section - Form */}
          <div className='bg-white rounded-2xl shadow-lg p-4 sm:p-6'>
            <div className='space-y-4'>
              
              {/* Product Name */}
              <div className='space-y-1 text-sm'>
                <label htmlFor='productName' className='block text-xs font-semibold text-gray-700'>
                  Product Name
                </label>
                <input 
                  id='productName'
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className='w-full rounded-lg px-3 py-2 text-sm border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition' 
                  type='text'
                  placeholder='Enter product name'
                />
              </div>

              {/* Price */}
              <div className='space-y-1'>
                <label htmlFor='price' className='block text-xs font-semibold text-gray-700'>
                  Price
                </label>
                <div className='flex items-center'>
                  <span className='text-xs md:text:sm font-semibold text-gray-600 md:mr-2 mr-0' >$</span>
                  <input 
                    id='price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className='flex-1 rounded-lg px-3 py-2 text-sm border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition' 
                    type='number'
                    placeholder='0.00'
                    min='0'
                    step='0.01'
                  />
                </div>
              </div>

              {/* Colors */}
              <div className='space-y-2 bg-gradient-to-br from-blue-50 to-indigo-50 p-3 rounded-lg'>
                <ColorInput 
                  colors={colors}
                  onAddColor={addColor}
                  onUpdateColor={updateColor}
                  onRemoveColor={removeColor}
                />
              </div>

              {/* Sizes */}
              <div className='space-y-2 bg-gradient-to-br from-purple-50 to-pink-50 p-3 rounded-lg'>
                <SizeInput 
                  sizes={sizes}
                  onAddSize={addSize}
                  onUpdateSize={updateSize}
                  onRemoveSize={removeSize}
                />
              </div>

              {/* Action Buttons */}
              <div className='flex gap-2 pt-4'>
                <button 
                  onClick={handleSaveProduct}
                  className='flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-2 text-sm rounded-lg hover:shadow-lg transform hover:scale-105 transition'>
                  Save Product
                </button>
                <button onClick={handleCancel} className='flex-1 bg-gray-200 text-gray-800 font-semibold py-2 text-sm rounded-lg hover:bg-gray-300 transition'>
                  Cancel
                </button>
              </div>
            </div>
          </div>

          {/* Right Section - Image Upload */}
          <div className='bg-white rounded-2xl shadow-lg p-4 sm:p-6 flex flex-col justify-center'>
            <div className='space-y-3'>
              <h2 className='text-sm sm:text-xl font-bold text-gray-800'>Product Image</h2>
              <UploadImage />
            </div>
          </div>
        </div>
      </div>
                 
      {/* Modal/Popup */}
      {showModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full transform transition'>
            <h2 className='text-xl font-bold text-gray-800 mb-4'>Product Added Successfully!</h2>
            
            <div className='space-y-2 mb-6 text-sm bg-gray-50 p-4 rounded-lg '>
              <p><span className='font-semibold text-gray-700'>Name:</span> <span className='text-gray-600'>{productName}</span></p>
              <p><span className='font-semibold text-gray-700'>Price:</span> <span className='text-gray-600'>${price}</span></p>
              <p><span className='font-semibold text-gray-700'>Colors:</span> <span className='text-gray-600'>{colors.filter(c => c).join(', ') || 'None'}</span></p>
              <p><span className='font-semibold text-gray-700'>Sizes:</span> <span className='text-gray-600'>{sizes.filter(s => s).join(', ') || 'None'}</span></p>
            </div>

            <div className='flex gap-3'>
              <button 
                onClick={handleConfirmSave}
                className='flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-2 text-sm rounded-lg hover:shadow-lg transition'>
                Confirm
              </button>
              <button 
                onClick={() => setShowModal(false)}
                className='flex-1 bg-gray-200 text-gray-800 font-semibold py-2 text-sm rounded-lg hover:bg-gray-300 transition'>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddTabProduct
