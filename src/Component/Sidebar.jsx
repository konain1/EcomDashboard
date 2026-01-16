import React, { useEffect } from 'react'
import { useState } from 'react'
import { Home, Inventory, ShoppingCart, People } from '@mui/icons-material'
import { Icon, IconButton } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { setSidebarItem } from '../Redux/SidebarSlice'



export default function Sidebar () {


  const [active, setActive] = useState('dashboard'|| selectedSidebarItem)

  const selectedSidebarItem = useSelector(
    state => state.sidebar.selectedSidebarItem
  )

  
  const dispatch = useDispatch()
  
  const menuItems = [
    { name: 'Dashboard', icon: <Home />, path: 'dashboard' },
    { name: 'Products', icon: <Inventory />, path: 'products' },
    { name: 'Orders', icon: <ShoppingCart />, path: 'orders' },
    { name: 'Users', icon: <People />, path: 'people' }
  ]

   useEffect(() => {
    // run only when Redux value changes; use strict comparison
    if (selectedSidebarItem && selectedSidebarItem !== active) {
      setActive(selectedSidebarItem)
    }
  }, [selectedSidebarItem])

  const handleClick = path => {
    
    setActive(path)
    dispatch(setSidebarItem(path))
  }
  return (
    <div className=' bg-gray-500 text-white text-[8px] md:text-[22px]  w-[100px] md:w-64 min-h-screen md:p-5 '>
      <ul className='space-y-4'>
        {menuItems.map(item => (
          <li
            key={item.name}
            onClick={() => handleClick(item.path)}
            className={`flex items-center gap-1 md:gap-3 cursor-pointer rounded-lg p-1 md:p-2 ${
              active === item.path ? 'bg-gray-700' : 'hover:bg-gray-800'
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
