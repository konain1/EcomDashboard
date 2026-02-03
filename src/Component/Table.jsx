import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Button } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteProduct } from '../Redux/DataSlice'
import EditProductModal from './EditProductModal'
import AddProductModal from './AddProductModal'
import AddIcon from '@mui/icons-material/Add'
import ChecklistIcon from '@mui/icons-material/Checklist';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';

const label = { slotProps: { input: { 'aria-label': 'Checkbox demo' } } }

export default function BasicTable () {
  const dispatch = useDispatch()
  const rows = useSelector(state => state.productData.data)
  const [checked, setChecked] = useState({})
  const [showEditModal, setShowEditModal] = useState(false)
  const [editData, setEditData] = useState(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  console.log('Component rendered, rows:', rows)

  useEffect(() => {
    console.log('useEffect')
  }, [rows])

  const handleCheckboxChange = productId => {
    setChecked(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }))
  }

  const handleDeleteChecked = () => {
    const idsToDelete = Object.keys(checked)
      .filter(id => checked[id])
      .map(Number)
    dispatch(deleteProduct(idsToDelete))
    setChecked({})
  }

  const selectAll = () => {
    const checkedAll = {}
    rows.forEach(row => {
      checkedAll[row.id] = true
    })
    setChecked(checkedAll)
  }

  const deselectAll = () => {
    setChecked({})
  }

  const handleEdit = () => {
    const selectedRows = rows.filter(row => checked[row.id])

    if (selectedRows.length === 1) {
      setEditData(selectedRows[0])
      setShowEditModal(true)
    } else if (selectedRows.length > 1) {
      alert('Please select only one row to edit')
    } else {
      alert('Please select a row to edit')
    }
  }

  const handleCloseModal = () => {
    setShowEditModal(false)
    setEditData(null)
  }

  const handleEditSuccess = () => {
    setShowEditModal(false)
    setEditData(null)
    setChecked({})
  }
  const handleOpenAddModal = () => {
    setIsAddModalOpen(!isAddModalOpen)
  }

  return (
    <>
      <div style={{ marginBottom: '10px' }}>
        <Button onClick={selectAll} variant='outlined'>
        <span className='hidden md:inline'> Select All</span>
        <ChecklistIcon className='md:hidden' />
        </Button>
        <Button
          onClick={deselectAll}
          variant='outlined'
          style={{ marginLeft: '10px' }}
        >
         <span className='hidden md:inline'> Deselect All</span>
         <RemoveDoneIcon className='md:hidden' />
        </Button>
        <Button
          onClick={handleOpenAddModal}
          variant='outlined'
          className='min-w-fit'
        >
          {/* Shown only on wide screens (md and up) */}
          <span className='hidden md:inline'>Add Product</span>

          {/* Shown only on small screens (hidden on md and up) */}
          <AddIcon className='md:hidden' />
        </Button>
      </div>
      {isAddModalOpen && <AddProductModal setIsAddModalOpen={setIsAddModalOpen} />}

      {Object.values(checked).some(c => c) && (
        <>
          <Button onClick={handleDeleteChecked} color='error'>
            Delete Selected
          </Button>
          <Button onClick={handleEdit} color='primary'>
            Edit
          </Button>
        </>
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
            {rows.map(row => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  <Checkbox
                    {...label}
                    checked={checked[row.id] || false}
                    onChange={() => handleCheckboxChange(row.id)}
                  />
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

      {showEditModal && editData && (
        <EditProductModal
          editData={editData}
          onClose={handleCloseModal}
          onSuccess={handleEditSuccess}
        />
      )}
    </>
  )
}
