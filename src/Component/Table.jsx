import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Button, Chip } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteProduct } from '../Redux/DataSlice'
import EditProductModal from './EditProductModal'
import AddProductModal from './AddProductModal'
import AddIcon from '@mui/icons-material/Add'
import ChecklistIcon from '@mui/icons-material/Checklist'
import RemoveDoneIcon from '@mui/icons-material/RemoveDone'

const label = { slotProps: { input: { 'aria-label': 'Checkbox demo' } } }

export default function BasicTable() {
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
    
    if (idsToDelete.length === 0) {
      alert('Please select at least one product to delete')
      return
    }

    if (window.confirm(`Are you sure you want to delete ${idsToDelete.length} product(s)?`)) {
      dispatch(deleteProduct(idsToDelete))
      setChecked({})
    }
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

  const handleAddProductSuccess = (newProduct) => {
    console.log('Product added:', newProduct)
    setIsAddModalOpen(false)
  }

  // Helper function to get stock status based on inventory
  const getStockStatus = (inventory) => {
    if (inventory === 0) return { label: 'Out of Stock', color: 'error' }
    if (inventory < 50) return { label: 'Low Stock', color: 'warning' }
    if (inventory < 200) return { label: 'In Stock', color: 'info' }
    return { label: 'Available', color: 'success' }
  }

  return (
    <>
      <div className='mb-4 flex flex-wrap gap-2'>
        <Button onClick={selectAll} variant='outlined' size='small'>
          <span className='hidden md:inline'>Select All</span>
          <ChecklistIcon className='md:hidden' />
        </Button>
        <Button
          onClick={deselectAll}
          variant='outlined'
          size='small'
        >
          <span className='hidden md:inline'>Deselect All</span>
          <RemoveDoneIcon className='md:hidden' />
        </Button>
        <Button
          onClick={handleOpenAddModal}
          variant='contained'
          color='primary'
          size='small'
          className='min-w-fit'
        >
          <span className='hidden md:inline'>Add Product</span>
          <AddIcon className='md:hidden' />
        </Button>

        {Object.values(checked).some(c => c) && (
          <>
            <Button 
              onClick={handleDeleteChecked} 
              variant='contained'
              color='error'
              size='small'
            >
              <span className='hidden md:inline'>Delete Selected</span>
              <span className='md:hidden'>Delete</span>
            </Button>
            <Button 
              onClick={handleEdit} 
              variant='contained'
              color='primary'
              size='small'
            >
              Edit
            </Button>
          </>
        )}
      </div>

      {isAddModalOpen && (
        <AddProductModal 
          setIsAddModalOpen={setIsAddModalOpen}
          onSave={handleAddProductSuccess}
        />
      )}

      <TableContainer component={Paper} className='shadow-lg rounded-lg'>
        <Table sx={{ minWidth: 650 }} aria-label='product table'>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Product</TableCell>
              <TableCell align='right' sx={{ fontWeight: 'bold' }}>Price</TableCell>
              <TableCell align='right' sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell align='right' sx={{ fontWeight: 'bold' }}>Inventory</TableCell>
              <TableCell align='right' sx={{ fontWeight: 'bold' }}>Sold</TableCell>
              <TableCell align='center' sx={{ fontWeight: 'bold' }}>Colors</TableCell>
              <TableCell align='center' sx={{ fontWeight: 'bold' }}>Sizes</TableCell>
              <TableCell align='center' sx={{ fontWeight: 'bold' }}>Image</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align='center' sx={{ py: 4 }}>
                  <div className='text-gray-500'>
                    <p className='text-lg font-semibold'>No products found</p>
                    <p className='text-sm mt-1'>Click "Add Product" to create your first product</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              rows.map(row => {
                const stockStatus = getStockStatus(row.Inventory)
                return (
                  <TableRow
                    key={row.id}
                    sx={{ 
                      '&:last-child td, &:last-child th': { border: 0 },
                      '&:hover': { backgroundColor: '#fafafa' }
                    }}
                  >
                    <TableCell component='th' scope='row'>
                      <div className='flex items-center gap-2'>
                        <Checkbox
                          {...label}
                          checked={checked[row.id] || false}
                          onChange={() => handleCheckboxChange(row.id)}
                        />
                        <span className='font-medium'>{row.Products}</span>
                      </div>
                    </TableCell>
                    
                    <TableCell align='right'>
                      <span className='font-semibold text-green-600'>
                        ${row.price?.toFixed(2) || '0.00'}
                      </span>
                    </TableCell>
                    
                    <TableCell align='right'>
                      <Chip 
                        label={stockStatus.label} 
                        color={stockStatus.color}
                        size='small'
                        sx={{ fontWeight: 'bold' }}
                      />
                    </TableCell>
                    
                    <TableCell align='right'>
                      <span className={`font-semibold ${
                        row.Inventory === 0 ? 'text-red-600' :
                        row.Inventory < 50 ? 'text-orange-600' :
                        'text-blue-600'
                      }`}>
                        {row.Inventory}
                      </span>
                    </TableCell>
                    
                    <TableCell align='right'>
                      <span className='text-gray-600'>{row.Sold || 0}</span>
                    </TableCell>
                    
                    <TableCell align='center'>
                      <div className='flex justify-center gap-1 flex-wrap'>
                        {row.colors && row.colors.length > 0 ? (
                          row.colors.map((color, index) => (
                            <div
                              key={index}
                              className='w-6 h-6 rounded-full border-2 border-gray-300 shadow-sm'
                              style={{ backgroundColor: color }}
                              title={color}
                            />
                          ))
                        ) : (
                          <span className='text-gray-400 text-sm'>N/A</span>
                        )}
                      </div>
                    </TableCell>
                    
                    <TableCell align='center'>
                      <div className='flex justify-center gap-1 flex-wrap'>
                        {row.sizes && row.sizes.length > 0 ? (
                          row.sizes.map((size, index) => (
                            <Chip
                              key={index}
                              label={size.toUpperCase()}
                              size='small'
                              variant='outlined'
                              sx={{ 
                                fontSize: '0.7rem',
                                height: '20px',
                                fontWeight: 'bold'
                              }}
                            />
                          ))
                        ) : (
                          <span className='text-gray-400 text-sm'>N/A</span>
                        )}
                      </div>
                    </TableCell>
                    
                    <TableCell align='center'>
                      {row.Image && row.Image !== 'Yes' ? (
                        <img
                          src={row.Image}
                          alt={row.Products}
                          className='w-12 h-12 object-cover rounded-lg shadow-sm mx-auto'
                          onError={(e) => {
                            e.target.onerror = null
                            e.target.src = 'https://via.placeholder.com/48?text=No+Image'
                          }}
                        />
                      ) : (
                        <div className='w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mx-auto'>
                          <span className='text-xs text-gray-500'>No Img</span>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })
            )}
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