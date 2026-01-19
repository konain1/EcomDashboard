import React from 'react'
import Button from '@mui/material/Button'

function Buttons({ children, ...props }) {
  return <Button {...props}>{children}</Button>
}

export default Buttons