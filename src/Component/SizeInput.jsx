import React from 'react'

function SizeInput ({ sizes, onAddSize, onUpdateSize, onRemoveSize }) {
  return (
    <div className='text-sm flex flex-col space-y-2'>
      <div className='flex justify-between items-center'>
        <label className='text-black'>Size</label>
        <button
          onClick={onAddSize}
          className='bg-blue-500 text-white px-2 py-1 rounded text-xs'
        >
          + Add
        </button>
      </div>

      {sizes.map((size, index) => (
        <div key={index} className='md:flex grid-col-1 gap-2   items-center'>
          <select
            value={size}
            onChange={e => onUpdateSize(index, e.target.value)}
            className='rounded-xl px-3 py-2 border border-gray-300 flex-1'
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

          {sizes.length > 1 && (
            <button
              onClick={() => onRemoveSize(index)}
              className='bg-red-500 text-white md:px-2 md:py-1 p-1 text-[8px] rounded '
            >
              Remove
            </button>
          )}
        </div>
      ))}
    </div>
  )
}

export default SizeInput
