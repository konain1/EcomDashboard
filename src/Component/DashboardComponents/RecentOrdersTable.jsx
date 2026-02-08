import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip
} from '@mui/material'
import {
  CheckCircle,
  Schedule,
  Cancel
} from '@mui/icons-material'

const RecentOrdersTable = ({ recentOrders, formatCurrency }) => {

    console.log(recentOrders)
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'success'
      case 'Processing': return 'info'
      case 'Pending': return 'warning'
      case 'Cancelled': return 'error'
      default: return 'default'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed': return <CheckCircle fontSize="small" />
      case 'Processing': return <Schedule fontSize="small" />
      case 'Pending': return <Schedule fontSize="small" />
      case 'Cancelled': return <Cancel fontSize="small" />
      default: return null
    }
  }

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" mb={3}>
          Recent Orders
        </Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>Order ID</strong></TableCell>
                <TableCell><strong>Customer</strong></TableCell>
                <TableCell align="right"><strong>Amount</strong></TableCell>
                <TableCell align="center"><strong>Status</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentOrders.map((order, index) => (
                <TableRow 
                  key={index}
                  sx={{ '&:hover': { bgcolor: '#f9fafb' } }}
                >
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium" color="primary">
                      {order.id}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {order.date}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{order.customer}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {order.product}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight="bold">
                      {formatCurrency(order.amount)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      icon={getStatusIcon(order.status)}
                      label={order.status}
                      size="small"
                      color={getStatusColor(order.status)}
                      sx={{ fontWeight: 'bold' }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  )
}

export default RecentOrdersTable