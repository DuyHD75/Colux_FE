import { Box, Typography, Paper, Stack } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const EarningsChart = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const dashboardData = useSelector((state) => state.dashboard.dashboard);

  const formatData = (monthlyData) => {
    if (!monthlyData) return [];
    
    return monthlyData.map(item => {
      const [year, month] = item.month.split('-');
      const date = new Date(year, month - 1);
      return {
        month: date.toLocaleString('en-US', { month: 'short' }),
        revenue: item.revenue
      };
    });
  };

  const chartData = formatData(dashboardData?.monthlyData);

  const handleClick = (data, index) => {
    if (data && data.activeTooltipIndex !== undefined) {
      setActiveIndex(index === activeIndex ? null : index);
    }
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 2, bgcolor: 'white', height: 450 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Earnings</Typography>
      </Stack>
      <Box sx={{ width: '100%', height: 380 }}>
        <ResponsiveContainer>
          <BarChart 
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            onClick={(data) => {
              if (data && data.activeTooltipIndex !== undefined) {
                handleClick(data, data.activeTooltipIndex);
              }
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip 
              cursor={{ fill: 'transparent' }}
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <Box sx={{ 
                      bgcolor: 'background.paper',
                      p: 1.5,
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 1,
                      boxShadow: 1
                    }}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        {label}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#3B82F6' }} />
                        <Typography variant="body2">
                          Revenue: ${payload[0].value.toLocaleString()}
                        </Typography>
                      </Box>
                    </Box>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="revenue" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={20}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === activeIndex ? '#2563EB' : '#3B82F6'}
                  cursor="pointer"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default EarningsChart;