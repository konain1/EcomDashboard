
import React from 'react'
import Container from '../Component/Container'
function Product({toggle}) {
  return (
    <div className={`  md:left-[19%] top-10 absolute w-[60%] md:w-[80%] ` +(toggle ? 'left-10 top-[10%]' : 'left-[30%]')} >
      <Container toggle={toggle} />
    </div>
  )
}

export default Product
