import { Box, Card, Typography } from '@mui/material';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, ComposedChart, ResponsiveContainer } from 'recharts';
import { useSelector } from 'react-redux';

const SalesChart = () => {
  const dashboardData = useSelector((state) => state.dashboard.dashboard);

  // Format data from API
  const formatData = (monthlyData) => {
    if (!monthlyData) return [];
    
    return monthlyData.map(item => {
      const [month, year] = item.month.split(' '); // Tách tháng và năm
      return {
        month: `${month.slice(0,3)} ${year.slice(2)}`, // Ví dụ: "OCT 24"
        Paints: item.paints,
        WallPaper: item.wallpaper,
        Floor: item.floor
      };
    });
  };

  const chartData = formatData(dashboardData?.monthlyRevenueData);

  const colors = {
    Paints: '#6B9BFF',
    WallPaper: '#A8E0BC',
    Floor: '#FFB547'
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            bgcolor: 'white',
            p: 1.5,
            border: '1px solid #f0f0f0',
            borderRadius: 1,
            boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Typography sx={{ mb: 1, fontWeight: 500 }}>{label}</Typography>
          {payload.map((entry) => (
            <Box key={entry.name} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: colors[entry.name]
                }}
              />
              <Typography variant="body2">
                {entry.name}: {entry.value} points
              </Typography>
            </Box>
          ))}
        </Box>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mt: 2 }}>
        {payload.map((entry) => (
          <Box key={entry.value} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                bgcolor: colors[entry.value]
              }}
            />
            <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
              {entry.value}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <Card sx={{ p: 3, borderRadius: 2, height: 450 }}>
      <Typography variant="h6" sx={{ fontWeight: 500, mb: 2 }}>
        Sales Analytics
      </Typography>

      <Box sx={{ width: '100%', height: 380 }}>
        <ResponsiveContainer>
          <ComposedChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
          >
            <defs>
              {Object.entries(colors).map(([key, color]) => (
                <linearGradient key={key} id={`color${key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.1}/>
                  <stop offset="95%" stopColor={color} stopOpacity={0}/>
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false}
              stroke="#f0f0f0"
            />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ 
                fontSize: 12, 
                fill: '#637381',
                angle: -45,
                textAnchor: 'end',
                dy: 10
              }}
              height={60}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#637381' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              content={<CustomLegend />}
              verticalAlign="bottom"
              height={36}
            />
            <Bar 
              dataKey="Paints" 
              fill={colors.Paints}
              barSize={20}
              radius={[2, 2, 0, 0]}
            />
            <Area
              type="monotone"
              dataKey="WallPaper"
              stroke={colors.WallPaper}
              strokeWidth={2}
              fillOpacity={1}
              fill={`url(#colorWallPaper)`}
            />
            <Area
              type="monotone"
              dataKey="Floor"
              stroke={colors.Floor}
              strokeWidth={2}
              fillOpacity={1}
              fill={`url(#colorFloor)`}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
};

export default SalesChart;
