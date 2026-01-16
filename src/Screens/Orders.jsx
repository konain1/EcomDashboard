

import React from 'react'

function Orders({toggle}) {
  return (
  <div className={`  md:left-[19%] top-10 absolute w-[60%] md:w-[80%] ` +(toggle ? 'left-10 top-[10%]' : 'left-[30%]')} >

      <span>Orders</span>
    </div>
  )
}

export default Orders
