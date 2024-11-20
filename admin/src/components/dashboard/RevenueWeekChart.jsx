import { Box, Typography, Select, MenuItem, Paper, Stack } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useState } from 'react';

const RevenueWeekChart = ({ thisWeekData, lastWeekData }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('thisWeek');
  const [selectedBar, setSelectedBar] = useState(null);

  const formatData = (data) => {
    if (!data) return [];
    
    // Định nghĩa thứ tự chuẩn của các ngày trong tuần
    const dayOrder = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    
    // Tạo map dữ liệu từ API
    const dataMap = data.reduce((acc, item) => {
      acc[item.day] = item.revenue;
      return acc;
    }, {});

    // Tạo mảng dữ liệu theo thứ tự chuẩn
    return dayOrder.map(day => ({
      day,
      revenue: Number(dataMap[day] || 0)
    }));
  };

  const data = selectedPeriod === 'thisWeek' 
    ? formatData(thisWeekData)
    : formatData(lastWeekData);

  const maxRevenue = Math.max(...data.map(item => item.revenue), 0);
  const yAxisMax = maxRevenue === 0 ? 100 : Math.ceil(maxRevenue * 1.1);

  const handleClick = (event) => {
    if (event && event.activeTooltipIndex !== undefined) {
      setSelectedBar(event.activeTooltipIndex === selectedBar ? null : event.activeTooltipIndex);
    }
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 2, bgcolor: 'white', height: 450 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Revenue Week</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" color="text.secondary">Sort By:</Typography>
          <Select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            size="small"
            sx={{
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: '#E5E7EB',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#E5E7EB',
              },
              '.MuiSelect-select': {
                py: 0.5,
                pr: 3,
                pl: 1,
              },
            }}
          >
            <MenuItem value="thisWeek">This Week</MenuItem>
            <MenuItem value="lastWeek">Last Week</MenuItem>
          </Select>
        </Box>
      </Stack>

      <Box sx={{ width: '100%', height: 380 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data} 
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            onClick={handleClick}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#E5E7EB" 
              vertical={false}
            />
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
              dx={-10}
              domain={[0, yAxisMax]}
              tickFormatter={(value) => value.toLocaleString()}
              tickCount={5}
              allowDecimals={false}
            />
            <Tooltip
              cursor={false}
              contentStyle={{
                background: '#fff',
                border: '1px solid #E5E7EB',
                borderRadius: '4px',
                padding: '8px'
              }}
              formatter={(value) => [`${value.toLocaleString()}`, 'revenue']}
            />
            <Bar 
              dataKey="revenue" 
              radius={[4, 4, 0, 0]}
              barSize={40}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={selectedBar === index ? '#60A5FA' : '#93C5FD'}
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

export default RevenueWeekChart; 