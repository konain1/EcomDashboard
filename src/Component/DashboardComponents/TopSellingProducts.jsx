import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar
} from '@mui/material'
import { LocalMallOutlined } from '@mui/icons-material'

const TopSellingProducts = ({ topProducts, formatCurrency }) => {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" mb={3}>
          Top Selling Products
        </Typography>
        {topProducts.length === 0 ? (
          <Box textAlign="center" py={4}>
            <Typography variant="body2" color="text.secondary">
              No products with sales data yet
            </Typography>
          </Box>
        ) : (
          topProducts.map((product, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
              pb={2}
              borderBottom={index < topProducts.length - 1 ? '1px solid #e5e7eb' : 'none'}
              sx={{ 
                transition: 'background-color 0.2s',
                '&:hover': { bgcolor: '#f9fafb', borderRadius: 2, px: 1, mx: -1 }
              }}
            >
              <Box display="flex" alignItems="center" gap={2}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    bgcolor: '#3b82f6',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: 18
                  }}
                >
                  #{index + 1}
                </Box>
                <Avatar
                  src={product.image && product.image !== 'Yes' ? product.image : undefined}
                  sx={{ bgcolor: '#8b5cf6', width: 48, height: 48 }}
                >
                  {!product.image || product.image === 'Yes' ? <LocalMallOutlined /> : null}
                </Avatar>
                <Box>
                  <Typography variant="body1" fontWeight="medium">
                    {product.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {product.sold} units • {formatCurrency(product.price)} each
                  </Typography>
                </Box>
              </Box>
              <Box textAlign="right">
                <Typography variant="body1" fontWeight="bold" color="success.main">
                  {formatCurrency(product.revenue)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Total Revenue
                </Typography>
              </Box>
            </Box>
          ))
        )}
      </CardContent>
    </Card>
  )
}

export default TopSellingProducts