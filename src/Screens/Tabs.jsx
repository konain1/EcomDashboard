import React from 'react'

function Tabs() {
       
        const tabItems = [
            {name:'All',path:"allproducts"},
            {name:'Active',path:"activeProducts"},
            {name:"Add",path:"AddProduct"},
            {name:"Delete",path:"DeleteProduct"}
        ]

  return (
    <div className='flex justify-center'>
      {tabItems.map((tab)=><div  className='md:text-xl text-sm text-gray-700 flex-col  '> <p className='md:w-[100px] w-[30px] border border-black rounded mx-1 px-7 md:px-5  flex justify-center text-sm md:text-xl '>{tab.name}</p></div>)}
    </div>
  )
}

export default Tabs
