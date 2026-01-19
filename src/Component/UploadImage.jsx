import React, { useState } from 'react'

function UploadImage() {
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setImage(null)
    setPreview(null)
  }

  const handleUpload = () => {
    if (!image) {
      alert('Please select an image first')
      return
    }
    console.log('Uploading image:', image)
    // Add your upload logic here
  }

  return (
    <div className='flex flex-col items-center gap-4 p-4 border-2 border-dashed border-gray-400 rounded-lg'>
      <div className='w-32 h-32 rounded-full border border-white flex items-center justify-center overflow-hidden bg-slate-600'>
        {preview ? (
          <img src={preview} alt='preview' className='w-full h-full object-cover' />
        ) : (
          <span className='text-gray-300'>No Image</span>
        )}
      </div>

      <input
        type='file'
        accept='image/*'
        onChange={handleImageChange}
        className='hidden'
        id='imageInput'
      />

      <div className='flex gap-2 text-sm'>
        <label
          htmlFor='imageInput'
          className='bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600'
        >
          Choose Image
        </label>

        {image && (
          <>
            <button
              onClick={handleUpload}
              className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'
            >
              Upload
            </button>
            <button
              onClick={handleRemoveImage}
              className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
            >
              Remove
            </button>
          </>
        )}
      </div>

      {image && (
        <p className='text-sm text-gray-600'>
          Selected: {image.name}
        </p>
      )}
    </div>
  )
}

export default UploadImage
