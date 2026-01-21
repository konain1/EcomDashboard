import React, { useMemo, useCallback, useState } from 'react'

import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Buttons from '../Component/Buttons'
import AddTabProduct from '../Component/AddTabProduct'

function Tabs ({ toggle }) {
  const [activeTab, setActiveTab] = useState(null)
  const [show, setShow] = useState(false)

  const tabItems = useMemo(
    () => [
      { name: 'All', path: 'allproducts' },
      { name: 'Active', path: 'activeProducts' },
      { name: 'Add', path: 'AddProduct' }
    ],
    []
  )

  const handleTab = useCallback(
    tab => {
      if (activeTab === tab.name) {
        // Toggle off if clicking the same tab
        setShow(false)
        setActiveTab(null)
      } else {
        // Toggle on if clicking a different tab
        setActiveTab(tab.name)
        setShow(true)
      }
    },
    [activeTab]
  )
  return (
    <div
      className={`grid md:flex md:justify-center ${
        toggle ? 'grid-cols-4' : 'grid-cols-2'
      } gap-4`}
    >
      {tabItems.map(tab => (
        <div
          key={tab.path}
          className={`md:text-xl text-xs
       text-gray-700 p-2  `}
        >
          <Buttons onClick={() => handleTab(tab)}>{tab.name}</Buttons>
        </div>
      ))}
      {activeTab === 'Add' && show ? <AddTabProduct setShow={setShow} /> : ''}
      
    </div>
  )
}

export default Tabs
