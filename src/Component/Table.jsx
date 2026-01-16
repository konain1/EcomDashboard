import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';

const label = { slotProps: { input: { 'aria-label': 'Checkbox demo' } } };

function createData(Products, Status, Inventory, Stock, Grade) {
  return { Products, Status, Inventory, Stock, Grade };
}

const rows = [
  createData('Frozen yoghurt', 'Available', 159, 24, 4.0),
  createData('Ice cream sandwich', 'Low', 237, 37, 4.3),
  createData('Eclair', 'In Stock', 262, 24, 6.0),
  createData('Cupcake', 'Available', 305, 67, 4.3),
  createData('Gingerbread', 'Out of Stock', 356, 49, 3.9),
];




export default function BasicTable() {

  const [Selectedrows,setSelectedRows] = useState([])
const [checked,setChecked] = useState({})


const handleCheckboxChange = (productName)=>{
  setChecked((prev)=>({
    ...prev,
    [productName]: !prev[productName]
  }))
}

console.log(checked)
const handleDeleteChecked = ()=>{
  const updatedRows = Selectedrows.filter((row)=>!checked[row.Products])
  setSelectedRows(updatedRows)
  setChecked({})
}




  return (
    <>
    {Object.values(checked).some(c => c) && (
  <Button onClick={handleDeleteChecked}>Delete Selected</Button>
)}
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Products</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Inventory(Count)</TableCell>
            <TableCell align="right">Out of Stocks</TableCell>
            <TableCell align="right">Grade</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
         
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
               <Checkbox {...label}checked={checked[row.Products] || false}
                onChange={() => handleCheckboxChange(row.Products)} /> {row.Products}
              </TableCell>
              
              <TableCell align="right">{row.Status}</TableCell>
              <TableCell align="right">{row.Inventory}</TableCell>
              <TableCell align="right">{row.Stock}</TableCell>
              <TableCell align="right">{row.Grade}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
