

import React from 'react'
import AddProductModal from '../Component/AddProductModal'

function Orders({toggle}) {
  return (
  
<div className={`right-[0px] bg-red-600 w-[60%]`+(toggle ? 'left-10 top-[10%]' : 'left-[30%]')}>
      <span>Orders</span>
      <div className=''>
      <AddProductModal/>

      </div>
     
    </div>
  )
}

export default Orders
