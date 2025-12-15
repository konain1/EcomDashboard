import React, { useState } from 'react'
import Navbar from '../Component/Navbar'
import Sidebar from '../Component/Sidebar'
import Tabs from './Tabs'
import Table from '../Component/Table'


function Layout() {

  const [toggle,setToggle]=useState(true)

  return (
    <div className='text-3xl text-red-400 bg-white w-[100%] relative min-h-screen '>
      

        <Navbar/>

        <div  className="md:hidden absolute  top-10 -translate-x-1/8 bg-gray-800 text-white px-3 text-sm py-1 rounded shadow
         transition-transform duration-300 ease-in-out"
          style={{ transform: toggle ? 'translateX(10%)' : 'translateX(300%)' }}
        aria-label="Toggle sidebar">
          <button className='relative' onClick={()=>setToggle(!toggle)}>{toggle ? "x" : "y"}</button>
        </div>

{/* there are issues on ipad air , ipad mini and ipad pro all are different size side bar problem */}

        <div
         className={
            `fixed sm:top-10 sm:left-0  h-full transition-transform duration-300 ease-in-out lg:left-[17%]  ` +
            (toggle
              ? '-translate-x-full sm:-translate-x-full md:-translate-x-full'
              : 'translate-x-0 sm:translate-x-0 md:translate-x-0')
          }
        >

        <Sidebar />

      </div>
        <div  className={`  md:left-[19%] top-10 absolute w-[60%] md:w-[80%] ` +(toggle ? 'left-10 top-[10%]' : 'left-[30%]')}>
          <Tabs toggle={toggle} />
          <div>
            
          <Table />
          </div>
     </div>


    </div>
  )
}

export default Layout