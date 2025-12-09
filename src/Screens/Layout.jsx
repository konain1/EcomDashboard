import React, { useState } from 'react'
import Navbar from '../Component/Navbar'
import Sidebar from '../Component/Sidebar'


function Layout() {

  const [toggle,setToggle]=useState(true)

  return (
    <div className='text-3xl text-red-400 relative min-h-screen '>
        <Navbar/>

        <div  className="md:hidden absolute top-10 -translate-x-1/8 bg-gray-800 text-white px-3 text-sm py-1 rounded shadow
         transition-transform duration-300 ease-in-out"
          style={{ transform: toggle ? 'translateX(10%)' : 'translateX(300%)' }}
        aria-label="Toggle sidebar">
          <button onClick={()=>setToggle(!toggle)}>X</button>
        </div>

        <div
        className=" md:left-[18%] fixed sm:top-10 sm:left-0 h-full  sm:transition-transform duration-300 ease-in-out"
        style={{ transform: toggle ? 'translateX(-100%)' : 'translateX(0%)' }}
      >
     
        <Sidebar />
      </div>
        
    </div>
  )
}

export default Layout