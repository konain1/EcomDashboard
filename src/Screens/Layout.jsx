import React, { useState, lazy, Suspense } from 'react'
import Navbar from '../Component/Navbar'
import Sidebar from '../Component/Sidebar'
import Tabs from './Tabs'
import Table from '../Component/Table'
import { useSelector } from 'react-redux'
import Container from '../Component/Container'

import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'

const Dashboard = lazy(() => import('../Screens/Dashboard'))
const Products = lazy(() => import('../Screens/Products'))
const Orders = lazy(() => import('../Screens/Orders'))
const Users = lazy(() => import('../Screens/Users'))

function Layout () {
  const [toggle, setToggle] = useState(true)

  const selectedSidebarItem = useSelector(
    state => state.sidebar.selectedSidebarItem
  )

  const componentMap = {
    dashboard: Dashboard,
    products: Products,
    orders: Orders,
    users: Users
  }

  const ActiveComponent = componentMap[selectedSidebarItem] || Dashboard

  return (
    <div className='text-3xl text-red-400 bg-white w-[100%] relative min-h-screen '>
      <div
        className='md:hidden absolute  top-1 -translate-x-1/8 bg-gray-800 text-white px-3 text-sm py-1 rounded shadow
         transition-transform duration-300 ease-in-out'
        style={{ transform: toggle ? 'translateX(10%)' : 'translateX(200%)' }}
        aria-label='Toggle sidebar'
      >
        <button className='relative' onClick={() => setToggle(!toggle)}>
          {' '}
          {toggle ?  <MenuIcon />: <CloseIcon />}
        </button>
      </div>

      {/* there are issues on ipad air , ipad mini and ipad pro all are different size side bar problem */}

      <div
        className={
          `fixed sm:top-0 sm:left-0  h-full transition-transform duration-300 ease-in-out lg:left-[240px]  ` +
          (toggle
            ? '-translate-x-full sm:-translate-x-full md:-translate-x-full'
            : 'translate-x-0 sm:translate-x-0 md:translate-x-0')
        }
      >
        <Sidebar />
      </div>
      <main className=' md:flex min-h-screen z-0 justify-center w-full'>
        {' '}
        <Suspense fallback={<div>Loading...</div>}>
          <ActiveComponent toggle={toggle} />
        </Suspense>
      </main>
    </div>
  )
}

export default Layout
