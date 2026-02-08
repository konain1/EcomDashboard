import React, { useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Box, Grid, Container } from '@mui/material'
import {
  ShoppingCart,
  AttachMoney,
  Inventory,
  TrendingUp
} from '@mui/icons-material'

// Import separated components
import DashboardHeader from '../Component/DashboardComponents/DashboardHeader'
import StatCard from '../Component/DashboardComponents/StatCard'
import SalesTrendChart from '../Component/DashboardComponents/SalesTrendChart'
import RevenueByCategoryChart from '../Component/DashboardComponents/RevenueByCategoryChart'
import TopSellingProducts from '../Component/DashboardComponents/TopSellingProducts'
import RecentOrdersTable from '../Component/DashboardComponents/RecentOrdersTable'

export default function Dashboard() {
  const products = useSelector(state => state.productData.data)
  const [anchorEl, setAnchorEl] = useState(null)
  const [timeRange, setTimeRange] = useState('This Month')

  // ============================================================================
  // CALCULATED METRICS & DATA PROCESSING
  // ============================================================================

  const metrics = useMemo(() => {
    const totalProducts = products.length
    const totalInventory = products.reduce((sum, p) => sum + (p.Inventory || 0), 0)
    const totalSold = products.reduce((sum, p) => sum + (p.Sold || 0), 0)
    const totalRevenue = products.reduce((sum, p) => sum + ((p.price || 0) * (p.Sold || 0)), 0)
    
    const outOfStock = products.filter(p => p.Inventory === 0).length
    const lowStock = products.filter(p => p.Inventory > 0 && p.Inventory < 50).length
    const inStock = products.filter(p => p.Inventory >= 50).length

    return {
      totalProducts,
      totalInventory,
      totalSold,
      totalRevenue,
      outOfStock,
      lowStock,
      inStock,
      conversionRate: totalProducts > 0 ? ((totalSold / totalInventory) * 100).toFixed(1) : 0
    }
  }, [products])

  const topProducts = useMemo(() => {
    return [...products]
      .sort((a, b) => (b.Sold || 0) - (a.Sold || 0))
      .slice(0, 5)
      .map(p => ({
        name: p.Products,
        sold: p.Sold || 0,
        revenue: (p.price || 0) * (p.Sold || 0),
        image: p.Image,
        price: p.price || 0
      }))
  }, [products])

  const salesTrendData = [
    { month: 'Jan', sales: 4200, percentage: 58 },
    { month: 'Feb', sales: 5100, percentage: 71 },
    { month: 'Mar', sales: 4800, percentage: 67 },
    { month: 'Apr', sales: 6300, percentage: 88 },
    { month: 'May', sales: 7200, percentage: 100 },
    { month: 'Jun', sales: 8100, percentage: 100 }
  ]

  const revenueByCategory = [
    { name: 'Electronics', value: 35, color: '#3b82f6', amount: metrics.totalRevenue * 0.35 },
    { name: 'Clothing', value: 28, color: '#8b5cf6', amount: metrics.totalRevenue * 0.28 },
    { name: 'Food', value: 22, color: '#10b981', amount: metrics.totalRevenue * 0.22 },
    { name: 'Others', value: 15, color: '#f59e0b', amount: metrics.totalRevenue * 0.15 }
  ]

  const recentOrders = [
    { id: '#ORD-001', customer: 'John Doe', product: 'Frozen yoghurt', amount: 124.50, status: 'Completed', date: '2 hours ago' },
    { id: '#ORD-002', customer: 'Jane Smith', product: 'Ice cream sandwich', amount: 89.99, status: 'Processing', date: '5 hours ago' },
    { id: '#ORD-003', customer: 'Mike Johnson', product: 'Eclair', amount: 156.00, status: 'Completed', date: '1 day ago' },
    { id: '#ORD-004', customer: 'Sarah Wilson', product: 'Cupcake', amount: 234.50, status: 'Pending', date: '2 days ago' },
    { id: '#ORD-005', customer: 'Tom Brown', product: 'Gingerbread', amount: 178.00, status: 'Cancelled', date: '3 days ago' }
  ]

  // ============================================================================
  // HELPER FUNCTIONS
  // ============================================================================

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', py: 3 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <DashboardHeader
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          anchorEl={anchorEl}
          handleMenuClick={handleMenuClick}
          handleMenuClose={handleMenuClose}
        />

        {/* Key Metrics - Top Row */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Revenue"
              value={formatCurrency(metrics.totalRevenue)}
              change={12.5}
              icon={AttachMoney}
              color="#10b981"
              subtitle={`${metrics.totalSold} items sold`}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Orders"
              value={metrics.totalSold}
              change={8.2}
              icon={ShoppingCart}
              color="#3b82f6"
              subtitle="Orders placed"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Products"
              value={metrics.totalProducts}
              change={-2.4}
              icon={Inventory}
              color="#8b5cf6"
              subtitle={`${metrics.totalInventory} in stock`}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Conversion Rate"
              value={`${metrics.conversionRate}%`}
              change={5.7}
              icon={TrendingUp}
              color="#f59e0b"
              subtitle="Sales vs inventory"
            />
          </Grid>
        </Grid>

        {/* Charts Row */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} lg={8}>
            <SalesTrendChart 
              salesTrendData={salesTrendData}
              formatCurrency={formatCurrency}
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            <RevenueByCategoryChart 
              revenueByCategory={revenueByCategory}
              formatCurrency={formatCurrency}
            />
          </Grid>
        </Grid>

        {/* Bottom Row */}
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <TopSellingProducts 
              topProducts={topProducts}
              formatCurrency={formatCurrency}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <RecentOrdersTable 
              recentOrders={recentOrders}
              formatCurrency={formatCurrency}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}