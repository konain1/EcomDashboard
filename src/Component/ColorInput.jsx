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
        <div key={index} className='flex gap-2 items-center'>
          <input 
            value={color} 
            onChange={(e) => onUpdateColor(index, e.target.value)}
            className='rounded-xl px-3 py-2 border border-gray-300 flex-1' 
            type='text'
            placeholder={`Color ${index + 1}`}
          />
         
          {colors.length > 1 && (
            <button 
              onClick={() => onRemoveColor(index)}
              className='bg-red-500 text-white px-2 py-1 rounded text-xs'
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