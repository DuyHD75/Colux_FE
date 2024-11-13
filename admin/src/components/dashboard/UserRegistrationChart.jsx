import { Box, Typography, Paper, Stack } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useState } from 'react';

const UserRegistrationChart = ({ data = [] }) => {
  const [selectedBar, setSelectedBar] = useState(null);
  
  const registrationData = data.map(item => ({
    date: `${item.month.slice(0, 3)} ${item.year}`,
    registrations: item.registrations
  })).reverse();

  const handleClick = (data, index) => {
    setSelectedBar(index === selectedBar ? null : index);
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 2, bgcolor: 'white', height: 450 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">User Registrations</Typography>
        <Typography variant="body2" color="text.secondary">Last 6 Months</Typography>
      </Stack>
      <Box sx={{ width: '100%', height: 380 }}>
        <ResponsiveContainer>
          <BarChart 
            data={registrationData}
            onClick={(event) => {
              if (event && event.activeTooltipIndex !== undefined) {
                handleClick(null, event.activeTooltipIndex);
              }
            }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false}
              stroke="#E5E7EB"
            />
            <XAxis 
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
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
            />
            <Bar 
              dataKey="registrations" 
              radius={[4, 4, 0, 0]} 
              barSize={40}
            >
              {registrationData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={selectedBar === index ? '#4F46E5' : '#818CF8'}
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

export default UserRegistrationChart;