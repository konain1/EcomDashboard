import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress
} from '@mui/material'

const RevenueByCategoryChart = ({ revenueByCategory, formatCurrency }) => {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3, height: '100%' }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" mb={3}>
          Revenue by Category
        </Typography>
        
        {/* Donut Chart Alternative */}
        <Box display="flex" justifyContent="center" mb={3}>
          <Box
            sx={{
              width: 200,
              height: 200,
              borderRadius: '50%',
              background: `conic-gradient(
                #3b82f6 0% ${revenueByCategory[0].value}%,
                #8b5cf6 ${revenueByCategory[0].value}% ${revenueByCategory[0].value + revenueByCategory[1].value}%,
                #10b981 ${revenueByCategory[0].value + revenueByCategory[1].value}% ${revenueByCategory[0].value + revenueByCategory[1].value + revenueByCategory[2].value}%,
                #f59e0b ${revenueByCategory[0].value + revenueByCategory[1].value + revenueByCategory[2].value}% 100%
              )`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}
          >
            <Box
              sx={{
                width: 120,
                height: 120,
                borderRadius: '50%',
                bgcolor: 'background.paper',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Typography variant="h5" fontWeight="bold">
                100%
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Total
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box>
          {revenueByCategory.map((item, index) => (
            <Box key={index} mb={2}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
                <Box display="flex" alignItems="center">
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: item.color, mr: 1 }} />
                  <Typography variant="body2">{item.name}</Typography>
                </Box>
                <Typography variant="body2" fontWeight="bold">{item.value}%</Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={item.value}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  bgcolor: '#e5e7eb',
                  '& .MuiLinearProgress-bar': { bgcolor: item.color, borderRadius: 3 }
                }}
              />
              <Typography variant="caption" color="text.secondary">
                {formatCurrency(item.amount)}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  )
}

export default RevenueByCategoryChart