import React from 'react'
import Table from './Table'
import Tabs from '../Screens/Tabs'

function Container ({ toggle }) {
  return (
    <div>
      {/* <Tabs toggle={toggle} /> */}
      <div>
        <Table />
      </div>
    </div>
  )
}

export default Container
