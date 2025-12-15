import React from 'react'

import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Buttons from '../Component/Buttons'

function Tabs ({ toggle }) {
  console.log('==>', toggle)

  const tabItems = [
    { name: 'All', path: 'allproducts' },
    { name: 'Active', path: 'activeProducts' },
    { name: 'Add', path: 'AddProduct' },
    { name: 'Delete', path: 'DeleteProduct' }
  ]

  return (
    <div
      className={`grid md:flex md:justify-center ${
        toggle ? 'grid-cols-4' : 'grid-cols-2'
      } gap-4`}
    >
      {tabItems.map((tab, index) => (
        <div
          key={index}
          className={`md:text-xl text-xs
       text-gray-700 p-2  `}
        >
          <Buttons>
           {tab.name}
          </Buttons>
        </div>
      ))}
    </div>
  )
}

export default Tabs
