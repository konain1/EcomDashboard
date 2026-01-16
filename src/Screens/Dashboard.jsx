import React from 'react'
import Card from '../Component/Card'

import BasicBarChart from '../Charts/BasicBarChart'
import BasicLineChart from '../Charts/BasicLineChart'
import TitanicPie from '../Charts/TitaniPie'
import PyramidFunnel from '../Charts/PyramidFunnel'


function Dashboard ({ toggle }) {
  return (
    <div
      className={
        `md:left-[19%] top-10 absolute w-[60%] md:w-[80%] ` +
        (toggle ? 'left-10 top-[10%]' : 'left-[30%]')
      }
    >
      <div className='grid md:grid-cols-2 grid-cols-1'>
       <BasicBarChart />
       <BasicLineChart />
       <TitanicPie />
       {/* <PyramidFunnel /> */}
       
      </div>
    </div>
  )
}

export default Dashboard
