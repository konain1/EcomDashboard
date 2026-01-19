import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Button } from '@mui/material'

import Checkbox from '@mui/material/Checkbox'
import { useState } from 'react'

const label = { slotProps: { input: { 'aria-label': 'Checkbox demo' } } }

function createData (id, Products, Status, Inventory, Stock, Grade) {
  return { id, Products, Status, Inventory, Stock, Grade }
}

const rows = [
  createData(1, 'Frozen yoghurt', 'Available', 159, 24, 4.0),
  createData(2, 'Ice cream sandwich', 'Low', 237, 37, 4.3),
  createData(3, 'Eclair', 'In Stock', 262, 24, 6.0),
  createData(4, 'Cupcake', 'Available', 305, 67, 4.3),
  createData(5, 'Gingerbread', 'Out of Stock', 356, 49, 3.9),
  createData(6, 'Frozen yoghurt', 'Available', 159, 24, 4.0)
]

export default function BasicTable () {
  const [Selectedrows, setSelectedRows] = useState(rows)
  const [checked, setChecked] = useState({})

  const handleCheckboxChange = productId => {
    setChecked(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }))
  }

  
  const handleDeleteChecked = () => {
    const updatedRows = Selectedrows.filter(row => !checked[row.id])
    setSelectedRows(updatedRows)
    setChecked({})
  }

  return (
    <>
      {Object.values(checked).some(c => c) && (
        <Button onClick={handleDeleteChecked}>Delete Selected</Button>
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Products</TableCell>
              <TableCell align='right'>Status</TableCell>
              <TableCell align='right'>Inventory(Count)</TableCell>
              <TableCell align='right'>Out of Stocks</TableCell>
              <TableCell align='right'>Grade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Selectedrows.map(row => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  <Checkbox
                    {...label}
                    checked={checked[row.id] || false}
                    onChange={() => handleCheckboxChange(row.id)}
                  />{' '}
                  {row.Products}
                </TableCell>

                <TableCell align='right'>{row.Status}</TableCell>
                <TableCell align='right'>{row.Inventory}</TableCell>
                <TableCell align='right'>{row.Stock}</TableCell>
                <TableCell align='right'>{row.Grade}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
