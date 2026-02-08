import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar
} from '@mui/material'
import { TrendingUp, TrendingDown } from '@mui/icons-material'

const StatCard = ({ title, value, change, icon: Icon, color, subtitle }) => {
  return (
    <Card 
      sx={{ 
        height: '100%', 
        borderRadius: 3, 
        boxShadow: 3, 
        transition: 'transform 0.2s', 
        '&:hover': { transform: 'translateY(-4px)' } 
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box flex={1}>
            <Typography variant="body2" color="text.secondary" gutterBottom fontWeight="500">
              {title}
            </Typography>
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 1, color: 'text.primary' }}>
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="caption" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          <Avatar sx={{ bgcolor: color, width: 56, height: 56, boxShadow: 2 }}>
            <Icon sx={{ fontSize: 28 }} />
          </Avatar>
        </Box>
        {change !== undefined && (
          <Box display="flex" alignItems="center" mt={2}>
            {change >= 0 ? (
              <TrendingUp sx={{ color: 'success.main', fontSize: 20, mr: 0.5 }} />
            ) : (
              <TrendingDown sx={{ color: 'error.main', fontSize: 20, mr: 0.5 }} />
            )}
            <Typography
              variant="body2"
              color={change >= 0 ? 'success.main' : 'error.main'}
              fontWeight="medium"
            >
              {Math.abs(change)}%
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              vs last month
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

export default StatCard