import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  Box
} from '@mui/material'

const SalesTrendChart = ({ salesTrendData, formatCurrency }) => {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3, height: '100%' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6" fontWeight="bold">
            Sales Trend (Last 6 Months)
          </Typography>
          <Box display="flex" gap={2}>
            <Box display="flex" alignItems="center">
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#3b82f6', mr: 1 }} />
              <Typography variant="caption">Sales Amount</Typography>
            </Box>
          </Box>
        </Box>
        
        {/* Custom Bar Chart using MUI */}
        <Box sx={{ height: 300, display: 'flex', alignItems: 'flex-end', gap: 2, px: 2 }}>
          {salesTrendData.map((item, index) => (
            <Box 
              key={index} 
              sx={{ 
                flex: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                gap: 1 
              }}
            >
              <Typography variant="caption" fontWeight="bold" color="primary">
                {formatCurrency(item.sales)}
              </Typography>
              <Box
                sx={{
                  width: '100%',
                  height: `${item.percentage}%`,
                  bgcolor: '#3b82f6',
                  borderRadius: '8px 8px 0 0',
                  transition: 'all 0.3s',
                  '&:hover': {
                    bgcolor: '#2563eb',
                    transform: 'scaleY(1.05)'
                  },
                  minHeight: 40
                }}
              />
              <Typography variant="caption" color="text.secondary" fontWeight="500">
                {item.month}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  )
}

export default SalesTrendChart