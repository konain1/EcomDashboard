// ColorInput.jsx
function ColorInput({ colors, onAddColor, onUpdateColor, onRemoveColor }) {
  return (
    <div className='text-sm flex flex-col space-y-2'>
      <div className='flex justify-between items-center'>
        <label className='text-black'>Colors</label>
        <button 
          onClick={onAddColor}
          className='bg-blue-500 text-white px-2 py-1 rounded text-xs'
        >
          + Add
        </button>
      </div>
      {colors.map((color, index) => (
        <div key={index} className='md:flex gap-2 items-center grid-col-1 '>
          <input 
            value={color} 
            onChange={(e) => onUpdateColor(index, e.target.value)}
            className='rounded-xl md:px-3 md:py-2 px-1 py-1 border border-gray-300 flex-1' 
            type='text'
            placeholder={`Color ${index + 1}`}
          />
       
          {colors.length > 1 && (
            <button 
              onClick={() => onRemoveColor(index)}
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

export default ColorInput