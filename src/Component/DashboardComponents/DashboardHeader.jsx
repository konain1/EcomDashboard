import React from 'react'
import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Chip
} from '@mui/material'
import { MoreVert } from '@mui/icons-material'

const DashboardHeader = ({ timeRange, setTimeRange, anchorEl, handleMenuClick, handleMenuClose }) => {
  return (
    <Box display="flex" width="100%" justifyContent="space-between" alignItems="center" mb={4}>
      <Box>
        <Typography variant="h4" fontWeight="bold" gutterBottom color="text.primary">
          Dashboard Overview
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Welcome back! Here's what's happening with your store today.
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" gap={2}>
        <Chip 
          label={timeRange} 
          color="primary" 
          variant="outlined"
          onClick={handleMenuClick}
          sx={{ fontWeight: 'bold', cursor: 'pointer' }}
        />
        <IconButton onClick={handleMenuClick} sx={{ bgcolor: 'background.paper' }}>
          <MoreVert />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => { setTimeRange('Today'); handleMenuClose() }}>Today</MenuItem>
          <MenuItem onClick={() => { setTimeRange('This Week'); handleMenuClose() }}>This Week</MenuItem>
          <MenuItem onClick={() => { setTimeRange('This Month'); handleMenuClose() }}>This Month</MenuItem>
          <MenuItem onClick={() => { setTimeRange('This Year'); handleMenuClose() }}>This Year</MenuItem>
        </Menu>
      </Box>
    </Box>
  )
}

export default DashboardHeader